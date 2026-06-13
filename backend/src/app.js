const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
 
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const checkerRoutes = require('./routes/checkerRoutes');
const aiRoutes = require('./routes/aiRoutes');
const jdMatchRoutes = require('./routes/jdMatchRoutes');
const exportRoutes = require('./routes/exportRoutes');
const errorHandler = require('./middleware/errorHandler');
 
const app = express();
 
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
 
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/checker', checkerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/jd-match', jdMatchRoutes);
app.use('/api/export', exportRoutes);
 
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
 
app.use(errorHandler);
 
module.exports = app;