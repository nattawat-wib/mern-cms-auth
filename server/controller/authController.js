const Member = require("./../model/memberModel");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) throw "You are not login yet, Please Login.";
        
        jwt.verify(token, process.env.SECRET_JWT, err => {
            if(err) throw "Your token already expired. Please login again"
        });
        
        const member = await Member.findOne({ token }); 
        if(!member) throw "User with this token is not exist in database.";

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
    await logoutMember.save({ validateBeforeSave: false })

    res.clearCookie("token");
    delete req.member;

    res.status(200).json({
        status: "success",
        msg: "Logout Successfully"
    })
}