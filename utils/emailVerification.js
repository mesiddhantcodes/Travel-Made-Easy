const nodemailer = require('nodemailer');

const sendEmail = async (email, token) => {
    const subject = "Email Verification";
    const encodedToken = encodeURIComponent(token);

    const verificationLink = `http://localhost:3000/auth/verify/${encodedToken}`;
    const textSend = `
    <p>Dear User,</p>
    <p>Thank you for signing up for our service. To complete your registration, please click the following link to verify your email:</p>
    <p><a href="${verificationLink}">Verify your email</a></p>
    <p>If you did not sign up for this service, please ignore this email.</p>
    <p style="margin-top: 10px;">Best regards,</p>
    <p style="margin-top: 10px;">ROVE-Travel Made Easy</p>
`;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "siddhuyadav662@gmail.com",
                pass: "yfaz cdcx dmqw domc",
            },
        });

        const mailOptions = {
            from: "ROVE-Travel Made Easy",
            to: email,
            subject: subject,
            text: textSend,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = { sendEmail, };