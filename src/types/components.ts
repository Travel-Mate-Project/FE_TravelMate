import React, {ReactNode} from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

type InputType = 'text' | 'password' | 'email' | 'date' | 'number';
type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  children: string | ReactNode;
  classNames?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonType;
  disabled?: boolean;
}

export interface NavigationButtonProps extends ButtonProps {
  href: string;
  onClick?: () => void;
}

export interface InputProps<T extends FieldValues> {
  label: Path<T>;
  placeholder: string;
  type: InputType;
  classNames?: string;
  autoComplete?: 'email' | 'name';
  register: UseFormRegister<T>;
  control?: Control<T>;
  required: boolean;
  disable?: boolean;
  maxLength?: number;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  readOnly?: boolean;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  error?: string;
}

export interface CheckboxProps {
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

export interface TripConfigurationFormValue {
  search: string;
  startDate: string;
  endDate: string;
  single: string;
}

export interface ModalProps {
  title: string;
  children: ReactNode;
  setValue?: UseFormSetValue<TripConfigurationFormValue>;
  // eslint-disable-next-line no-unused-vars
  handleChange?: <T>(value?: T) => void;
}

interface SelectOptions {
  value: string;
  label: string;
}

export interface SelectBoxProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
  classNames?: string;
  defaultValue?: string;
  options: SelectOptions[];
  label: string;
  onChange: <T>(event: T) => void;
  value?: string;
}
