const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.generateToken = (user) => {
    const token = jwt.sign({
        email: user.email
    }, process.env.SECRET_KEY)

    return { token }
}

/**
 * @function generateToken = Generate the token with the email and the environment
 *                           variable, in order to make requests to the backend
*/