const Article = require("./../model/articleModel");
const multer = require("multer");
const memberModel = require("../model/memberModel");
// const upload = multer(
//     { dest: "./../upload" }, 
//     { filename: (req, file, cb) => {
//         console.log("req", req);
//         console.log("file", file);
//         console.log("cb", cb);
//     } }
//     );

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1])
    }
})

const upload = multer({ storage: storage })

exports.uploadArticleImage = upload.fields([{ name: "banner" }, { name: "thumbnail" }])

exports.gerAllArticle = async (req, res) => {
    try {
        const allArticle = await Article.find();

        res.status(200).json({
            status: "success",
            msg: "",
            data: allArticle
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            msg: err,
        })
    }
}

exports.getArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ url: req.params.articleUrl });

        res.status(200).json({
            status: "success",
            msg: "",
            data: article
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}

exports.addArticle = async (req, res) => {
    try {
        let errorString = "";
        ["title", "desc", "category", "url"].map(key => {
            if (!req.body[key]) errorString += ` ${key}`
        });

        ["thumbnail", "banner"].map(key => {
            if (!req.files[key]) errorString += ` ${key}`
        });

        if (errorString) throw `${errorString} is not allow to be empty`;

        if (req.body.url.includes(" ")) throw "url should not contain space or /";

        const existUrl = await Article.findOne({ url: req.body.url });
        if (existUrl) throw "this url is already taken";

        const newArticle = await Article.create({
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            url: req.body.url,
            thumbnail: req.files.thumbnail[0].filename,
            banner: req.files.banner[0].filename
        });

        res.status(200).json({
            status: "success",
            msg: "add new article successfully",
            data: newArticle
        });

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}

exports.deleteArticle = async (req, res) => {
    try {
        await Article.findOneAndDelete({ url: req.params.url});

        res.status(200).json({
            status: "success",
            msg: "delete article successfully"
        })

    } catch (err) {
        console.log(err);

        res.status(404).json({
            status: "error",
            msg: "article not found"
        })
    }
}