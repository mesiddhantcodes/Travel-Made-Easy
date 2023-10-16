const AuthenticationMiddleware = require('../middleware/Authentication.middleware');
const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/emailVerification');
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
                data: user,
                message: "Logged in successfully",
                token: token
            });


        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    registerUser: async (req, res) => {
        try {
            const { collegeId, password, name, branch, year, email, phone, address } = req.body;
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
                phone,
                address
            });
            let datasaved = await user.save();
            if (datasaved) {
                const token = AuthenticationMiddleware.generateToken({ email: email });
                const isMailSent = await sendEmail(email, token);
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


}

module.exports = AuthController;


