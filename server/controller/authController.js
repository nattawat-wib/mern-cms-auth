const Member = require("./../model/memberModel");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("token", token);
        if(!token) throw "You are not login yet, Please Login.";
        
        const isTokenValid = await jwt.verify(token, process.env.SECRET_JWT);
        // console.log("isTokenValid", isTokenValid);
        if(!isTokenValid) throw "This Token is not valid please login again."
        
        const member = await Member.findOne({ username: "tester" }); 
        // console.log("member", member);
        if(!member) throw "This user is not exist in database.";
        
        req.member = member
        next()

    } catch(err) {
        console.log('err', err);
        
        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}

exports.logout = async (req, res, next) => {
    const logoutMember = await Member.findById(req.member._id);
    logoutMember.token = undefined;
    logoutMember.save({ validateBeforeSave: false })

    res.clearCookie("token");
    delete req.member;

    res.status(200).json({
        status: "success",
        msg: "Logout Successfully"
    })
}