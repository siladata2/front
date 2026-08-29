import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [progress, setProgress] = useState(0);
  // Link ya moja kwa moja - hakuna /app
  const targetLink = 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/';

  useEffect(() => {
    // Progress bar animation
    let progressValue = 0;
    const duration = 8000;
    const interval = 50;

    const timer = setInterval(() => {
      progressValue += (interval / duration) * 100;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(timer);
        // Redirect after 8 seconds
        window.location.href = targetLink;
      }
      setProgress(Math.floor(progressValue));
    }, interval);

    // Fallback redirect
    const fallback = setTimeout(() => {
      window.location.href = targetLink;
    }, 8500);

    return () => {
      clearInterval(timer);
      clearTimeout(fallback);
    };
  }, [targetLink]);

  return (
    <>
      <Head>
        <title>Inapakia...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0a0a;
          overflow: hidden;
          position: relative;
          margin: 0;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%);
          background-size: 500% 500%;
          animation: gradientBG 10s ease infinite;
          z-index: 0;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 0%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 100%; }
          100% { background-position: 0% 50%; }
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: floatParticle 20s infinite linear;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) rotate(72deg) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(720deg) scale(0);
            opacity: 0;
          }
        }

        .loader-container {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 50px 60px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
          animation: containerFade 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          max-width: 520px;
          width: 90%;
        }

        @keyframes containerFade {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .spinner-wrapper {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto 35px;
        }

        .spinner-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          animation: spinRing 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top-color: #f093fb;
          animation-delay: 0s;
          box-shadow: 0 0 20px rgba(240, 147, 251, 0.3);
        }

        .spinner-ring:nth-child(2) {
          border-right-color: #f5576c;
          animation-delay: 0.3s;
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          box-shadow: 0 0 20px rgba(245, 87, 108, 0.3);
        }

        .spinner-ring:nth-child(3) {
          border-bottom-color: #667eea;
          animation-delay: 0.6s;
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }

        @keyframes spinRing {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .spinner-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 36px;
          animation: pulseIcon 1.5s ease-in-out infinite;
          z-index: 2;
          filter: drop-shadow(0 0 20px rgba(240, 147, 251, 0.3));
        }

        @keyframes pulseIcon {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        h2 {
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 30px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #fff 0%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 30px;
          font-weight: 300;
          letter-spacing: 2px;
        }

        .progress-container {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .progress-bar {
          height: 100%;
          width: ${progress}%;
          background: linear-gradient(90deg, #f093fb, #f5576c, #667eea, #764ba2, #f093fb);
          background-size: 300% 100%;
          border-radius: 10px;
          animation: progressGradient 3s linear infinite;
          transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 0 20px rgba(240, 147, 251, 0.3);
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          right: 0;
          top: -3px;
          width: 16px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          filter: blur(6px);
          opacity: 0.5;
          animation: glowPulse 1s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        @keyframes progressGradient {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        .progress-text {
          margin-top: 15px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
          letter-spacing: 3px;
        }

        .progress-text span {
          color: #fff;
          font-weight: 700;
          font-size: 18px;
        }

        .status-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 25px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: dotPulse 1.6s ease-in-out infinite;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dot:nth-child(2) { animation-delay: 0.3s; }
        .dot:nth-child(3) { animation-delay: 0.6s; }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.3;
            background: rgba(255, 255, 255, 0.1);
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            box-shadow: 0 0 20px rgba(240, 147, 251, 0.4);
          }
        }

        .loading-text {
          margin-top: 20px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 4px;
          text-transform: uppercase;
          animation: textPulse 2s ease-in-out infinite;
        }

        @keyframes textPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        @media (max-width: 640px) {
          .loader-container {
            padding: 35px 25px;
            margin: 20px;
          }
          .spinner-wrapper {
            width: 80px;
            height: 80px;
          }
          .spinner-icon {
            font-size: 28px;
          }
          h2 {
            font-size: 26px;
          }
          .subtitle {
            font-size: 13px;
          }
          .progress-text {
            font-size: 12px;
          }
          .progress-text span {
            font-size: 16px;
          }
        }

        @media (max-width: 400px) {
          .loader-container {
            padding: 25px 18px;
          }
          h2 {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="particles" id="particles"></div>

      <div className="loader-container">
        <div className="spinner-wrapper">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-icon">⚡</div>
        </div>

        <h2>Inapakia...</h2>
        <p className="subtitle">Tunaandaa mazingira bora kwako</p>

        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
        <div className="progress-text">
          <span>{progress}</span> % imekamilika
        </div>

        <div className="status-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="loading-text">✦ Subiri kidogo ✦</div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function createParticles() {
            const container = document.getElementById('particles');
            const colors = ['#f093fb', '#f5576c', '#667eea', '#764ba2', '#43e97b', '#38f9d7'];
            
            for (let i = 0; i < 40; i++) {
              const particle = document.createElement('div');
              particle.className = 'particle';
              particle.style.left = Math.random() * 100 + '%';
              particle.style.animationDuration = (15 + Math.random() * 25) + 's';
              particle.style.animationDelay = (Math.random() * 20) + 's';
              const size = 3 + Math.random() * 8;
              particle.style.width = size + 'px';
              particle.style.height = size + 'px';
              particle.style.background = colors[Math.floor(Math.random() * colors.length)];
              particle.style.opacity = 0.1 + Math.random() * 0.3;
              particle.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + colors[Math.floor(Math.random() * colors.length)];
              container.appendChild(particle);
            }
          })();
        `
      }} />
    </>
  );
}