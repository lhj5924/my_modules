import React, { type CSSProperties } from 'react';
import { MYCOLOR, StyledButton } from './Button.style';
import rightArrowWhite from './assets/images/ic_arrow_right_16_white.png';
import rightArrowBlack from './assets/images/ic_arrow_right_16_black.png';

// 버튼 Props 인터페이스
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  arrow?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

// 버튼 컴포넌트
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  arrow = true,
  startIcon,
  endIcon,
  children,
  onClick,
  style,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading || variant === 'disabled';
  
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $disabled={isDisabled}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      style={style}
      className={className}
      {...props}
    >
      {loading && <div className="loading-spinner" />}
      {startIcon && !loading && <span className="icon-start">{startIcon}</span>}
      <span>{children}</span>
      {arrow && !loading && <span className="icon-right-arrow"><ArrowIcon style={variant} /></span>}
      {endIcon && !loading && <span className="icon-end">{endIcon}</span>}
    </StyledButton>
  );
};

const ArrowIcon = ({ style = 'primary' }) => (
    <>
    {(style === 'primary') 
        ? <img src={rightArrowWhite} alt="right arrow" width={16} height={16} />
        : <img src={rightArrowBlack} alt="right arrow" width={16} height={16} />
    }
    </>
)

// 데모 컴포넌트
const ButtonDemo = () => {

  return (
    <div style={{ padding: '32px', fontFamily: 'Pretendard, sans-serif' }}>
      <h1 style={{ marginBottom: '32px', color: '#1D1D1F' }}>코어 버튼 컴포넌트</h1>
      
      {/* Variant별 버튼들 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Variants</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="disabled">Disabled</Button>
        </div>
      </section>

      {/* 크기별 버튼들 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Sizes</h2>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>

      {/* 전체 너비 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Full Width</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button fullWidth>전체 너비 Primary</Button>
          <Button variant="secondary" fullWidth>전체 너비 Secondary</Button>
          <Button variant="outlined" fullWidth >
            전체 너비 Outlined
          </Button>
        </div>
      </section>

      {/* 비활성화 상태 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Disabled States</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button disabled>비활성화 Primary</Button>
          <Button variant="secondary" disabled>비활성화 Secondary</Button>
          <Button variant="outlined" disabled>비활성화 Outlined</Button>
        </div>
      </section>

      {/* 실제 사용 예시 */}
      <section>
        <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>실제 사용 예시</h2>
        <div style={{ 
          padding: '24px', 
          border: `1px solid ${MYCOLOR.border_default}`, 
          borderRadius: '12px',
          backgroundColor: '#F8F9FA' 
        }}>
          <h3 style={{ marginBottom: '16px', color: '#1D1D1F' }}>회원가입 폼</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
            <Button fullWidth size="large">회원가입</Button>
            <Button variant="outlined" fullWidth>Google로 계속하기</Button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="text" style={{ flex: 1 }}>취소</Button>
              <Button variant="secondary" style={{ flex: 1 }}>이전으로</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonDemo;