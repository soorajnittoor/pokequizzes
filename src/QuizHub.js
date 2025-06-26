import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizHub.css';

function QuizHub() {
  const navigate = useNavigate();

  return (
    <div
      className="hub-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h1 className="hub-title">Poke-Guessr</h1>
      <p>Select a Quiz Mode:</p>
      <div className="mode-buttons">
        <button onClick={() => navigate('/silhouette')}>Silhouette Mode</button>
        {/* Future modes here */}
      </div>
      <a
        className="support-button"
        href="https://www.paypal.me/soorajnittoor7002"
        target="_blank"
        rel="noopener noreferrer"
      >
        💛 Support Me
      </a>
    </div>
  );
}

export default QuizHub;
