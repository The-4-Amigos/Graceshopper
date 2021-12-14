const User = require('../db/models/User')


//logged in admin that exists in the db 
const verifyAdmin = async (req, res, next) => {
    try {
    const token = req.headers.authorization
    const currentUser = await User.findByToken(token)
    if (currentUser && currentUser.isAdmin) {
        next()
    } else {
        throw new Error ('unathorized user')
    }
    } catch (error) {
        next (error)
    }
}



module.exports = verifyAdmin