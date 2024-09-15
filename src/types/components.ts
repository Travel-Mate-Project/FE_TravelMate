import React, {ReactNode} from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type InputType = 'text' | 'password' | 'email';
type ButtonType = 'button' | 'submit' | 'reset';

export interface BasicButtonProps {
  children: string | ReactNode;
  classNames?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonType;
}

export interface BasicInputProps {
  type: InputType;
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
  type: InputType;
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

export interface SignInFormValue {
  email: string;
  password: string;
}

export interface SignUpFormValue extends SignInFormValue {
  name: string;
  nickname: string;
  birthday: Date;
  code: string;
  passwordCheck: string;
}
