import { createContext, useContext, useState, useCallback } from 'react';

const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', summary: '' },
  experience: [],
  education: [],
  skills: { technical: [], soft: [], languages: [], tools: [] },
  projects: [],
  certifications: []
};

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResume);
  const [checkerResult, setCheckerResult] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  const updateSection = useCallback((section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  }, []);

  const updatePersonalInfo = useCallback((field, value) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }, []);

  const resetResume = useCallback(() => setResumeData(defaultResume), []);
  const loadResume = useCallback((data) => setResumeData({ ...defaultResume, ...data }), []);

  return (
    <ResumeContext.Provider value={{
      resumeData, updateSection, updatePersonalInfo,
      resetResume, loadResume, setResumeData,
      checkerResult, setCheckerResult,
      matchResult, setMatchResult
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
