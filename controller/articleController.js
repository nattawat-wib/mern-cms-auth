const Article = require("./../model/articleModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/build/images/upload")
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
        
        const query = {};
        if (req.query.category) query.category = req.query.category
        if (req.query.search) query.title = { $regex: req.query.search }
        
        const allArticle = await Article.find(query).populate("createdBy");
        
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
        const article = await Article.findOne({ url: req.params.articleUrl }).populate("createdBy");

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
        if(!req.body || !Object.keys(req.body).length) throw "Please enter all input fields"

        let errorString = "";
        ["title", "desc", "category", "url"].map(key => {
            if (!req.body[key]) errorString += ` ${key}`
        });

        ["thumbnail", "banner"].map(key => {
            if (!req.files[key]) errorString += ` ${key}`
        });

        if (errorString) throw `${errorString} is not allow to be empty`;

        if (/[ /]/.test(req.body.url)) throw "url should not container space or /";

        const existUrl = await Article.findOne({ url: req.body.url });
        if (existUrl) throw "this url is already taken";

        const newArticle = await Article.create({
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            url: req.body.url.trim(),
            thumbnail: req.files.thumbnail[0].filename,
            banner: req.files.banner[0].filename,
            createdBy: req.member._id,
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
        const deleteArticle = await Article.findOneAndDelete({ url: req.params.articleUrl });

        if(!deleteArticle) throw "This article is not exist"

        res.status(200).json({
            status: "success",
            msg: "delete article successfully"
        })

    } catch (err) {
        console.log("err", err);

        res.status(404).json({
            status: "error",
            msg: err
        })
    }
}

exports.editArticle = async (req, res) => {
    try {
        if(!req.body || !Object.keys(req.body).length) throw "Please enter all input fields"

        let errorString = "";

        ["title", "desc", "url", "category", "thumbnail", "banner"].map(key => {
            if (!req.body[key] && !req.files[key]) errorString += ` ${key}`
        })

        if (errorString) throw `${errorString} not allow to be empty`

        const existUrl = await Article.findOne({ url: req.body.url, _id: { $ne: req.body._id } });
        if (existUrl) throw "this url is already taken"

        if (/[ /]/.test(req.body.url)) throw "url should not container space or /";

        const newArticle = await Article.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            desc: req.body.desc,
            category: req.body.category,
            url: req.body.url.trim(),
            thumbnail: req.files.thumbnail ? req.files.thumbnail[0].filename : req.body.thumbnail,
            banner: req.files.banner ? req.files.banner[0].filename : req.body.banner,
            createdBy: req.member._id,
        }, { new: true })

        console.log("newArticle", newArticle);


        res.status(200).json({
            status: "success",
            msg: "article update successfully",
            data: newArticle
        })

    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}

exports.randomArticle = async (req, res) => {
    try {
        const randomArticle = await Article.find();
        
        res.status(200).json({
            status: "success",
            msg: "random article success",
            data: randomArticle
        })

    } catch (err) {
        console.log(err);
        
        res.status(400).json({
            status: "error",
            msg: err
        })
    }
}