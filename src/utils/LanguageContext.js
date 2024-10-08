import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isRussian, setIsRussian] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsRussian(savedLanguage === 'ru');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = !isRussian ? 'ru' : 'en';
    setIsRussian(!isRussian);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ isRussian, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
