export const validatePersonalInfo = (info) => {
  const errors = {};
  if (!info.fullName?.trim()) errors.fullName = 'Full name is required';
  if (!info.email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(info.email)) errors.email = 'Invalid email';
  return errors;
};

export const isResumeEmpty = (resumeData) => {
  const p = resumeData?.personalInfo;
  return !p?.fullName && !p?.email && !resumeData?.experience?.length;
};