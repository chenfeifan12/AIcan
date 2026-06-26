import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getAvailableLanguages } from '../data/courses';

interface Language {
  code: string;
  name: string;
  flag: string;
  color: string;
}

interface LanguageContextType {
  selectedLanguage: Language | null;
  setSelectedLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

const availableLanguages: Language[] = getAvailableLanguages();

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleSetSelectedLanguage = useCallback((lang: Language) => {
    setSelectedLanguage(lang);
  }, []);

  return (
    <LanguageContext.Provider 
      value={{ 
        selectedLanguage, 
        setSelectedLanguage: handleSetSelectedLanguage,
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
