<?php
// Database configuration
$host = 'localhost';
$dbname = 'loading_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Create settings table if not exists
$pdo->exec("CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_name VARCHAR(50) UNIQUE,
    link_value TEXT
)");

// Insert default link if not exists
$stmt = $pdo->prepare("INSERT IGNORE INTO settings (setting_name, link_value) 
                        VALUES ('target_link', 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/')");
$stmt->execute();
?>