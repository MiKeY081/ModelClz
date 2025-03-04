import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Home from './pages/Home';
import VirtualTour from './pages/VirtualTour';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Library from './pages/Library';
import MyLibrary from './pages/MyLibrary';
import LibraryHistory from './pages/LibraryHistory';
import Achievements from './pages/Achievements';
import Assignments from './pages/Assignments';
import Grades from './pages/Grades';
import Community from './pages/Community';
import ApplicationForm from './pages/ApplicationForm';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import NotFound from './pages/NotFound';
import SupportPrivacy from './pages/SupportPrivacy';
import SupportTerms from './pages/SupportTerms';
import SupportCookies from './pages/SupportCookies';
import AboutStory from './pages/AboutStory';
import AboutMission from './pages/AboutMission';
import AboutLeadership from './pages/AboutLeadership';
import AboutCareers from './pages/AboutCarrers';
import CommunityAlumni from './pages/CommunityAlumini';
import Support from './pages/Support';
import SupportFAQ from './pages/SupportFAQ';
import SupportContact from './pages/SupportContact';
import SupportFeedback from './pages/SupportFeedback';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/library/my-library" element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />
              <Route path="/library/history" element={<ProtectedRoute><LibraryHistory /></ProtectedRoute>} />
              <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
              <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
              <Route path="/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
              <Route path="/apply" element={<ProtectedRoute><ApplicationForm /></ProtectedRoute>} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
              <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
              {/* New Routes */}
              <Route path="/support/privacy" element={<SupportPrivacy />} />
              <Route path="/support/terms" element={<SupportTerms />} />
              <Route path="/support/cookies" element={<SupportCookies />} />
              <Route path="/about/story" element={<AboutStory />} />
              <Route path="/about/mission" element={<AboutMission />} />
              <Route path="/about/leadership" element={<AboutLeadership />} />
              <Route path="/about/careers" element={<AboutCareers />} />
              <Route path="/community/alumni" element={<ProtectedRoute><CommunityAlumni /></ProtectedRoute>} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/faq" element={<SupportFAQ />} />
              <Route path="/support/contact" element={<SupportContact />} />
              <Route path="/support/feedback" element={<SupportFeedback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <ChatAssistant />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;