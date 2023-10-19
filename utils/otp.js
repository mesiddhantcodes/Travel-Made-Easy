const generateOtp = () => {
    const digit = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digit[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const sendOtp = async (email) => {
    

}


module.exports = { generateOtp };