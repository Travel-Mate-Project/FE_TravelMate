import {ReactNode} from 'react';

export interface BasicButtonProps {
  children: string | ReactNode;
  classNames?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: 'button' | 'submit' | 'reset';
}

export interface BasicInputProps {
  type: 'text' | 'password' | 'email';
  translationNamespace: string;
  placeholder?: string;
  classNames?: string;
}

export interface NavigationButtonProps extends BasicButtonProps {
  href: string;
  onClick?: () => void;
}
