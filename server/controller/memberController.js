const Member = require("./../model/memberModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        if(!req.body.username || !req.body.password || !req.body.passwordConfirm) {
            throw "username password and password confirm is not allow to be empty";
        }

        const existMember = await Member.findOne({ username: req.body.username }) 
        if(existMember) throw "this username is already use";

        if(req.body.password !== req.body.passwordConfirm) {
            throw "password and password confirm should be match";
        }

        const newMember = await Member.create({
            username: req.body.username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });
        
        const token = jwt.sign({ _id: newMember._id }, process.env.SECRET_JWT);

        res.status(200).json({
            status: "success",
            msg: "register member successfully",
            data: newMember,
            token
        });

    } catch (err) {
        console.log(err);
        
        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}

exports.login = async (req, res) => {
    // await Member.create({
    //     username: "tester",
    //     password: "123123",
    //     passwordConfirm: "123123"
    // })
    
    try {
        if(!req.body.username || !req.body.password) {
            throw "please enter username and password";
        }

        const existMember = await Member.findOne({ username: req.body.username });
        if(!existMember) throw "username or password is not correct";
        
        const isPasswordCorrect = await existMember.isPasswordCorrect(req.body.password, existMember.password)
        if(!isPasswordCorrect) throw "username or password is not correct";

        const token = await jwt.sign({ _id: existMember._id }, process.env.SECRET_JWT);

        res.status(200).json({
            status: "success",
            msg: "login successfully",
            data: existMember,
            token
        })        

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}