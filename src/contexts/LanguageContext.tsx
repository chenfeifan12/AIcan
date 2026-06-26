import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Language {
  code: 'english' | 'japanese' | 'korean';
  name: string;
  flag: string;
  nativeName: string;
}

interface LanguageContextType {
  selectedLanguage: Language | null;
  setSelectedLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

const availableLanguages: Language[] = [
  { code: 'english', name: '英语', flag: '🇬🇧', nativeName: 'English' },
  { code: 'japanese', name: '日语', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'korean', name: '韩语', flag: '🇰🇷', nativeName: '한국어' },
];

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
