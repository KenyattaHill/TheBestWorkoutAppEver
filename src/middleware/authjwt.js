const jwt = require("jsonwebtoken")

function verifyToken(request, response, next){
    const token = request.headers['x-access-token'];
    const secret = process.env.TOKEN_SECRET || "this is a secret phrase"
    if (!token) {
        return response.status(403).send({
            message: "no token provided"
        })
    } 
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return response.status(401).send({
                message: "unauthorized"
            })
        }
        request.userId = decoded.id
        next()
    } )
}
module.exports = verifyToken