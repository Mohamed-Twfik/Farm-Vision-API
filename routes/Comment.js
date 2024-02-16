const express = require("express")
const router = express.Router()
const commentController = require("../controllers/commentController")
const authrization = require("../middlewares/checkPermission/authrizationMW")
const checkPermissionOnComment = require("../middlewares/checkPermission/checkPermissionOnCommentMW")
const checkOwner = require("../middlewares/checkPermission/checkOwnerMW")
const checkPostFound = require("../middlewares/checkFound/checkPostFoundMW")
const checkCommentFound = require("../middlewares/checkFound/checkCommentFoundMW")
const createCommentValidator = require("../middlewares/validators/createCommentValidatorMW")
const validID = require("../middlewares/validators/checkValidIDMW")
const upload = require("../middlewares/uploadImageMW")

router.get("/postcomments/:id", validID, authrization, checkPostFound, commentController.getCommentsOfPost)
router.post("/like/:id", validID, authrization, checkCommentFound, commentController.like)
router.post("/dislike/:id", validID, authrization, checkCommentFound, commentController.disLike)

router.get("/:id", validID, authrization, checkCommentFound, commentController.getCommentById)
router.post("/onpost/:id", validID, authrization, checkPostFound, upload.array("images"), createCommentValidator, commentController.creatComment)
router.post("/oncomment/:id", validID, authrization, checkCommentFound, upload.array("images"), createCommentValidator, commentController.creatComment)
router.put("/:id", validID, authrization, checkCommentFound, checkOwner, upload.array("images"), createCommentValidator, commentController.updateComment)
router.delete("/:id", validID, authrization, checkCommentFound, checkPermissionOnComment, commentController.deleteComment)

module.exports = router