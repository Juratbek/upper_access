import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Divider.module.scss';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({
  className = '',
  type = 'horisontal',
  color = 'light-gray',
  ...props
}) => {
  const rootClassName = useMemo(
    () =>
      getClassName(
        classes.divider,
        className,
        classes[`divider--${type}`],
        classes[`divider--${color}`],
      ),
    [className, type, color],
  );

  return <div role='divider' className={rootClassName} {...props} />;
};
