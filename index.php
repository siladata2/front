<?php
require_once 'config.php';
$stmt = $pdo->query("SELECT link_value FROM settings WHERE setting_name = 'target_link'");
$row = $stmt->fetch();
$targetLink = $row ? $row['link_value'] : 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/';
?>
<!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <style>
        /* ===== PREMIUM STYLES ===== */
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
        }

        /* Background animated gradient */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #f5576c 100%);
            background-size: 400% 400%;
            animation: gradientBG 8s ease infinite;
            z-index: 0;
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Floating particles */
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
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: floatParticle 15s infinite linear;
        }

        @keyframes floatParticle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
        }

        .loader-container {
            position: relative;
            z-index: 2;
            text-align: center;
            padding: 50px 60px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 30px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
                0 25px 80px rgba(0, 0, 0, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            animation: containerFade 0.8s ease-out;
            max-width: 500px;
            width: 90%;
        }

        @keyframes containerFade {
            from { opacity: 0; transform: scale(0.9) translateY(30px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Premium spinner */
        .spinner-wrapper {
            position: relative;
            width: 100px;
            height: 100px;
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
            animation: spinRing 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .spinner-ring:nth-child(1) {
            border-top-color: #f093fb;
            animation-delay: 0s;
        }

        .spinner-ring:nth-child(2) {
            border-right-color: #f5576c;
            animation-delay: 0.3s;
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
        }

        .spinner-ring:nth-child(3) {
            border-bottom-color: #667eea;
            animation-delay: 0.6s;
            width: 60%;
            height: 60%;
            top: 20%;
            left: 20%;
        }

        @keyframes spinRing {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            100% { transform: rotate(360deg) scale(1); }
        }

        /* Center icon */
        .spinner-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 32px;
            animation: pulseIcon 1.5s ease-in-out infinite;
            z-index: 2;
        }

        @keyframes pulseIcon {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        h2 {
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        .subtitle {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 30px;
            font-weight: 300;
            letter-spacing: 1px;
        }

        /* Progress bar premium */
        .progress-container {
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #f093fb, #f5576c, #667eea, #764ba2);
            background-size: 300% 100%;
            border-radius: 10px;
            animation: progressGradient 2s linear infinite;
            transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }

        .progress-bar::after {
            content: '';
            position: absolute;
            right: 0;
            top: -2px;
            width: 12px;
            height: 10px;
            background: #fff;
            border-radius: 50%;
            filter: blur(4px);
            opacity: 0.6;
        }

        @keyframes progressGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
        }

        .progress-text {
            margin-top: 12px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: 300;
            letter-spacing: 2px;
        }

        .progress-text span {
            color: #fff;
            font-weight: 600;
        }

        /* Status dots */
        .status-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            animation: dotPulse 1.4s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
            40% { transform: scale(1); opacity: 1; background: #f093fb; }
        }

        /* Responsive */
        @media (max-width: 600px) {
            .loader-container {
                padding: 35px 25px;
                margin: 20px;
            }
            .spinner-wrapper {
                width: 70px;
                height: 70px;
            }
            h2 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <!-- Floating particles -->
    <div class="particles" id="particles"></div>

    <div class="loader-container">
        <div class="spinner-wrapper">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-icon">🚀</div>
        </div>

        <h2>Inapakia...</h2>
        <p class="subtitle">Tunaandaa mazingira bora kwako</p>

        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="progress-text">
            <span id="progressPercent">0</span>% imekamilika
        </div>

        <div class="status-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>

    <script>
        // ===== GENERATE PARTICLES =====
        (function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (12 + Math.random() * 18) + 's';
                particle.style.animationDelay = (Math.random() * 15) + 's';
                particle.style.width = (3 + Math.random() * 8) + 'px';
                particle.style.height = particle.style.width;
                particle.style.opacity = 0.1 + Math.random() * 0.3;
                container.appendChild(particle);
            }
        })();

        // ===== PROGRESS BAR =====
        let progress = 0;
        const progressBar = document.getElementById('progressBar');
        const progressPercent = document.getElementById('progressPercent');
        const duration = 8000; // 8 seconds
        const interval = 50; // update every 50ms

        const timer = setInterval(() => {
            progress += (interval / duration) * 100;
            if (progress >= 100) {
                progress = 100;
                clearInterval(timer);
                // Redirect after 8 seconds
                window.location.href = "<?php echo $targetLink; ?>";
            }
            progressBar.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress);
        }, interval);

        // ===== FALLBACK: Ensure redirect even if something fails =====
        setTimeout(() => {
            window.location.href = "<?php echo $targetLink; ?>";
        }, 8500);
    </script>
</body>
</html>