<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $previous_school = $_POST['previous_school'];
    $grade_level = $_POST['grade_level'];
    $desired_major = $_POST['desired_major'];
    $activities = $_POST['activities'];
    $reference1 = $_POST['reference1'];
    $reference2 = $_POST['reference2'];

    // File handling
    $transcripts = $_FILES['transcripts']['name'];
    $passports = $_FILES['passports']['name'];
    $certificates = $_FILES['certificates']['name'];
    $transcripts_tmp = $_FILES['transcripts']['tmp_name'];
    $passports_tmp = $_FILES['passports']['tmp_name'];
    $certificates_tmp = $_FILES['certificates']['tmp_name'];

    // Email details
    $to = "admission@alliancehealthcollege.edu";
    $subject = "New Application Submission";
    $message = "Full Name: $fullname\nEmail: $email\nPhone: $phone\nAddress: $address\nPrevious School: $previous_school\nGrade Level: $grade_level\nDesired Major: $desired_major\nGPA: $gpa\nActivities: $activities\nReference 1: $reference1\nReference 2: $reference2";

    // File paths
    $transcripts_path = "uploads/" . $transcripts;
    $passports_path = "uploads/" . $passports;
    $certificates_path = "uploads/" . $certificates;

    // Upload files 
    move_uploaded_file($transcripts_tmp, $transcripts_path);
    move_uploaded_file($passports_tmp, $passports_path);
    move_uploaded_file($certificates_tmp, $certificates_path);

    // Send email
    $headers = "From: admission@alliancehealthcollege.edu"; 
    if (mail($to, $subject, $message, $headers)) {
        echo "Application submitted successfully!";
    } else {
        echo "Failed to submit the application. Please try again.";
    }
}
?>
