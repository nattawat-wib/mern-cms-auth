const router = require("express").Router();
const articleController = require("./../controller/articleController");
const authController = require("./../controller/authController");

router.route("/")
    .get(articleController.gerAllArticle)
    .post(
        authController.isLogin,
        articleController.uploadArticleImage,
        articleController.addArticle
    )
router.get("/random", articleController.randomArticle)

router.route("/:articleUrl")
    .get(articleController.getArticle)
    .patch(
        authController.isLogin,
        articleController.uploadArticleImage,
        articleController.editArticle
    )
    .delete(
        authController.isLogin,
        articleController.deleteArticle
    )

module.exports = router