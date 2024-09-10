import {ReactNode} from 'react';

export interface BasicButtonProps {
  children: string | ReactNode;
  classNames?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
}

export interface BasicInputProps {
  type: 'text' | 'password' | 'email';
  translationNamespace: string;
  placeholder?: string;
  classNames?: string;
}

export interface NavigationButtonProps
  extends Omit<BasicButtonProps, 'onClick'> {
  href: string;
}
