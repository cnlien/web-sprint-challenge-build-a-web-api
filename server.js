const express = require('express')

const projectsRouter = require('./data/routers/projects/projectsRouter.js')
const actionsRouter = require('./data/routers/actions/actionsRouter.js')

const helmet = require('helmet')
const server = express();

server.use(express.json())
server.use(helmet())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
server.use(logger);

server.get('/', (req, res) => {
    res.send(`<h2>API is running...</h2>`)
})

function logger(req,res,next) {
    console.log(`Method: ${req.method} request`)
    console.log(`URL: ${req.url}`)
    console.log(`AT: ${new Date().toISOString()}`)
    next();
}

module.exports = server;