import React, { forwardRef, useState, useRef } from 'react';
import styled from 'styled-components';

// 색상 상수 정의
const MYCOLOR = {
  white: '#FFFFFF',
  text_default: '#1D1D1F',
  text_secondary: '#8E8E93',
  text_disabled: '#C7C7CC',
  gray_5: '#E5E5EA',
  gray_7: '#AEAEB2',
  gray_12: '#48484A',
  error_1: '#FF3B30',
  icon_secondary: '#8E8E93',
  btn_primary_default: '#1F1F1F',
  accent16: '#E6F3FF',
  border_default: '#D1D1D6',
  bgBase2: '#F8F9FA',
};

// 공통 타입 정의
export type InputVariant = 'default' | 'outlined' | 'underlined' | 'search';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number';

// 기본 입력 필드 Props
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

// 텍스트 입력 필드 Props
export interface TextInputProps extends BaseInputProps {
  type?: InputType;
  showPassword?: boolean;
  searchSuggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

// 텍스트 영역 Props
export interface TextAreaProps extends BaseInputProps {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
}

// 메인 컨테이너
const InputContainer = styled.div<{ 
  $fullWidth: boolean; 
  $width?: string; 
  $variant: InputVariant;
  $error: boolean;
  $focused: boolean;
  $hasValue: boolean;
  $disabled: boolean;
  $isTextArea?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${props => props.$fullWidth ? '100%' : props.$width || '261px'};
  
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: ${props => props.$isTextArea ? 'flex-start' : 'center'};
    padding: ${props => {
      if (props.$isTextArea) return '8px 12px';
      return props.$variant === 'search' ? '8px 12px' : '8px 12px';
    }};
    background: ${props => props.$disabled ? '#F2F2F7' : MYCOLOR.white};
    transition: all 0.2s ease;
    min-height: ${props => props.$isTextArea ? '116px' : 'auto'};
    
    ${props => {
      switch (props.$variant) {
        case 'outlined':
          return `
            border: 1px solid ${props.$error ? MYCOLOR.error_1 : 
                                props.$focused ? MYCOLOR.gray_12 : 
                                props.$hasValue ? MYCOLOR.gray_7 : MYCOLOR.gray_5};
            border-radius: 8px;
          `;
        case 'underlined':
          return `
            border: none;
            border-bottom: 1px solid ${props.$error ? MYCOLOR.error_1 : 
                                       props.$focused ? MYCOLOR.gray_12 : 
                                       props.$hasValue ? MYCOLOR.gray_7 : MYCOLOR.gray_5};
            border-radius: 0;
            padding-left: 0;
            padding-right: 0;
          `;
        case 'search':
          return `
            border: 1px solid ${props.$focused ? MYCOLOR.gray_12 : MYCOLOR.gray_5};
            border-radius: 8px;
            background: ${MYCOLOR.white};
          `;
        default:
          return `
            border: 1px solid ${props.$error ? MYCOLOR.error_1 : 
                                props.$focused ? MYCOLOR.gray_12 : 
                                props.$hasValue ? MYCOLOR.gray_7 : MYCOLOR.gray_5};
            border-radius: 8px;
          `;
      }
    }}
    
    &:hover:not(:focus-within) {
      ${props => !props.$disabled && !props.$error && `
        border-color: ${MYCOLOR.gray_7};
      `}
    }
  }
  
  .input-field, .textarea-field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${props => props.$disabled ? MYCOLOR.text_disabled : MYCOLOR.text_default};
    resize: none;
    
    &::placeholder {
      color: ${MYCOLOR.text_secondary};
    }
    
    &:disabled {
      cursor: not-allowed;
    }
  }
  
  .textarea-field {
    min-height: 100px;
    width: 100%;
  }
  
  .input-actions {
    display: flex;
    align-items: ${props => props.$isTextArea ? 'flex-start' : 'center'};
    gap: 8px;
    margin-left: 8px;
    ${props => props.$isTextArea ? 'margin-top: 0;' : ''}
  }
  
  .search-icon {
    margin-right: 8px;
    color: ${MYCOLOR.text_secondary};
  }
`;

// 액션 버튼
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: ${MYCOLOR.icon_secondary};
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.7;
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// 하단 정보 영역
const BottomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  font-size: 12px;
  line-height: 16px;
  
  .helper-text {
    color: ${MYCOLOR.text_secondary};
    
    &.error {
      color: ${MYCOLOR.error_1};
    }
  }
  
  .counter {
    color: ${MYCOLOR.text_secondary};
    font-size: 12px;
    
    &.error {
      color: ${MYCOLOR.error_1};
    }
  }
`;

// 검색 제안 드롭다운
const SuggestionDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${MYCOLOR.border_default};
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

