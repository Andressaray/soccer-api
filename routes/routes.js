const User = require('../controllers/user')
const Team = require('../controllers/team.js')

const { verifyToken } = require('../middlewars/verify')

module.exports = (router) => {
    router.post('/api/register', User.register)
    router.post('/api/login', User.login)
    router.put('/api/updateUser', verifyToken, User.updateUser)
    router.delete('/api/deleteUser', verifyToken, User.deleteUser)
    router.get('/api/positions', Team.getPositions)
    router.get('/api/teams', Team.getTeams)
    router.get('/api/team/:id_team', Team.getPlayers)
}

/**
 * Returns all endpoints with their respective http verbs, 
 * functions that contain the User controller and middlewars if any
*/
