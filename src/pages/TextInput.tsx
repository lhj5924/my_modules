import { useState } from 'react';
import { TextArea, TextInput } from '../components/Input';
import { useValidation } from '../hooks/useValidation';
import { MYCOLOR } from '../style/Button.style';

export const InputSystemDemo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');

  const { validateEmail, validatePassword } = useValidation();

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