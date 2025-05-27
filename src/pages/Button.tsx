
import React from 'react';
import { MYCOLOR } from '../style/Button.style';
import { Button, ButtonGroup } from '../components/Button';

const VariantSection: React.FC = () => (
  <section style={{ marginBottom: '40px' }}>
    <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Variants</h2>
    <ButtonGroup>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="disabled">Disabled</Button>
    </ButtonGroup>
  </section>
);

const SizeSection: React.FC = () => (
  <section style={{ marginBottom: '40px' }}>
    <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Sizes</h2>
    <ButtonGroup>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </ButtonGroup>
  </section>
);

const FullWidthSection: React.FC = () => (
  <section style={{ marginBottom: '40px' }}>
    <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Full Width</h2>
    <ButtonGroup direction="vertical">
      <Button fullWidth>전체 너비 Primary</Button>
      <Button variant="secondary" fullWidth>전체 너비 Secondary</Button>
      <Button variant="outlined" fullWidth>전체 너비 Outlined</Button>
    </ButtonGroup>
  </section>
);

const DisabledSection: React.FC = () => (
  <section style={{ marginBottom: '40px' }}>
    <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>Disabled States</h2>
    <ButtonGroup>
      <Button disabled>비활성화 Primary</Button>
      <Button variant="secondary" disabled>비활성화 Secondary</Button>
      <Button variant="outlined" disabled>비활성화 Outlined</Button>
    </ButtonGroup>
  </section>
);

const UseCaseSection: React.FC = () => (
  <section>
    <h2 style={{ marginBottom: '16px', color: '#1D1D1F' }}>실제 사용 예시</h2>
    <div style={{ 
      padding: '24px', 
      border: `1px solid ${MYCOLOR.border_default}`, 
      borderRadius: '12px',
      backgroundColor: '#F8F9FA' 
    }}>
      <h3 style={{ marginBottom: '16px', color: '#1D1D1F' }}>회원가입 폼</h3>
      <div style={{ maxWidth: '300px' }}>
        <ButtonGroup direction="vertical">
          <Button fullWidth size="large">회원가입</Button>
          <Button variant="outlined" fullWidth>Google로 계속하기</Button>
        </ButtonGroup>
        <div style={{ marginTop: '12px' }}>
          <ButtonGroup>
            <Button variant="text" style={{ flex: 1 }}>취소</Button>
            <Button variant="secondary" style={{ flex: 1 }}>이전으로</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  </section>
);

// 메인 데모 컴포넌트
const ButtonDemo: React.FC = () => (
  <div style={{ padding: '32px', fontFamily: 'Pretendard, sans-serif' }}>
    <h1 style={{ marginBottom: '32px', color: '#1D1D1F' }}>코어 버튼 컴포넌트</h1>
    
    <VariantSection />
    <SizeSection />
    <FullWidthSection />
    <DisabledSection />
    <UseCaseSection />
  </div>
);

export default ButtonDemo;