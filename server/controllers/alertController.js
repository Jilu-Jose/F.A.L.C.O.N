import nodemailer from 'nodemailer';

export const sendFraudAlert = async (req, res) => {
    try {
        const { email, transactionDetails } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'User email is required' });
        }

        // Use Ethereal for testing or use real credentials from .env
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        let transporter;

        if (user && pass) {
            transporter = nodemailer.createTransport({
                service: 'gmail', // or configured service
                auth: { user, pass }
            });
        } else {
            // Fallback to mock logging if no credentials are provided
            console.log('\n--- EMAIL ALERT PREVIEW ---');
            console.log(`To: ${email}`);
            console.log(`Subject: FALCON Alert: Fraudulent Transaction Detected`);
            console.log(`Body: High risk transaction detected. Details: ${JSON.stringify(transactionDetails)}`);
            console.log('--- END EMAIL ALERT ---\n');
            console.log('Notice: Provide EMAIL_USER and EMAIL_PASS in .env to send real emails.');

            return res.status(200).json({
                success: true,
                message: 'Alert sent successfully (Mocked in console log - provide .env credentials for real email)'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'alerts@falcon-ai.com',
            to: email,
            subject: 'FALCON Alert: Fraudulent Transaction Detected',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
                    <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 30px; border-top: 4px solid #ea580c; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <h2 style="color: #ea580c; margin-top: 0;">🚨 Fraud Alert Detected</h2>
                        <p>Hello,</p>
                        <p>We have detected a high-risk transaction on your account that our AI models have flagged as potentially fraudulent.</p>
                        
                        <div style="background-color: #fff5f5; border: 1px solid #fed7d7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #c53030; font-size: 16px;">Transaction Telemetry Summary</h3>
                            <ul style="color: #c53030; font-size: 14px; padding-left: 20px;">
                                <li><strong>Risk Score:</strong> ${transactionDetails.riskScore}%</li>
                                <li><strong>Distance from Home:</strong> ${transactionDetails.inputs.distance_from_home} miles</li>
                                <li><strong>Ratio to Median Price:</strong> ${transactionDetails.inputs.ratio_to_median_purchase_price}x</li>
                                <li><strong>Online Order:</strong> ${transactionDetails.inputs.online_order ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                        
                        <p style="font-size: 14px;">If this wasn't you, please secure your account immediately or contact our support team.</p>
                        <p style="font-size: 12px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                            This is an automated message from the FALCON Intelligent Fraud Prevention system. Please do not reply directly to this email.
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Alert email sent:', info.response);

        res.status(200).json({ success: true, message: 'Alert email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send alert email.' });
    }
};
