const Member = require("./../model/memberModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    // console.log(jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…wMDN9.XvrP1nDBnQv7c1xhj8f8ZgKispTyxwvDOACs4laVx6U'));
    // console.log(req);
    console.log(req.cookies);
    console.log(req.header);
    

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