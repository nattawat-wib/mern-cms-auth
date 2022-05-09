const router = require("express").Router();
const articleController = require("./../controller/articleController");

router.route("/")
    .get(articleController.gerAllArticle)
    .post(
        articleController.uploadArticleImage,
        articleController.addArticle
    )

router.route("/:articleUrl")
    .get(articleController.getArticle)
    .patch(
        articleController.uploadArticleImage,
        articleController.editArticle
    )
    .delete(articleController.deleteArticle)

module.exports = router