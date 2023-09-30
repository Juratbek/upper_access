import { FC } from 'react';
import { Logo } from 'components/images';
import classes from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={classes.container} role='header'>
      <div className={`${classes.body} container`}>
        <div className={classes.logo} id='logo'>
          <Logo width={80} />
        </div>
      </div>
    </header>
  );
};
