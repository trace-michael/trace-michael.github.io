<?php

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input data
    $amount = isset($_POST['amount']) ? floatval($_POST['amount']) : 0;
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

    // Validate donation amount
    if ($amount <= 0) {
        die('Invalid donation amount. Please enter a valid amount.');
    }

    // Log the donation details (You can save this to a database or file)
    $logMessage = "Donation Details:\n";
    $logMessage .= "Amount: $amount\n";
    $logMessage .= "Name: $name\n";
    $logMessage .= "Email: $email\n";
    $logMessage .= "Message: $message\n";
    $logMessage .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";

    // Save to a log file (You can save this to a database instead)
    if (!file_put_contents('donation_logs.txt', $logMessage, FILE_APPEND)) {
        die('Failed to log donation details. Please try again.');
    }

    // Redirect back to the donation page with a success message
    header('Location: donation_page.html?status=success');
    exit;
} else {
    // If the form is not submitted, redirect to the donation page
    header('Location: donation_page.html?status=error');
    exit;
}

?>
