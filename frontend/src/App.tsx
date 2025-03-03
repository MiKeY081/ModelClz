import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import ChatAssistant from './components/ChatAssistant';
import ApplicationForm from './pages/ApplicationForm';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Attendance from './pages/Attendance';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/virtual-tour" element={<VirtualTour />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/my-library" element={<MyLibrary />} />
            <Route path="/library/history" element={<LibraryHistory />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/community" element={<Community />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
        <ChatAssistant />
        <Footer />
      </div>
    </Router>
  );
}

export default App;