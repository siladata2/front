import { useState, useEffect } from 'react';
import Head from 'next/head';

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || 'silaoo22';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [newLink, setNewLink] = useState('');
  const [currentLink, setCurrentLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in (session storage)
    const logged = sessionStorage.getItem('admin_logged');
    if (logged === 'true') {
      setIsLoggedIn(true);
      fetchCurrentLink();
    }
  }, []);

  const fetchCurrentLink = async () => {
    try {
      const res = await fetch('/api/get-link');
      const data = await res.json();
      if (data.link) {
        setCurrentLink(data.link);
      }
    } catch (err) {
      console.error('Error fetching link:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    if (pin === ADMIN_PIN) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged', 'true');
      setError('');
      await fetchCurrentLink();
    } else {
      setError('❌ PIN si sahihi! Jaribu tena.');
    }
    setIsLoading(false);
  };

  const handleUpdateLink = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    if (!newLink || !newLink.startsWith('http')) {
      setError('❌ Tafadhali weka link sahihi (inaanzia http:// au https://)');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/update-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: ADMIN_PIN, newLink }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage('✅ Link imebadilishwa kikamilifu!');
        setCurrentLink(newLink);
        setNewLink('');
        // Refresh the link display
        await fetchCurrentLink();
      } else {
        setError(data.error || '❌ Kuna tatizo, jaribu tena.');
      }
    } catch (err) {
      setError('❌ Kuna tatizo la server, jaribu tena.');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged');
    setIsLoggedIn(false);
    setPin('');
    setMessage('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentLink);
    const btn = document.querySelector('.copy-btn');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Panel - Premium</title>
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
          background-image: 
            radial-gradient(ellipse at 10% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(245, 87, 108, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(118, 75, 162, 0.08) 0%, transparent 70%);
          padding: 20px;
          margin: 0;
        }

        .admin-container {
          background: rgba(22, 22, 35, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          padding: 45px 50px;
          border-radius: 40px;
          width: 100%;
          max-width: 540px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 
            0 30px 100px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transition: all 0.3s ease;
        }

        .admin-container:hover {
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .admin-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .admin-header .icon {
          font-size: 52px;
          margin-bottom: 12px;
          display: block;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .admin-header h1 {
          font-size: 30px;
          font-weight: 800;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 40%, #667eea 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .admin-header p {
          color: rgba(255, 255, 255, 0.35);
          font-size: 14px;
          margin-top: 6px;
          letter-spacing: 2px;
          font-weight: 300;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 15px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 2px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          outline: none;
          font-family: inherit;
        }

        .form-group input:focus {
          border-color: #f093fb;
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 40px rgba(240, 147, 251, 0.08);
          transform: scale(1.01);
        }

        .form-group input::placeholder {
          color: rgba(255, 255, 255, 0.15);
        }

        .btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }

        .btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn:hover::after {
          opacity: 1;
        }

        .btn:active {
          transform: scale(0.97);
        }

        .btn-primary {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: #fff;
          box-shadow: 0 10px 40px rgba(245, 87, 108, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(245, 87, 108, 0.4);
        }

        .btn-success {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          color: #0a0a0a;
          box-shadow: 0 10px 40px rgba(67, 233, 123, 0.25);
        }

        .btn-success:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(67, 233, 123, 0.35);
        }

        .btn-danger {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: #fff;
          margin-top: 12px;
          opacity: 0.6;
          box-shadow: none;
        }

        .btn-danger:hover {
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(245, 87, 108, 0.3);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .alert {
          padding: 14px 20px;
          border-radius: 16px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
          animation: alertPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes alertPop {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .alert-success {
          background: rgba(67, 233, 123, 0.12);
          border: 1px solid rgba(67, 233, 123, 0.25);
          color: #43e97b;
        }

        .alert-error {
          background: rgba(245, 87, 108, 0.12);
          border: 1px solid rgba(245, 87, 108, 0.25);
          color: #f5576c;
        }

        .current-link-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 18px 20px;
          margin: 20px 0 25px;
          position: relative;
          transition: all 0.3s ease;
        }

        .current-link-box:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .current-link-box .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 8px;
          font-weight: 600;
        }

        .current-link-box .link {
          color: rgba(255, 255, 255, 0.75);
          font-size: 14px;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
        }

        .current-link-box .copy-btn {
          position: absolute;
          right: 14px;
          top: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.3);
          padding: 6px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .current-link-box .copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.15);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin: 28px 0;
        }

        .footer-text {
          text-align: center;
          color: rgba(255, 255, 255, 0.1);
          font-size: 12px;
          margin-top: 22px;
          letter-spacing: 1px;
        }

        .footer-text span {
          color: rgba(255, 255, 255, 0.15);
        }

        /* Loading spinner for button */
        .spinner-small {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          vertical-align: middle;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .admin-container {
            padding: 30px 25px;
            margin: 10px;
            border-radius: 30px;
          }
          .admin-header h1 {
            font-size: 24px;
          }
          .admin-header .icon {
            font-size: 40px;
          }
          .form-group input {
            padding: 13px 16px;
            font-size: 15px;
          }
          .btn {
            padding: 14px;
            font-size: 14px;
          }
        }

        @media (max-width: 400px) {
          .admin-container {
            padding: 22px 18px;
          }
          .admin-header h1 {
            font-size: 20px;
          }
          .current-link-box .link {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="admin-container">
        <div className="admin-header">
          <span className="icon">⚡</span>
          <h1>Admin Panel</h1>
          <p>Dhibiti mipangilio ya loading page</p>
        </div>

        {!isLoggedIn ? (
          // ===== LOGIN FORM =====
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>🔐 PIN ya Ulinzi</label>
              <input
                type="password"
                placeholder="Weka PIN yako..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                autoFocus
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-small"></span>
                  Inaingiza...
                </>
              ) : (
                '🔑 Ingia kwenye Panel'
              )}
            </button>
            
            {error && (
              <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>
            )}
          </form>
        ) : (
          // ===== ADMIN DASHBOARD =====
          <>
            <div className="current-link-box">
              <div className="label">🔗 Link ya Sasa</div>
              <div className="link" id="currentLink">
                {currentLink || 'Loading...'}
              </div>
              <button 
                className="copy-btn" 
                onClick={copyToClipboard}
              >
                📋 Copy
              </button>
            </div>

            <form onSubmit={handleUpdateLink}>
              <div className="form-group">
                <label>✏️ Badilisha Link Mpya</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Inabadilisha...
                  </>
                ) : (
                  '🔄 Badilisha Link'
                )}
              </button>
              
              {message && (
                <div className="alert alert-success" style={{ marginTop: '16px' }}>{message}</div>
              )}
              {error && (
                <div className="alert alert-error" style={{ marginTop: '16px' }}>{error}</div>
              )}
            </form>

            <div className="divider"></div>

            <button 
              onClick={handleLogout} 
              className="btn btn-danger"
              disabled={isLoading}
            >
              🚪 Toka (Logout)
            </button>

            <div className="footer-text">
              🔒 Umeingia kwa <span>PIN</span> iliyolindwa
            </div>
          </>
        )}
      </div>
    </>
  );
}