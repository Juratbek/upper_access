import { Spinner } from 'components/lib';
import { forwardRef, useMemo } from 'react';
import { getClassName } from 'utils';

import { BUTTON_SPINNER_COLORS } from './Button.constants';
import classes from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Component(
  { children, loading = false, ...props },
  ref,
) {
  const { color = 'dark', size = 'medium' } = props;
  const className = useMemo(
    () =>
      getClassName(
        classes.button,
        props.disabled ? classes[`${color}-disabled`] : classes[color],
        classes[size],
        props.className,
        loading && classes.loading,
      ),
    [props.className, color, props.disabled, size, loading],
  );

  const loader = useMemo(() => {
    if (typeof props.loader === 'function') return props.loader();
    if (props.loader) return props.loader;
    return <Spinner className={classes.spinner} color={BUTTON_SPINNER_COLORS[color]} />;
  }, [props, color]);

  const content = useMemo(() => {
    if (loading) return loader;
    return children;
  }, [loading, children, loader]);

  return (
    <button
      role='button'
      ref={ref}
      {...props}
      className={className}
      disabled={props.disabled ?? loading}
    >
      {content}
    </button>
  );
});
