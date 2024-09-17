import React, {ReactNode} from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type InputType = 'text' | 'password' | 'email' | 'date' | 'number';
type ButtonType = 'button' | 'submit' | 'reset';

export interface BasicButtonProps {
  children: string | ReactNode;
  classNames?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonType;
  disabled?: boolean;
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
  classNames?: string;
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

export interface BasicCheckboxProps {
  label: string;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
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
  allTermsAgreed: boolean;
  personalInfoAgreed: boolean;
  uniqueIdentifierAgreed: boolean;
  serviceTermsAgreed: boolean;
}
