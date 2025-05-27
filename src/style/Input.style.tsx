import styled from 'styled-components';
import { MYCOLOR } from './Button.style';
import type { InputVariant } from '../types/input';

export const InputContainer = styled.div<{ 
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

export const ActionButton = styled.button`
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

export const BottomInfo = styled.div`
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

export const SuggestionDropdown = styled.div`
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

export const SuggestionItem = styled.button`
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

export const Label = styled.label<{ $error: boolean }>`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${props => props.$error ? MYCOLOR.error_1 : MYCOLOR.text_default};
  display: block;
`;