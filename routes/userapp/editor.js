const fetchuser = require('../../middleware/fetchuser')
const router = require('express').Router()
const editorController = require("../../controller/userapp/editorController")

router.post("/create", fetchuser, editorController.createForm)
router.get("/get/:id", fetchuser, editorController.getForm)
router.put("/update/:id", fetchuser, editorController.updateForm)
router.delete("/delete", fetchuser, editorController.deleteForm)



module.exports = router