import styled from 'styled-components';
import type { ButtonVariant, ButtonSize } from '../types/button';

export const MYCOLOR = {
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

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  position: relative;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* 크기별 스타일 */
  ${props => {
    switch (props.$size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
          line-height: 20px;
          min-height: 36px;
        `;
      case 'large':
        return `
          padding: 12px 24px;
          font-size: 16px;
          line-height: 24px;
          min-height: 48px;
        `;
      default: // medium
        return `
          padding: 10px 20px;
          font-size: 14px;
          line-height: 20px;
          min-height: 40px;
        `;
    }
  }}
  
  /* 변형별 스타일 */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.$disabled ? MYCOLOR.gray_5 : MYCOLOR.btn_primary_default};
          color: ${props.$disabled ? MYCOLOR.text_disabled : MYCOLOR.white};
          
          &:hover:not(:disabled) {
            background: ${MYCOLOR.gray_12};
          }
          
          &:active:not(:disabled) {
            background: #000000;
          }
        `;
      case 'secondary':
        return `
          background: ${props.$disabled ? MYCOLOR.gray_5 : MYCOLOR.gray_7};
          color: ${props.$disabled ? MYCOLOR.text_disabled : MYCOLOR.white};
          
          &:hover:not(:disabled) {
            background: ${MYCOLOR.gray_12};
          }
        `;
      case 'outlined':
        return `
          background: transparent;
          border: 1px solid ${props.$disabled ? MYCOLOR.gray_5 : MYCOLOR.border_default};
          color: ${props.$disabled ? MYCOLOR.text_disabled : MYCOLOR.text_default};
          
          &:hover:not(:disabled) {
            background: ${MYCOLOR.bgBase2};
            border-color: ${MYCOLOR.gray_7};
          }
        `;
      case 'text':
        return `
          background: transparent;
          color: ${props.$disabled ? MYCOLOR.text_disabled : MYCOLOR.text_default};
          
          &:hover:not(:disabled) {
            background: ${MYCOLOR.bgBase2};
          }
        `;
      case 'disabled':
        return `
          background: ${MYCOLOR.gray_5};
          color: ${MYCOLOR.text_disabled};
          cursor: not-allowed;
        `;
      default:
        return '';
    }
  }}
  
  .loading-spinner {
    width: 16px;
    height: 16px;
  }
  
  .icon-start,
  .icon-end,
  .icon-right-arrow {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  
  &:focus-visible {
    outline: 2px solid ${MYCOLOR.accent16};
    outline-offset: 2px;
  }
`;