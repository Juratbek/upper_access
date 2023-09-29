import { Button } from 'components/lib';
import { useParams } from 'hooks';
import { CSSProperties, FC, useCallback, useEffect } from 'react';
import { ALLOWED_ORIGINS, BTN_TEXTS } from './IframePage.constants';
import { TBtn } from './IframePage.types';

export const IFrame: FC = () => {
  const { getParam } = useParams();

  const openAccessPageInNewTab = (): void => {
    window.open(window.location.origin, '_blank');
  };

  const styles: CSSProperties = {
    width: Number(getParam('width')) || 150,
  };

  const origin = getParam('origin');
  const btnType = (getParam('type') as TBtn) ?? 'signIn';

  const listener = useCallback(
    (event: MessageEvent): void => {
      if (origin && ALLOWED_ORIGINS.includes(origin)) {
        window.parent.postMessage(event.data, origin);
      }
    },
    [origin],
  );

  useEffect(() => {
    window.addEventListener('message', listener, false);

    return () => window.removeEventListener('message', listener);
  }, [listener]);

  if (!origin) {
    console.error('Origin is not provided');
  } else if (!ALLOWED_ORIGINS.includes(origin)) {
    console.error(`${origin} is not allowed to get auth informations`);
  }

  return (
    <Button style={styles} onClick={openAccessPageInNewTab}>
      {BTN_TEXTS[btnType]}
    </Button>
  );
};
