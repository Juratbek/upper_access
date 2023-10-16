import { HTMLAttributes } from 'react';

export type TAlertColor = 'red' | 'outline-red';

export interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  color?: TAlertColor;
  onClose?: () => void;
  show?: boolean;
}

export interface IAlert {
  message: string;
  color: TAlertColor;
}
