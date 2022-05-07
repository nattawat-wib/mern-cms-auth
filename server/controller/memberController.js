const Member = require("./../model/memberModel");

exports.register = async (req, res) => {
    try {
        const newMember = await Member.create({
            username: "test",
            password: "1234",
            passwordConfirm: "1234",
        })
    
        console.log(newMember);
    } catch(err) {
        console.log("ERROR !!!");
        console.log(err);
    }

    // res.json({newMember})
}