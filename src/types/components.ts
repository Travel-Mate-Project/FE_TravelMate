import {QueryFunction, QueryKey} from '@tanstack/react-query';
import React, {ReactNode} from 'react';
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import {RegionType} from '@/types/response';
import {Location} from '@/types/store';

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
  autoComplete?: 'email' | 'name' | 'off';
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
  ModalHeight?: string;
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
  // eslint-disable-next-line no-unused-vars
  onChange: <T>(event: T) => void;
  value?: string;
}

export interface TitleProps {
  title: string;
  children: ReactNode;
}

export type Variant = 'course' | 'place' | 'region';

export interface CardProps {
  region: RegionType;
  width?: number;
  height?: number;
  // NOTICE: course-코스 , place-명소, region-지역
  variant: Variant;
}

export interface QueryConfig {
  queryKey: QueryKey;
  queryFn: QueryFunction;
}

export interface ServerPrefetchProviderProps {
  children: ReactNode;
  queries: QueryConfig | QueryConfig[];
}

export interface CarouseButtonProps extends ButtonProps {
  isNext: boolean;
}

export interface TimeInputProps {
  [key: string]: {
    startTime: string;
    endTime: string;
  };
}

export type LatLngLiteral = google.maps.LatLngLiteral;
export type MapOptions = google.maps.MapOptions;

export interface DndCardProps extends Location {
  moveCard: (_id: number, _to: number) => void;
  findCard: (_id: number) => {index: number};
}
