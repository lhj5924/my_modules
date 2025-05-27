import React from 'react';
import styled from 'styled-components';

interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: string;
  fullWidth?: boolean;
}

const StyledButtonGroup = styled.div<{
  $direction: 'horizontal' | 'vertical';
  $gap: string;
  $fullWidth: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.$direction === 'vertical' ? 'column' : 'row'};
  gap: ${props => props.$gap};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  flex-wrap: wrap;
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = 'horizontal',
  gap = '12px',
  fullWidth = false
}) => (
  <StyledButtonGroup
    $direction={direction}
    $gap={gap}
    $fullWidth={fullWidth}
  >
    {children}
  </StyledButtonGroup>
);