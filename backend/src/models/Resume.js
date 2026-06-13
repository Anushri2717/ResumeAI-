const mongoose = require('mongoose');
 
const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Resume' },
  template: { type: String, enum: ['modern', 'classic', 'creative'], default: 'modern' },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
    summary: String
  },
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    location: String,
    bullets: [String]
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
    tools: [String]
  },
  projects: [{
    name: String,
    description: String,
    techStack: [String],
    link: String,
    bullets: [String]
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }]
}, { timestamps: true });
 
module.exports = mongoose.model('Resume', resumeSchema);