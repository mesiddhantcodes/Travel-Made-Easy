const AuthenticationMiddleware = require('../middleware/Authentication.middleware');
const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/emailVerification');

const nodemailer = require('nodemailer');
const { generateOtp } = require('../utils/otp');
require("dotenv").config();
// const 


const AuthController =
{
    loginUser: async (req, res) => {
        const { loginId, password } = req.body;
        try {
            const user = await userModel.findOne({
                $or: [
                    { email: loginId },
                    { collegeId: loginId },
                ]
            });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }
            const token = AuthenticationMiddleware.generateToken(user);

            return res.status(200).json({
                status: "success",
                data: {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    collegeId: user.collegeId,
                },
                message: "Logged in successfully",
                token: token
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    registerUser: async (req, res) => {
        try {
            const { collegeId, password, name, branch, year, email, phoneNumber, address } = req.body;
            const checkIfUserExists = await userModel.findOne({ collegeId });
            if (checkIfUserExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({
                collegeId,
                password: hashedPassword,
                name,
                branch,
                year,
                email,
                phoneNumber,
                address
            });
            let datasaved = await user.save();
            if (datasaved) {
                const token = AuthenticationMiddleware.generateToken({ email: email });
                const isMailSent = await sendEmail(email, token, name);
                if (!isMailSent) {
                    return res.send("Email is not sent");
                }
                return res.send("User registered successfully please verify your email");
            }
            else {
                return res.send(
                    "Somthing went wrong user is not registered due to error"
                );
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    verifyEmail: async (req, res) => {
        try {
            const { token } = req.params;
            const decodedToken = await AuthenticationMiddleware.verifyEmailToken(token);
            if (decodedToken) {
                let ifUserFounded = await userModel.findOne({
                    email: decodedToken.email,
                });
                if (ifUserFounded) {
                    ifUserFounded.isEmailVerified = true;
                    let isUserSaved = await ifUserFounded.save();
                    if (isUserSaved) {
                        return res.status(200).send("Email verified successfully");
                    } else {
                        return res.status(500).send("Something went wrong");
                    }
                } else {
                    return res.status(400).send("User not found");
                }
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    sendOtp: async (req, res) => {
        const { email } = req.body;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const otp = generateOtp();
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for password reset",
            text: `Your OTP is ${otp}`,
        };
        try {

            const ifuserExists = await userModel.findOne({ email: email });
            if (!ifuserExists) {
                return res.status(400).json({ message: "User not found" });
            }
            const result = await transporter.sendMail(mailOptions);
            const isOtpsaved = await userModel.updateOne({ otp: otp });
            if (!isOtpsaved) {
                return res.status(400).json({ message: "OTP not saved" });
            }


            console.log(result);
            return res.status(200).json({ message: "OTP sent successfully" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },
    resetPassword: async (req, res) => {
        const { email, newPassword, otp } = req.body;
        try {
            const user = await userModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            if (user.otp !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.otp = null;
            await user.save();

            return res.status(200).json({ message: "Password updated successfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    },

}

module.exports = AuthController;


