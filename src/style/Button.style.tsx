import styled from "styled-components";

// 색상 상수 정의
export const MYCOLOR = {
  dark4: '#1A1A1A',
  white: '#FFFFFF',
  icon_white: '#FDFDFD',
  btn_primary_default: '#1F1F1F',
  btn_secondary_default: '#F5F5F7',
  text_on_btn: '#1D1D1F',
  text_on_btn_2: '#FDFDFD',
  accent16: '#E6F3FF',
  border_default: '#D1D1D6',
  text_disabled: '#8E8E93',
  btn_disabled: '#F2F2F7',
};

export const StyledButton = styled.button<{ 
    $variant: string; 
    $size: string; 
    $fullWidth: boolean; 
    $disabled: boolean; 
  }>`
    /* 기본 스타일 */
    border: none;
    outline: none;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    box-sizing: border-box;
    
    /* 크기별 스타일 */
    ${props => props.$size === 'small' && `
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      line-height: 16px;
    `}
    
    ${props => props.$size === 'medium' && `
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
    `}
    
    ${props => props.$size === 'large' && `
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
    `}
    
    /* variant별 스타일 */
    ${props => props.$variant === 'primary' && `
      background-color: ${MYCOLOR.btn_primary_default};
      color: ${MYCOLOR.white};
      
      &:hover:not(:disabled) {
        background-color: ${MYCOLOR.dark4};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
      }
      
      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 6px rgba(0, 122, 255, 0.2);
      }
    `}
    
    ${props => props.$variant === 'secondary' && `
      background-color: ${MYCOLOR.btn_secondary_default};
      color: ${MYCOLOR.text_on_btn};
      
      &:hover:not(:disabled) {
        background-color: ${MYCOLOR.accent16};
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    `}
    
    ${props => props.$variant === 'outlined' && `
      background-color: transparent;
      border: 1px solid ${MYCOLOR.btn_primary_default};
      color: ${MYCOLOR.btn_primary_default};
      
      &:hover:not(:disabled) {
        background-color: ${MYCOLOR.accent16};
        border-color: ${MYCOLOR.dark4};
      }
    `}
    
    ${props => props.$variant === 'text' && `
      background-color: transparent;
      color: ${MYCOLOR.btn_primary_default};
      padding: 4px 8px;
      
      &:hover:not(:disabled) {
        background-color: ${MYCOLOR.accent16};
        border-radius: 6px;
      }
    `}
    
    ${props => props.$variant === 'disabled' && `
      background-color: ${MYCOLOR.btn_disabled};
      color: ${MYCOLOR.text_disabled};
      cursor: not-allowed;
    `}
    
    /* 전체 너비 */
    ${props => props.$fullWidth && `
      width: 100%;
    `}
    
    /* 비활성화 상태 */
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
    
    /* 아이콘 스타일 */
    .icon-start, .icon-end, img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;