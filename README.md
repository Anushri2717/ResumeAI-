# ResumeAI 📄

An AI-powered resume builder that generates tailored bullet points, scores ATS compatibility, matches resumes to job descriptions, and exports polished PDF/DOCX resumes.

## 🚀 Features
- AI-generated resume bullet points
- ATS compatibility scoring
- Job description matching
- Export to PDF/DOCX

## 🛠️ Tech Stack
React, Vite, Node.js, Express, MongoDB, Puppeteer, Anthropic SDK

## 📸 Screenshots

<table>
<tr>
<td align="center"><b>Resume Editor</b></td>
<td align="center"><b>ATS Score</b></td>
</tr>
<tr>
<td><img src="./screenshots/editor.png" width="400"/></td>
<td><img src="./screenshots/atsscore.png" width="400"/></td>
</tr>
<tr>
<td align="center"><b>Job Matching</b></td>
<td align="center"><b>Export Preview</b></td>
</tr>
<tr>
<td><img src="./screenshots/jobmatch.png" width="400"/></td>
<td><img src="./screenshots/export.png" width="400"/></td>
</tr>
</table>

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone <your-repo-link>
cd resumeai
```

2. Install dependencies (frontend & backend)
```bash
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables in `server/.env`

PORT=5000
MONGO_URI=mongodb://localhost:27017/resumebuilder
JWT_SECRET=your_secret_here
ANTHROPIC_API_KEY=your_anthropic_key_here
CLIENT_URL=http://localhost:5173

4. Run the app
```bash
# Backend
npm run dev

# Frontend (new terminal)
cd client && npm run dev
```

## 🌐 Live Demo
[View Live Demo](#)

## 👤 Author
Anushri — [Anushri2717](#)