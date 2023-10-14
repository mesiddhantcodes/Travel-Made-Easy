const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
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
            res.send(user)
            return res.status(200).json({ message: "Logged in successfully" });

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
            await user.save();
        
            return res.status(200).json({ message: "User registered successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },


}

module.exports = AuthController;


