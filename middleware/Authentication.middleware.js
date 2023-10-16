const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kanishtajileaderpriyanshuuiuxtanishqacodermesiddhantcodes';
const AuthenticationMiddleware = {
    authenticate: (req, res, next) => {
        try {
            let token = req.headers.authorization.split(" ")[1];
            let decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).send("Unauthorized");
        }
    },
    generateToken: (user) => {
        let token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            collegeId: user.collegeId,
            branch: user.branch,
        },
            JWT_SECRET,
            { expiresIn: '6h' }
        );
        return token;
    },
    verifyEmailToken: (token) => {
        try {
            let decodedToken = decodeURIComponent(token);
            let decoded = jwt.verify(decodedToken, JWT_SECRET);
            return decoded;
        } 
        catch (error) {
            return false;
        }
    }



}

module.exports = AuthenticationMiddleware;