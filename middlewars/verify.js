const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyToken = (req, res, next) => {
    const { token } = req.body
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'No estas autorizado para hacer esta operacion'
                    }
                })
                return
            }
            next()
        })
    }else{
        res.json({
            data: {
                message: 'Tienes que haber iniciado sesión'
            }
        })
        return
    }
}
/**
 * @function verifyToken Es un middleware ya que entra a esta funcion antes de hacer
 *                       la consulta en la base de datos, y por tanto tener para seguridad
 *                       a la hora de hacer una consulta
*/
