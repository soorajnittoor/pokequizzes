import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SilhouetteQuiz from './SilhouetteQuiz';
import QuizHub from './QuizHub';
import './Quiz.css';
import './QuizHub.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHub />} />
        <Route path="/silhouette" element={<SilhouetteQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
