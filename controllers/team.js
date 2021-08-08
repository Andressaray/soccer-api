const { connection } = require('../config/connection')

/**
 * @function getTeams = Gets all teams with name and ubication
 */

exports.getTeams = async (req, res) => {
    let teams = []
    const sql = `SELECT team.id_team, team.name_team, lg.name_league, 
                CONCAT_WS(' - ', c.country, dp.departament) AS ubication
                FROM team
                INNER JOIN departament dp
                ON team.id_departament = dp.id_departament
                INNER JOIN league lg 
                ON team.id_league = lg.id_league
                INNER JOIN country c
                ON c.id_country = team.id_country;`
    try {
        connection.query(sql, [], (err, rows) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'Algunos datos no coinciden'
                    }
                })
                return
            }
            rows.forEach(element => {
                teams.push({
                    id_team: element.id_team,
                    name_team: element.name_team,
                    ubication: element.ubication
                })
            })
            res.json({
                status: 201,
                data: {
                    teams
                }
            })
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
 * @function getPositions = Gets all positions of a team
 */

exports.getPositions = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    let positions = []
    const { id_team, id_user } = req.query
    const sql = `SELECT identification, CONCAT(user.name_1, ' ', user.name_2, ' ', user.lastname_1, ' ', user.lastname_2)
                AS fullname, position FROM user
                INNER JOIN team
                ON user.id_team	= team.id_team
                INNER JOIN position
                ON user.id_position = position.id_position
                WHERE user.id_team = ? AND user.id_user = ?;`
    try {
        connection.query(sql, [id_team, id_user], (err, rows) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'Algunos datos no coinciden'
                    }
                })
                return
            }
            rows.forEach(element => {
                positions.push({
                    identificacion: element.identificacion,
                    fullname: element.fullname,
                    position: element.position
                })
            })
            res.json({
                status: 201,
                data: {
                    positions
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
 * @function getPlayers = Gets all players of a team with data of they
 */

exports.getPlayers = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        res.json({
            status: 409,
            data: {
                message: 'No hay datos'
            }
        })
        return
    }
    let players = []
    const { id_team } = req.query
    const sql = `SELECT team.id_team, team.name_team, identification, CONCAT(user.name_1, ' ', user.name_2, ' ', user.lastname_1, ' ', user.lastname_2)
                AS fullname, age, position, squad_number FROM user
                INNER JOIN team
                ON user.id_team	= team.id_team
                INNER JOIN profile 
                ON user.id_profile = profile.id_profile
                INNER JOIN position
                ON user.id_position = position.id_position
                INNER JOIN indumentary
	            ON user.id_user = indumentary.id_user
                WHERE user.id_team = ?;`
    try {
        connection.query(sql, [id_team], (err, rows) => {
            if(err){
                res.json({
                    status: 409,
                    data: {
                        message: 'Algunos datos no coinciden'
                    }
                })
                return
            }
            rows.forEach(element => {
                players.push({
                    id_team: element.id_team,
                    name_team: element.name_team,
                    identificacion: element.identificacion,
                    fullname: element.fullname,
                    age: element.age,
                    position: element.position,
                    squad_number: element.squad_number
                })
            })
            res.json({
                status: 201,
                data: {
                    players
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
