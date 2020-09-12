const express = require('express')
const actionsDb = require('../../helpers/actionModel.js')
const router = express.Router()

router.post('/', validateAction, (req,res) => {
    actionsDb.insert(req.body)
        .then((action) => {
            res.status(201).json({
                message: `${req.body.description}: was added successfully`,
                action: action
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
            })
        })
})

router.get('/', (req, res) => {
    actionsDb.get(req.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
            })
        })
})

router.put('/:id', validateAction, (req, res) => {
    actionsDb.update(req.params.id, req.body)
        .then((action) => {
            action 
                ? res.status(200).json({
                    action: action,
                    message: "The action was updated successfully"
                })
                : res.status(404).json({
                    message: "The action does not exisit"
                })
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
            })
        })
})

router.delete('/:id', (req, res) => {
    actionsDb.remove(parseInt(req.params.id))
        .then((action) => {
            action
                ? res.status(202).json({ message: "The action was successfully deleted" })
                : res.status(404).json({ message: "The action does not exisit" })
        })
        .catch((err) => {
            res.status(500).json({ messsage: "The server is not responding" })
        })
})

function validateAction(req,res,next) {
    const data = req.body;
    !data
        ? res.status(400).json({ message: "missing project data" })
        : !data.project_id ? res.status(400).json({ message: "Project ID is Required" })
        : next();
}

module.exports = router;