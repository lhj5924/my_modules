import React, { forwardRef, useState, useRef } from 'react';
import { ClearIcon, ErrorIcon } from '../Icons';
import type { TextAreaProps } from '../../types/input';
import { MYCOLOR } from '../../style/Button.style';
import { InputContainer, Label, ActionButton, BottomInfo } from '../../style/Input.style';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
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
  rows = 4,
  minRows = 3,
  maxRows = 10,
  autoResize = false,
  onFocus,
  onBlur,
  onKeyDown,
  onClear,
  style,
  inputStyle,
}, ref) => {
  const [focused, setFocused] = useState(false);
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = ref || internalRef;

  const hasValue = value.length > 0;
  const actualError = error || !!errorText;
  const displayHelperText = errorText || helperText;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(newValue);
    
    if (autoResize && textareaRef && 'current' in textareaRef && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 20;
      const minHeight = minRows * lineHeight + 16;
      const maxHeight = maxRows * lineHeight + 16;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
    if (textareaRef && 'current' in textareaRef && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <InputContainer
      $fullWidth={fullWidth}
      $width={width}
      $variant={variant}
      $error={actualError}
      $focused={focused}
      $hasValue={hasValue}
      $disabled={disabled}
      $isTextArea={true}
      style={style}
    >
      {label && <Label $error={actualError}>{label}</Label>}
      
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="textarea-field"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          rows={autoResize ? minRows : rows}
          style={inputStyle}
        />
        
        <div className="input-actions">
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

TextArea.displayName = 'TextArea';