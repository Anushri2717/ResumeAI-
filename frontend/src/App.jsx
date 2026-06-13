import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/shared/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Checker from './pages/Checker';
import JDMatcher from './pages/JDMatcher';
import PrivateRoute from './components/shared/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/builder" element={<PrivateRoute><Builder /></PrivateRoute>} />
            <Route path="/builder/:id" element={<PrivateRoute><Builder /></PrivateRoute>} />
            <Route path="/checker" element={<PrivateRoute><Checker /></PrivateRoute>} />
            <Route path="/jd-match" element={<PrivateRoute><JDMatcher /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  );
}
