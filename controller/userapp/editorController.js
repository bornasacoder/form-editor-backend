const Editor = require("../../model/editor")

const createForm = async (req, res) => {
    try {
        // console.log(req.body)
        let result = await Editor.create({
            ...req.body
        })
        // console.log(result)
        res.success({
            data: result
        })
    } catch (error) {
        res.internalServerError({
            data: error.message
        });
    }
}

const updateForm = async (req, res) => {
    try {
        const editor = await Editor.findById(req.params.id);
        if (!editor) {
            res.status(400).json("you can update only your account")
        }
        const data = req.body
        const updateEditor = await Editor.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                fields: {
                    ...req.body
                }
            }
        }, {
            new: true
        });
        console.log(updateEditor)
        res.success({
            data: updateEditor
        });
    } catch (err) {
        return res.internalServerError({
            data: err
        });
    }
}
const deleteForm = async (req, res) => {
    try {
        await Editor.findByIdAndDelete(req.params.id);
        res.success({
            data: "Account has been deleted"
        });
    } catch (err) {
        return internalServerError({
            data: err
        });
    }
}

const getForm = async (req, res) => {
    try {
        const editor = await Editor.findById(req.params.id)
        res.success({
            data: editor
        });
    } catch (err) {
        res.internalServerError({
            data: err
        });
    }


}

module.exports = {
    createForm,
    updateForm,
    deleteForm,
    getForm
}