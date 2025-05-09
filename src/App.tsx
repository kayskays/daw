import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import PostFeed from './pages/PostFeed';
import PostDetail from './pages/PostDetail';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<PostFeed />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;