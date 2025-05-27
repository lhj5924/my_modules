import React from 'react';
import { StyledButton } from '../../style/Button.style';
import type { ButtonProps } from '../../types/button';
import { ArrowIcon } from '../Icons';

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
      {startIcon && !loading && <span className="icon-start">{startIcon}</span>}
      <span>{children}</span>
      {arrow && !loading && <span className="icon-right-arrow"><ArrowIcon variant={variant} /></span>}
      {endIcon && !loading && <span className="icon-end">{endIcon}</span>}
    </StyledButton>
  );
};