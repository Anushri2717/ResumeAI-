const commonKeywords = {
  software: ['javascript','python','react','node.js','sql','api','git','agile','aws','docker','typescript','rest','microservices','ci/cd','kubernetes'],
  management: ['leadership','strategy','stakeholder','roadmap','kpi','budget','cross-functional','executive','p&l','team building'],
  marketing: ['seo','analytics','campaigns','content','roi','brand','growth','a/b testing','conversion','social media'],
  data: ['machine learning','data analysis','python','sql','tableau','power bi','statistics','modeling','etl','pipeline'],
  design: ['figma','ux','ui','wireframes','prototyping','user research','accessibility','design systems','adobe','sketch']
};

const extractKeywords = (text) => {
  const lower = text.toLowerCase();
  const found = [];
  Object.values(commonKeywords).flat().forEach(kw => {
    if (lower.includes(kw.toLowerCase())) found.push(kw);
  });
  return [...new Set(found)];
};

module.exports = { commonKeywords, extractKeywords };