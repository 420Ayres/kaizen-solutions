const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, contact, urgency, address } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'miquel705@gmail.com', // Replace with your email
            pass: 'miquelsexy'  // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your email
        to: 'miquel705@gmail.com',   // Replace with the recipient email
        subject: 'Call Out Request',
        text: `Name: ${name}\nContact: ${contact}\nUrgency: ${urgency}\nAddress: ${address}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
