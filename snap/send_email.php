<?php
header("Access-Control-Allow-Origin: http://localhost:8100");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
session_start();

// Get data from the request
$subject = isset($_GET['subject']) ? $_GET['subject'] : '';
$recipient = isset($_GET['recipient']) ? $_GET['recipient'] : '';
$body = isset($_GET['body']) ? $_GET['body'] : '';
$urlArrays = isset($_GET['urlArrays']) ? explode(',', $_GET['urlArrays']) : [];

// Check if required fields are present
if (empty($subject) || empty($recipient) || empty($body)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
} // Convert the comma-separated string back to an array

/*##########Script Information#########
  # Purpose: Send mail Using PHPMailer#
  #          & Gmail SMTP Server      #
  # Created: 24-11-2019               #
  #   Author : Hafiz Haider           #
  # Version: 1.0                      #
  # Website: www.BroExperts.com       #
  #####################################*/

// Include required PHPMailer files
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Define namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Create an instance of PHPMailer
$mail = new PHPMailer();

// Set the mailer to use SMTP
$mail->isSMTP();

// Define the SMTP host
$mail->Host = "smtp.gmail.com";

// Enable SMTP authentication
$mail->SMTPAuth = true;

// Set the SMTP encryption type (ssl/tls)
$mail->SMTPSecure = "tls";

// Set the port to connect SMTP
$mail->Port = "587";

// Set the Gmail username
$mail->Username = "snapfix02@gmail.com";

// Set the Gmail password
$mail->Password = "mwqkhvqlbsqwnbmb";

// Set the email subject
$mail->Subject = $subject;

// Set the sender email
$mail->setFrom('mutcoopdepartment@gmail.com');

// Enable HTML
$mail->isHTML(true);

// Set the email body
$mail->Body = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 10px 0;
                text-align: center;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .content {
                padding: 20px;
                text-align: left;
                line-height: 1.6;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #888;
            }
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333;
            }
            p {
                font-size: 14px;
                color: #555;
            }
            a {
                color: #4CAF50;
                text-decoration: none;
            }
            .colored-letters span {
                font-weight: bold;
            }
            .colored-letters span:nth-child(1) { color: #e74c3c; } /* I - red */
            .colored-letters span:nth-child(2) { color: #3498db; } /* n - blue */
            .colored-letters span:nth-child(3) { color: #f1c40f; } /* n - yellow */
            .colored-letters span:nth-child(4) { color: #2ecc71; } /* o - green */
            .colored-letters span:nth-child(5) { color: #9b59b6; } /* v - purple */
            .colored-letters span:nth-child(6) { color: #e67e22; } /* a - orange */
            .colored-letters span:nth-child(7) { color: #e74c3c; } /* t - red */
            .colored-letters span:nth-child(8) { color: #3498db; } /* i - blue */
            .colored-letters span:nth-child(9) { color: #f1c40f; } /* o - yellow */
            .colored-letters span:nth-child(10) { color: #2ecc71; } /* n - green */
            .colored-letters span:nth-child(11) { color: #9b59b6; } /* L - purple */
            .colored-letters span:nth-child(12) { color: #e67e22; } /* a - orange */
            .colored-letters span:nth-child(13) { color: #e74c3c; } /* b - red */
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>$subject</h1>
            </div>
            <div class='content'>
                <p>$body</p>
            </div>
            <div class='footer'>
                <p>Thank you for using our service.</p>
                <p><a href='#'>Visit our website</a></p>
                <p class='colored-letters'>
                    <span>I</span><span>n</span><span>n</span><span>o</span><span>v</span><span>a</span><span>t</span><span>i</span><span>o</span><span>n</span> <span>L</span><span>a</span><span>b</span>
                </p>
            </div>
        </div>
    </body>
    </html>
";

// Add the recipient
$mail->addAddress("vgwala149@gmail.com");

// Download and attach the files
// foreach ($urlArrays as $url) {
  
//         $fileContent = @file_get_contents($url); // Retrieve the file contents
//         $fileName = basename($url);
//         $mail->addStringAttachment($fileContent, $fileName);
   
// }

foreach ($urlArrays as $index => $imageUrl) {
  $imageFileName = "image{$index}.jpeg";            // Create a unique filename for each image
  $mail->addStringAttachment(file_get_contents($imageUrl), $imageFileName);
}


// Finally, send the email
if ($mail->send()) {
  header('Content-Type: application/json');
  echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
} else {
  header('Content-Type: application/json');
  echo json_encode(['status' => 'error', 'message' => 'Email could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}

// Closing SMTP connection
$mail->smtpClose();


?>
