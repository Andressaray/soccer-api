const bcrypt = require('bcrypt')
const { generateToken } = require('./../utils/generateToken')

const { connection } = require('../config/connection')

/**
 * @function register = Create a user with all parameters that it needs in order 
 *                      to be created and returns a token and user information
*/

exports.register = async (req, res) => {
    if(Object.keys(req.body).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    try {
        const user = {
            identification: req.body.identification,
            name_1: req.body.name_1,
            name_2: req.body.name_2,
            lastname_1: req.body.lastname_1,
            lastname_2: req.body.lastname_2,
            age: parseInt(req.body.age),
            email: req.body.email,
            phone: parseInt(req.body.phone),
            password: bcrypt.hashSync(req.body.password, 5),
            id_profile: req.body.id_profile ? parseInt(req.body.id_profile) : 1,
            id_position: parseInt(req.body.id_position),
            id_team: parseInt(req.body.id_team),
            id_country: req.body.id_country,
            id_departament: parseInt(req.body.id_departament),
            squad_number: parseInt(req.body.squad_number)
        }
        const sql = `INSERT INTO user 
                    (identification, name_1, name_2, lastname_1, lastname_2, age, email, phone, 
                    password, id_profile, id_position, id_team, id_country, id_departament)
                    values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const existUser = await infoUser(user)
        if(Object.keys(existUser).length === 0){
            const values = [user.identification, user.name_1, user.name_2, user.lastname_1, user.lastname_2, 
                user.age, user.email, user.phone, user.password, user.id_profile, user.id_position, user.id_team,
                user.id_country, user.id_departament
            ]
            connection.query(sql, values, async (err, rows) => {
                if(err){
                    res.json({
                        status: 409,
                        data: {
                            message: 'Algunos datos no coinciden'
                        }
                    })
                    return
                }
                const dataUser = await infoUser(user)
                await saveIndumentary(dataUser, user.squad_number)
                //For no do to other query
                dataUser.squad_number = user.squad_number
                //I remove the password field so that it is not sent
                delete dataUser.password
                const { token } = generateToken(user)
                res.json({
                    status: 201,
                    data: {
                        dataUser,
                        token
                    }
                })
            })
            return
        }
        res.json({
            status: 409,
            data: {
                message: 'El usuario ya existe'
            }
        })
        return
    } catch (error) {
        res.json({
            status: 500,
            data: {
                message: 'Ocurrio un error inesperado'
            }
        })
    }
}
/**
 * @function login = Check if the user exists in the database and if so,
 *                   returns a token
*/
exports.login = async (req, res) => {
    if(Object.keys(req.body).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    try {
        const { email, password } = req.body
        const dataUser = await infoUser(user = {email, identification: ''})
        if(Object.keys(dataUser).length !== 0){
            const isEqual = bcrypt.compareSync(password, dataUser.password)
            if(isEqual){
                delete dataUser.password
                const { token } = generateToken(email)
                res.json({
                    status: 201,
                    data: {
                        dataUser,
                        token
                    }
                })
                return
            }
            res.json({
                status: 409,
                data: {
                    message: 'Contraseña o correo incorrecto'
                }
            })
            return
        }else{
            res.json({
                status: 404,
                data: {
                    message: 'El usuario no existe'
                }
            })
            return
        }
    } catch (error) {
        res.json({
            status: 500,
            data: {
                message: 'Ocurrio un error inesperado'
            }
        })
    }
}
/**
 * @function updateUser = Update the user's information with the id
 *                        that corresponds to that user, and returns a token
*/
exports.updateUser = async (req, res) => {
    if(Object.keys(req.body).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    try {
        const user = {
            id_user: parseInt(req.body.id_user),
            identification: req.body.identification,
            name_1: req.body.name_1,
            name_2: req.body.name_2,
            lastname_1: req.body.lastname_1,
            lastname_2: req.body.lastname_2,
            age: parseInt(req.body.age),
            email: req.body.email,
            phone: parseInt(req.body.phone),
            id_profile: req.body.id_profile ? parseInt(req.body.id_profile) : 1,
            id_position: parseInt(req.body.id_position),
            id_team: parseInt(req.body.id_team),
            id_country: req.body.id_country,
            id_departament: parseInt(req.body.id_departament),
            squad_number: parseInt(req.body.squad_number)
        }
        const sql = `UPDATE user 
                    INNER JOIN indumentary AS idm
                    ON user.id_user = idm.id_user
                    SET identification = ?, name_1 = ?, name_2 = ?, lastname_1 = ?, lastname_2 = ?, age = ?, 
                    phone = ?, email = ?, id_profile = ?, id_position = ?, id_team = ?, id_country = ?, id_departament = ?,
                    squad_number = ?
                    WHERE user.id_user = ?`
        const values = [user.identification, user.name_1, user.name_2, user.lastname_1, user.lastname_2, user.age, 
            user.phone, user.email, user.id_profile, user.id_position, user.id_team, 
            user.id_country, user.id_departament, user.squad_number, user.id_user
        ]
        connection.query(sql, values, async (err, rows) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'Algunos datos no coinciden'
                    }
                })
                return
            }
            const dataUser = await infoUser(user)
            const { token } = generateToken(user)
            res.json({
                data: {
                    dataUser,
                    token
                }
            })
            return
        })
    } catch (error) {
        res.json({
            status: 500,
            data: {
                message: 'Ocurrio un error inesperado'
            }
        })
    }

}

/**
 * @function deleteUser = Delete the account of the user with the id that was sent
*/

exports.deleteUser = async (req, res) => {
    if(Object.keys(req.body).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    try {
        const { id_user } = req.body
        const sql = `DELETE FROM user WHERE id_user = ?`
        await deleteIndumentary(id_user)
        connection.query(sql, [id_user], (err, rows) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'Algunos datos no coinciden'
                    }
                })
                return
            }
            res.json({
                status: 201,
                data: {
                    message: 'Cuenta eliminada con exito'
                }
            })
            return
        })
    } catch (error) {
        res.json({
            status: 500,
            data: {
                message: 'Ocurrio un error inesperado'
            }
        })
    }
}

/**
 * @function infoUser = Returns the user's information if it exists,
 *                      this function is reusable, so it was created
*/

const infoUser = (user) => {
    return new Promise((resolve, reject) => {
        const values = [user.identification, user.email]
        const sql = `SELECT user.id_user, identification, name_1, name_2, lastname_1, lastname_2, age, phone, 
                    email, password, id_profile, id_position, id_team, id_country, id_departament, squad_number 
                    FROM user 
                    LEFT JOIN indumentary AS idm
                    ON user.id_user = idm.id_user
                    WHERE identification = ? OR email = ?`
        let dataUser = {}
        connection.query(sql, values, (err, rows) => {
            if(err){
                reject(err)
            }
            rows.forEach(element => {
                dataUser = {
                    id_user: element.id_user,
                    identification: element.identification,
                    name_1: element.name_1,
                    name_2: element.name_2,
                    lastname_1: element.lastname_1,
                    lastname_2: element.lastname_2,
                    age: element.age,
                    phone: element.phone,
                    email: element.email,
                    password: element.password,
                    id_profile: element.id_profile,
                    id_position: element.id_position,
                    id_team: element.id_team,
                    id_country: element.id_departament,
                    id_departament: element.id_departament,
                    squad_number: element.squad_number
                }
            })
            resolve({...dataUser})
        })
    })
}

const saveIndumentary = (user, squad_number) => {
    return new Promise((resolve, reject) => {
        const values = [user.id_user, squad_number, user.foot_size, user.short_size, user.shirt_size]
        const sql = `INSERT INTO indumentary (id_user, squad_number, foot_size, short_size, shirt_size)
                    VALUES (?,?,?,?,?);`
        connection.query(sql, values, (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(true)
        })
    })
}

const deleteIndumentary = (id_user) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM indumentary WHERE id_user = ?`
        connection.query(sql, [id_user], (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(true)
        })
    })
}