const SuggestionItem = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 14px;
  color: ${MYCOLOR.text_default};
  cursor: pointer;
  
  &:hover {
    background: ${MYCOLOR.accent16};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${MYCOLOR.gray_5};
  }
`;

// 레이블
const Label = styled.label<{ $error: boolean }>`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.$error ? MYCOLOR.error_1 : MYCOLOR.text_default};
  display: block;
`;

// 아이콘 컴포넌트들
const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="m4.646 4.646.708-.708L8 6.586l2.646-2.647.708.708L8.707 7.5l2.647 2.646-.708.708L8 8.207l-2.646 2.647-.708-.708L6.293 7.5 4.646 4.646z"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
  </svg>
);

// 텍스트 입력 컴포넌트
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

// 텍스트 영역 컴포넌트
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
    
    // 자동 리사이즈
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

// 유효성 검사 훅
export const useValidation = () => {
  const validateEmail = (email: string): string => {
    if (!email) return '이메일을 입력해주세요';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return '비밀번호를 입력해주세요';
    if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다';
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return '영문과 숫자를 포함해야 합니다';
    }
    return '';
  };

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) return `${fieldName}을(를) 입력해주세요`;
    return '';
  };

  const validateLength = (value: string, min: number, max: number, fieldName: string): string => {
    if (value.length < min) return `${fieldName}은(는) ${min}자 이상이어야 합니다`;
    if (value.length > max) return `${fieldName}은(는) ${max}자 이하여야 합니다`;
    return '';
  };

  return {
    validateEmail,
    validatePassword,
    validateRequired,
    validateLength,
  };
};

// 실제 사용 예시
export const InputSystemDemo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');

  const { validateEmail, validatePassword, validateRequired } = useValidation();

  const emailDomains = [
    'gmail.com', 'naver.com', 'yahoo.com', 'hotmail.com', 
    'outlook.com', 'daum.net', 'kakao.com', 'icloud.com'
  ];

  const getEmailSuggestions = () => {
    if (!email.includes('@') && email.length > 0) {
      return emailDomains.map(domain => `${email}@${domain}`);
    }
    return [];
  };

  const emailError = email ? validateEmail(email) : '';
  const passwordError = password ? validatePassword(password) : '';
  const confirmPasswordError = confirmPassword && password !== confirmPassword ? '비밀번호가 일치하지 않습니다' : '';
  const titleError = title.length > 50 ? '제목은 50자 이하여야 합니다' : '';
  const contentError = content.length > 500 ? '내용은 500자 이하여야 합니다' : '';

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: MYCOLOR.bgBase2,
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '32px', color: MYCOLOR.text_default }}>
        완전한 통합 입력 시스템
      </h1>
      
      {/* 로그인 폼 예시 */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '24px', 
        backgroundColor: MYCOLOR.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px', color: MYCOLOR.text_default }}>로그인 폼</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={setEmail}
            errorText={emailError}
            searchSuggestions={getEmailSuggestions()}
            onSuggestionSelect={setEmail}
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={setPassword}
            showPassword
            errorText={passwordError}
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword
            errorText={confirmPasswordError}
            fullWidth
          />
        </div>
      </div>

      {/* 검색 예시 */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '24px', 
        backgroundColor: MYCOLOR.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px', color: MYCOLOR.text_default }}>검색</h2>
        
        <TextInput
          variant="search"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={setSearch}
          fullWidth
        />
      </div>

      {/* 게시물 작성 예시 */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '24px', 
        backgroundColor: MYCOLOR.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px', color: MYCOLOR.text_default }}>게시물 작성</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <TextInput
            variant="underlined"
            label="제목"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={setTitle}
            maxLength={50}
            showCounter
            errorText={titleError}
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextArea
            label="내용"
            placeholder="게시물 내용을 입력하세요"
            value={content}
            onChange={setContent}
            maxLength={500}
            showCounter
            errorText={contentError}
            autoResize
            minRows={3}
            maxRows={8}
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextArea
            label="설명 (고정 크기)"
            placeholder="추가 설명을 입력하세요"
            value={description}
            onChange={setDescription}
            maxLength={200}
            showCounter
            rows={4}
            fullWidth
          />
        </div>
      </div>

      {/* 다양한 스타일 예시 */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '24px', 
        backgroundColor: MYCOLOR.white,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '24px', color: MYCOLOR.text_default }}>다양한 상태</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="비활성화 상태"
            value="수정할 수 없는 내용"
            onChange={() => {}}
            disabled
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="읽기 전용"
            value="읽기만 가능한 내용"
            onChange={() => {}}
            readOnly
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextInput
            label="에러 상태"
            value="잘못된 입력값"
            onChange={() => {}}
            error
            errorText="올바르지 않은 형식입니다"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default InputSystemDemo;