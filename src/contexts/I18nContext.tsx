'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

type Language = 'en' | 'ar';
type Translations = typeof en;

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
    isRTL: boolean;
}

const translations: Record<Language, Translations> = { en, ar };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string {
    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return path; // Return the key if not found
        }
    }

    return typeof value === 'string' ? value : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load saved language preference
        const saved = localStorage.getItem('meyden-language') as Language;
        if (saved && (saved === 'en' || saved === 'ar')) {
            setLanguageState(saved);
        }
    }, []);

    useEffect(() => {
        // Update document direction and language
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;

        // Add RTL class for styling
        if (language === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('meyden-language', lang);
    };

    const t = (key: string): string => {
        return getNestedValue(translations[language], key);
    };

    const value: I18nContextType = {
        language,
        setLanguage,
        t,
        dir: language === 'ar' ? 'rtl' : 'ltr',
        isRTL: language === 'ar',
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}

export function useTranslation() {
    const { t, language, isRTL, dir } = useI18n();
    return { t, language, isRTL, dir };
}
