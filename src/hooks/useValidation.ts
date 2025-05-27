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