const { User } = require("../models")

async function checkDuplicateUserNameOrEmail(req, res, next) {
    const { userName, email } = req.body
    const user = await User.findOne({ userName }).catch((err) => (
        res.status(500).send({
            message: err
        })

    ))
    if (user) {
        res.status(400).send({
            message: "failed! username is already in use."
        })
        return
    }
    const userEmail = await User.findOne({ email }).catch((err) => (
        res.status(500).send({
            message: err
        })
    ))
    if (userEmail) {
        res.status(400).send({
            message: "failed! email is already in use."
        })
        return
    }
    next()
}
module.exports = checkDuplicateUserNameOrEmail 