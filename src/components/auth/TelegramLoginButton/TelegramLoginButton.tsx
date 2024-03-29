import { Button, Error as ErrorComponent } from 'components/lib';
import { FC, useCallback, useEffect, useRef } from 'react';
import { IAuthData, IBlogSmall, ITelegramUser } from 'types';

import { ITelegramLoginButtonProps } from './TelegramLoginButton.types';
import { useAuth, useMutation } from 'hooks';

let telegramUserState: ITelegramUser | null = null;

export const TelegramLoginButton: FC<ITelegramLoginButtonProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { authenticate } = useAuth();

  const { mutate: loginWithTelegram, isLoading: isLoggingIn } = useMutation<
    ITelegramUser,
    IAuthData
  >();

  const selectBlogHandler = (blog: IBlogSmall) => async (): Promise<void> => {
    if (!telegramUserState) {
      throw new Error('Telegram data is not present');
    }
    const authData = await loginWithTelegram({
      url: `blog/open/login-with-telegram/${blog.id}`,
      data: telegramUserState,
    });
    authData && authenticate(authData);
  };

  const telegramConnectionsSuccessHandler = (blogs: IBlogSmall[]): void => {
    if (blogs.length === 1) {
      const [blog] = blogs;
      selectBlogHandler(blog)();
    }
  };

  const {
    mutate: getTelegramAccountConnectedBlogs,
    data: connectedBlogs,
    ...getConnectedBlogsRes
  } = useMutation<ITelegramUser, IBlogSmall[]>({
    onSuccess: telegramConnectionsSuccessHandler,
  });

  const authHandler = useCallback(
    (telegramUser: ITelegramUser) => {
      telegramUserState = telegramUser;
      getTelegramAccountConnectedBlogs({
        url: 'blog/open/telegram-connected-blogs',
        data: telegramUser,
      });
    },
    [getTelegramAccountConnectedBlogs],
  );

  const {
    shouldUsePic = true,
    botName,
    className,
    buttonSize = 'large',
    cornerRadius,
    shouldRequestAccess = true,
  } = props;

  useEffect(() => {
    if (ref.current === null) return;

    window.TelegramLoginWidget = {
      onAuth: (user: ITelegramUser) => authHandler(user),
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?4';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute('data-radius', cornerRadius.toString());
    }

    if (shouldRequestAccess) {
      script.setAttribute('data-request-access', 'write');
    }

    script.setAttribute('data-userpic', shouldUsePic.toString());
    script.setAttribute('data-onauth', 'TelegramLoginWidget.onAuth(user)');
    script.async = true;

    ref.current.appendChild(script);
  }, [botName, buttonSize, cornerRadius, authHandler, shouldRequestAccess, shouldUsePic, ref]);

  const isLoading = getConnectedBlogsRes.isLoading || props.isLoading || isLoggingIn;

  if (connectedBlogs?.length && connectedBlogs.length > 1) {
    return (
      <>
        <p className='my-1'>Profilingizni tanlang</p>
        {connectedBlogs.map((blog) => (
          <Button
            color='transparent'
            key={blog.id}
            className='d-flex w-100'
            onClick={selectBlogHandler(blog)}
          >
            {blog.name}
          </Button>
        ))}
      </>
    );
  }

  return isLoading ? (
    <Button loading={true} color='blue' className={`w-100 ${className}`} />
  ) : (
    <>
      <div ref={ref} id='test' className={className} />
      <ErrorComponent
        show={getConnectedBlogsRes.isError}
        message={getConnectedBlogsRes.error?.response?.data.message}
      />
    </>
  );
};
