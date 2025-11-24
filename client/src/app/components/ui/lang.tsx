"use client";
import React, { useEffect, useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "th", label: "Thai" },
];

const LANG_KEY = "selectedLang";

export default function LanguageChanger() {
  const [currentLang, setCurrentLang] = useState(languages[0].code);

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang) {
      setCurrentLang(storedLang);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLang(e.target.value);
    localStorage.setItem(LANG_KEY, e.target.value);
    // Add your language change logic here (e.g., i18n.changeLanguage)
  };

  return (
    <div className="z-50 fixed top-4 right-4 bg-white p-2 rounded shadow-lg">
      <label htmlFor="lang-select">Language: </label>
      <select id="lang-select" value={currentLang} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
