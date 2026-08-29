<?php
session_start();
require_once 'config.php';

$CORRECT_PIN = 'silaoo22';

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pin'])) {
    if ($_POST['pin'] === $CORRECT_PIN) {
        $_SESSION['admin_logged'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $error = "❌ PIN si sahihi! Jaribu tena.";
    }
}

// Update link
if (isset($_SESSION['admin_logged']) && $_SESSION['admin_logged'] === true) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['new_link'])) {
        $newLink = filter_var($_POST['new_link'], FILTER_SANITIZE_URL);
        if (filter_var($newLink, FILTER_VALIDATE_URL)) {
            $stmt = $pdo->prepare("UPDATE settings SET link_value = ? WHERE setting_name = 'target_link'");
            $stmt->execute([$newLink]);
            $success = "✅ Link imebadilishwa kikamilifu!";
        } else {
            $error = "❌ Tafadhali weka link sahihi (inaanzia http:// au https://)";
        }
    }
    
    $stmt = $pdo->query("SELECT link_value FROM settings WHERE setting_name = 'target_link'");
    $row = $stmt->fetch();
    $currentLink = $row ? $row['link_value'] : '';
}
?>
<!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Premium</title>
    <style>
        /* ===== PREMIUM ADMIN STYLES ===== */
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
        }

        .admin-container {
            background: rgba(22, 22, 35, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 45px 50px;
            border-radius: 30px;
            width: 100%;
            max-width: 520px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 
                0 30px 80px rgba(0, 0, 0, 0.8),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .admin-header {
            text-align: center;
            margin-bottom: 35px;
        }

        .admin-header .icon {
            font-size: 48px;
            margin-bottom: 10px;
            display: block;
        }

        .admin-header h1 {
            font-size: 28px;
            font-weight: 700;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #667eea 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }

        .admin-header p {
            color: rgba(255, 255, 255, 0.4);
            font-size: 14px;
            margin-top: 5px;
            letter-spacing: 1px;
        }

        .form-group {
            margin-bottom: 22px;
        }

        .form-group label {
            display: block;
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
        }

        .form-group input {
            width: 100%;
            padding: 14px 18px;
            background: rgba(255, 255, 255, 0.04);
            border: 2px solid rgba(255, 255, 255, 0.06);
            border-radius: 14px;
            color: #fff;
            font-size: 16px;
            transition: all 0.3s ease;
            outline: none;
        }

        .form-group input:focus {
            border-color: #f093fb;
            background: rgba(255, 255, 255, 0.07);
            box-shadow: 0 0 30px rgba(240, 147, 251, 0.1);
        }

        .form-group input::placeholder {
            color: rgba(255, 255, 255, 0.2);
        }

        .btn {
            width: 100%;
            padding: 16px;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: #fff;
            box-shadow: 0 10px 30px rgba(245, 87, 108, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(245, 87, 108, 0.4);
        }

        .btn-primary:active {
            transform: translateY(0);
        }

        .btn-success {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: #0a0a0a;
            box-shadow: 0 10px 30px rgba(67, 233, 123, 0.3);
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(67, 233, 123, 0.4);
        }

        .btn-danger {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: #fff;
            margin-top: 10px;
            opacity: 0.7;
            box-shadow: none;
        }

        .btn-danger:hover {
            opacity: 1;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(245, 87, 108, 0.3);
        }

        .alert {
            padding: 14px 18px;
            border-radius: 14px;
            margin-bottom: 20px;
            font-size: 14px;
            font-weight: 500;
            animation: alertPop 0.4s ease-out;
        }

        @keyframes alertPop {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .alert-success {
            background: rgba(67, 233, 123, 0.15);
            border: 1px solid rgba(67, 233, 123, 0.3);
            color: #43e97b;
        }

        .alert-error {
            background: rgba(245, 87, 108, 0.15);
            border: 1px solid rgba(245, 87, 108, 0.3);
            color: #f5576c;
        }

        .current-link-box {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 14px;
            padding: 16px 20px;
            margin: 20px 0 25px;
            position: relative;
        }

        .current-link-box .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: rgba(255, 255, 255, 0.3);
            margin-bottom: 6px;
        }

        .current-link-box .link {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            word-break: break-all;
            font-family: 'Courier New', monospace;
        }

        .current-link-box .copy-btn {
            position: absolute;
            right: 12px;
            top: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: none;
            color: rgba(255, 255, 255, 0.3);
            padding: 6px 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.3s ease;
        }

        .current-link-box .copy-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
            margin: 25px 0;
        }

        .footer-text {
            text-align: center;
            color: rgba(255, 255, 255, 0.15);
            font-size: 12px;
            margin-top: 20px;
            letter-spacing: 0.5px;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .admin-container {
                padding: 30px 25px;
                margin: 10px;
            }
            .admin-header h1 {
                font-size: 22px;
            }
            .form-group input {
                padding: 12px 15px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <span class="icon">⚡</span>
            <h1>Admin Panel</h1>
            <p>Dhibiti mipangilio ya loading page</p>
        </div>

        <?php if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true): ?>
            <!-- ===== LOGIN FORM ===== -->
            <form method="POST">
                <div class="form-group">
                    <label>🔐 PIN ya Ulinzi</label>
                    <input type="password" name="pin" placeholder="Weka PIN yako..." required autofocus>
                </div>
                <button type="submit" class="btn btn-primary">Ingia kwenye Panel</button>
                
                <?php if (isset($error)): ?>
                    <div class="alert alert-error" style="margin-top:15px;"><?php echo $error; ?></div>
                <?php endif; ?>
            </form>

        <?php else: ?>
            <!-- ===== ADMIN DASHBOARD ===== -->
            <div class="current-link-box">
                <div class="label">🔗 Link ya Sasa</div>
                <div class="link" id="currentLink"><?php echo htmlspecialchars($currentLink); ?></div>
                <button class="copy-btn" onclick="copyLink()">📋 Copy</button>
            </div>

            <form method="POST">
                <div class="form-group">
                    <label>✏️ Badilisha Link Mpya</label>
                    <input type="text" name="new_link" placeholder="https://example.com" required>
                </div>
                <button type="submit" class="btn btn-success">🔄 Badilisha Link</button>
                
                <?php if (isset($success)): ?>
                    <div class="alert alert-success" style="margin-top:15px;"><?php echo $success; ?></div>
                <?php endif; ?>
                <?php if (isset($error)): ?>
                    <div class="alert alert-error" style="margin-top:15px;"><?php echo $error; ?></div>
                <?php endif; ?>
            </form>

            <div class="divider"></div>

            <a href="?logout=1" style="text-decoration:none;">
                <button class="btn btn-danger">🚪 Toka (Logout)</button>
            </a>

            <div class="footer-text">
                🔒 Umeingia kwa PIN iliyolindwa
            </div>
        <?php endif; ?>
    </div>

    <script>
        // Copy link function
        function copyLink() {
            const link = document.getElementById('currentLink');
            const text = link.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('.copy-btn');
                const originalText = btn.textContent;
                btn.textContent = '✅ Copied!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }).catch(() => {
                // Fallback
                const range = document.createRange();
                range.selectNode(link);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                alert('Link imenakiliwa!');
            });
        }

        // Auto-focus on input if not logged in
        <?php if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true): ?>
        document.querySelector('input[name="pin"]')?.focus();
        <?php endif; ?>
    </script>
</body>
</html>