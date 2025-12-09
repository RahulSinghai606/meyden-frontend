'use client';

import React from 'react';
import { useI18n } from '../contexts/I18nContext';

interface LanguageSwitcherProps {
    variant?: 'dropdown' | 'toggle' | 'buttons';
    className?: string;
}

export function LanguageSwitcher({ variant = 'toggle', className = '' }: LanguageSwitcherProps) {
    const { language, setLanguage, isRTL } = useI18n();

    if (variant === 'toggle') {
        return (
            <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          transition-colors duration-200
          text-sm font-medium text-gray-700 dark:text-gray-200
          ${className}
        `}
                aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
                <span className="text-lg">{language === 'en' ? '🇬🇧' : '🇦🇪'}</span>
                <span>{language === 'en' ? 'EN' : 'عربي'}</span>
            </button>
        );
    }

    if (variant === 'buttons') {
        return (
            <div className={`flex gap-1 ${className}`}>
                <button
                    onClick={() => setLanguage('en')}
                    className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
            ${language === 'en'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                        }
          `}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage('ar')}
                    className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
            ${language === 'ar'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                        }
          `}
                >
                    عربي
                </button>
            </div>
        );
    }

    // Dropdown variant
    return (
        <div className={`relative ${className}`}>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                className={`
          appearance-none px-4 py-2 pr-8 rounded-lg
          bg-gray-100 dark:bg-gray-800
          text-gray-700 dark:text-gray-200
          border border-gray-200 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer
          ${isRTL ? 'text-right' : 'text-left'}
        `}
            >
                <option value="en">🇬🇧 English</option>
                <option value="ar">🇦🇪 العربية</option>
            </select>
            <div className={`absolute inset-y-0 ${isRTL ? 'left-2' : 'right-2'} flex items-center pointer-events-none`}>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
