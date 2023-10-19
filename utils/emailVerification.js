const nodemailer = require('nodemailer');

const sendEmail = async (email, token, name) => {
    const subject = "Email Verification";
    const encodedToken = encodeURIComponent(token);

    const verificationLink = `http://localhost:3000/auth/verify/${encodedToken}`;
    const textSend = `
        Dear ${name},

        Thank you for signing up for our service. To complete your registration, please click the following link to verify your email:
        Verify your email: ${verificationLink}

        If you did not sign up for this service, please ignore this email.

        Best regards,
        ROVE-Travel Made Easy   
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