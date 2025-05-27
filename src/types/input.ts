export type InputVariant = 'default' | 'outlined' | 'underlined' | 'search';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';

export interface BaseInputProps {
  variant?: InputVariant;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  width?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  showCounter?: boolean;
  maxLength?: number;
  clearable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onClear?: () => void;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export interface TextInputProps extends BaseInputProps {
  type?: InputType;
  showPassword?: boolean;
  searchSuggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

export interface TextAreaProps extends BaseInputProps {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
}