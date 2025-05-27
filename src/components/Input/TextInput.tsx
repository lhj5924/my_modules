import React, { forwardRef, useRef, useState } from 'react';
import type { TextInputProps } from '../../types/input';
import { MYCOLOR } from '../../style/Button.style';
import { ActionButton, BottomInfo, InputContainer, Label, SuggestionDropdown, SuggestionItem } from '../../style/Input.style';
import { ClearIcon, ErrorIcon, EyeIcon, EyeOffIcon, SearchIcon } from '../Icons';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  type = 'text',
  variant = 'outlined',
  placeholder = '내용을 입력하세요',
  value,
  onChange,
  width,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  error = false,
  label,
  helperText,
  errorText,
  showCounter = false,
  maxLength,
  clearable = true,
  showPassword = false,
  onFocus,
  onBlur,
  onKeyDown,
  onClear,
  style,
  inputStyle,
  searchSuggestions = [],
  onSuggestionSelect,
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || internalRef;

  const hasValue = value.length > 0;
  const actualError = error || !!errorText;
  const displayHelperText = errorText || helperText;

  const handleFocus = () => {
    setFocused(true);
    if (variant === 'search' && searchSuggestions.length > 0) {
      setShowSuggestions(true);
    }
    onFocus?.();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
      setShowSuggestions(false);
    }, 150);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(newValue);
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
    if (inputRef && 'current' in inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    onSuggestionSelect?.(suggestion);
  };

  const getInputType = () => {
    if (type === 'password') {
      return showPwd ? 'text' : 'password';
    }
    return type;
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase()) && suggestion !== value
  );

  return (
    <InputContainer
      $fullWidth={fullWidth}
      $width={width}
      $variant={variant}
      $error={actualError}
      $focused={focused}
      $hasValue={hasValue}
      $disabled={disabled}
      style={style}
    >
      {label && <Label $error={actualError}>{label}</Label>}
      
      <div className="input-wrapper">
        {variant === 'search' && (
          <div className="search-icon">
            <SearchIcon />
          </div>
        )}
        
        <input
          ref={inputRef}
          type={getInputType()}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={inputStyle}
        />
        
        <div className="input-actions">
          {type === 'password' && showPassword && hasValue && (
            <ActionButton
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPwd ? <EyeOffIcon /> : <EyeIcon />}
            </ActionButton>
          )}
          
          {clearable && hasValue && !readOnly && !disabled && (
            <ActionButton
              type="button"
              onClick={handleClear}
              aria-label="내용 지우기"
            >
              <ClearIcon />
            </ActionButton>
          )}
          
          {actualError && (
            <div style={{ color: MYCOLOR.error_1 }}>
              <ErrorIcon />
            </div>
          )}
        </div>
        
        {variant === 'search' && showSuggestions && filteredSuggestions.length > 0 && (
          <SuggestionDropdown>
            {filteredSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                type="button"
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionDropdown>
        )}
      </div>
      
      {(displayHelperText || showCounter) && (
        <BottomInfo>
          <div className={`helper-text ${actualError ? 'error' : ''}`}>
            {displayHelperText}
          </div>
          {showCounter && maxLength && (
            <div className={`counter ${actualError ? 'error' : ''}`}>
              {value.length}/{maxLength}
            </div>
          )}
        </BottomInfo>
      )}
    </InputContainer>
  );
});

TextInput.displayName = 'TextInput';