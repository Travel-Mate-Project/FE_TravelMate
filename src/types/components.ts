import React, {ReactNode} from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

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

export interface AuthInputProps<T extends FieldValues> {
  label: Path<T>;
  placeholder: string;
  type: 'text' | 'password' | 'email';
  autoComplete?: 'email' | 'name';
  register: UseFormRegister<T>;
  control?: Control<T>;
  required: boolean;
  disable?: boolean;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  error?: string;
}

export interface SignUpFromValue {
  email: string;
  password: string;
  passwordCheck: string;
}
