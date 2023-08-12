import { FC } from 'react';
import { Logo } from 'components/images';
import classes from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={classes.container}>
      <div className={classes.logo}>
        <Logo width={100} />
      </div>
    </header>
  );
};
