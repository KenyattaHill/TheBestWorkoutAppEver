const jwt = require("jsonwebtoken")

function verifyToken(request, response, next) {
    const token = request.headers['x-access-token'];
    const secret = process.env.TOKEN_SECRET || "this is a secret phrase"
    if (!token) {
        return response.status(403).send({
            message: "no token provided"
        })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log(err)
            if (err.message === 'jwt expired') {
                return response.status(400).send({
                    message: 'Authorization expired, please sign in.'
                })
            }
            return response.status(401).send({
                message: "unauthorized"
            })
        }
        request.userId = decoded.id
        next()
    })
}
module.exports = verifyToken