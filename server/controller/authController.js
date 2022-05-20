const Member = require("./../model/memberModel");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
    try {
        console.log(req.cookies);
        
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
    const logoutMember = await Member.findOne({ token: req.cookies.token });

    logoutMember.token = undefined;
    
    await logoutMember.save({ validateBeforeSave: false })

    res.clearCookie("token");
    delete req.member;

    res.status(200).json({
        status: "success",
        msg: "Logout Successfully"
    })
}

exports.changePassword = async (req, res) => {    
    try {
        const { oldPassword, newPassword, newPasswordConfirm } = req.body;
        if(!oldPassword || !newPassword || !newPasswordConfirm) throw "Please enter all input";

        const updateMember = await Member.findById(req.member._id);
        
        if(!await updateMember.isPasswordCorrect(req.body.oldPassword, updateMember.password)) {
            throw "Old password is not correct";
        }

        if(newPassword !== newPasswordConfirm) throw "Password and password confirm must be match";
        if(oldPassword === newPassword) throw "Old password and new password cannot be the same";

        updateMember.password = newPassword;
        await updateMember.save({ validateBeforeSave: false });

        res
        .clearCookie("token")
        .status(200)
        .json({
            status: "success",
            data: updateMember,
            msg: "Update password successfully, please login again"
        })

    } catch (err) {
        console.log("err", err)

        res.status(400).json({
            status: "success",
            msg: err
        })
    }
}

exports.verifyToken = async (req, res) => {
    const { token }  = req.cookies;

    if(!token) return res.status(401).json({ status: "error", data: null })
    const loginMember = await Member.findOne({ token }).select(["-password", "-__v"]);

    if(loginMember) return res.status(200).json({ status: "success", data: loginMember })
}