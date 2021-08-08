const express = require('express')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const routes = require('./routes/routes')
const PORT = process.env.PORT || 3000

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use( function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    next()
})

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Soccer Api',
            description: 'Soccer Api Information',
            contact: {
                name: 'Amazing'
            },
        }
    },
    apis: ['app.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
routes(router)
app.use(router)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.listen(PORT, () => {
    console.log(`Server on running on port ${PORT}`)
})

/**
 * This file calls all the routes and the respective
 * control accesses for defined routes
 */

// Here are to all routes for show in swagger

/**
 * @swagger
 * /api/Register:
 *  post:
 *      description: Create user
 *      tags: ['Create User']
 *      parameters:
 *      - name: identification
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name_1
 *        description: Name one of person
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name_2
 *        description: Name two of person
 *        in: formData
 *        required: false
 *        type: string
 *      - name: lastname_1
 *        description: Lastname one of person
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastname_2
 *        type: string
 *        description: Lastname two of person
 *        in: formData
 *        required: false
 *      - name: age
 *        description: Age of person
 *        in: formData
 *        required: true
 *        type: number
 *      - name: email
 *        type: string
 *        description: Email of person
 *        in: formData
 *        required: true
 *      - name: password
 *        type: string
 *        description: Password to new Account
 *        in: formData
 *        required: true
 *      - name: phone
 *        type: number
 *        description: Phone
 *        in: formData
 *        required: true
 *      - name: id_profile
 *        type: number
 *        description: 1 Player, 2 Soccer prop, 3 Coach
 *        in: formData
 *        enum:
 *          - 1
 *          - 2
 *          - 3
 *        required: true
 *      - name: id_position
 *        type: number
 *        description: Id position of person
 *        in: formData
 *        required: true
 *      - name: squad_number
 *        type: number
 *        description: Squad number of person
 *        in: formData
 *        required: true
 *      - name: id_country
 *        type: string
 *        description: Country nationality of person
 *        in: formData
 *        required: true
 *      - name: id_departament
 *        type: number
 *        description: Departament nationality of person
 *        in: formData
 *        required: true
 *      - name: id_team
 *        type: number
 *        description: Id team
 *        in: formData
 *        required: true
 *      responses: 
 *          200:
 *              description: dataUser
 */
/**
 * @swagger
 * /api/login:
 *  post:
 *      description: Login user
 *      tags: ['Login User']
 *      parameters:
 *      - name: email
 *        description: Email of person have to be 
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password of person what do you
 *        required: true
 *        type: string
 *        in: formData
 *      responses: 
 *          200:
 *              description: dataUser
 */
/**
 * @swagger
 * /api/updateUser:
 *  put:
 *      description: Update user
 *      tags: ['Update User']
 *      parameters:
 *      - name: id_user
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      - name: identification
 *        description: Identification of person have to be unique
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name_1
 *        description: Name one of person
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name_2
 *        description: Name two of person
 *        in: formData
 *        required: false
 *        type: string
 *      - name: lastname_1
 *        description: Lastname one of person
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastname_2
 *        type: string
 *        description: Lastname two of person
 *        in: formData
 *        required: false
 *      - name: age
 *        description: Age of person
 *        in: formData
 *        required: true
 *        type: number
 *      - name: email
 *        type: string
 *        description: Email of person
 *        in: formData
 *        required: true
 *      - name: password
 *        type: string
 *        description: Password to new Account
 *        in: formData
 *        required: true
 *      - name: phone
 *        type: number
 *        description: Phone
 *        in: formData
 *        required: true
 *      - name: id_profile
 *        type: number
 *        description: 1 Player, 2 Soccer prop, 3 Coach
 *        in: formData
 *        enum:
 *          - 1
 *          - 2
 *          - 3
 *        required: true
 *      - name: id_position
 *        type: number
 *        description: Id position of person
 *        in: formData
 *        required: true
 *      - name: squad_number
 *        type: number
 *        description: Squad number of person
 *        in: formData
 *        required: true
 *      - name: id_country
 *        type: string
 *        description: Country nationality of person
 *        in: formData
 *        required: true
 *      - name: id_departament
 *        type: number
 *        description: Departament nationality of person
 *        in: formData
 *        required: true
 *      - name: id_team
 *        type: number
 *        description: Id team
 *        in: formData
 *        required: true
 *      - name: token
 *        type: string
 *        description: Token sended
 *        in: formData
 *        required: true
 *      responses: 
 *          200:
 *              description: dataUser
 * 
 */
/**
 * @swagger
 * /api/deleteUser:
 *  delete:
 *      description: Delete user
 *      tags: ['Delete User']
 *      parameters:
 *      - name: id_user
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      - name: token
 *        type: string
 *        description: Token sended
 *        in: formData
 *        required: true
 *      responses: 
 *          200:
 *              description: Success
 * 
 */

/**
 * @swagger
 * /api/positions:
 *  get:
 *      description: Get Positions to players
 *      tags: ['Get Positions']
 *      parameters:
 *      - name: id_user
 *        description: Id of person have to be unique
 *        in: query
 *        required: true
 *        type: number
 *      - name: id_team
 *        type: number
 *        description: Token sended
 *        in: query
 *        required: true
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /api/teams:
 *  get:
 *      description: Get all teams
 *      tags: ['Get Teams']
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /api/team/:id_team:
 *  get:
 *      description: Get players of a team
 *      tags: ['Get Players']
 *      parameters:
 *      - name: id_team
 *        description: Id team
 *        in: query
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
//  router.get('/api/team/:id', Team.getPlayers)