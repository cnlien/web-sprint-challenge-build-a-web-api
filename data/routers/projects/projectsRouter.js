const express = require('express')
const projectsDb = require('../../helpers/projectModel.js')
const router = express.Router()

router.post('/', validateProject, (req, res) => {
    projectsDb.insert(req.body)
        .then((newProject) => {
            res.status(201).json({ message: `${req.body.name} has been added`, newProject})
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
             })
        })
})

router.get('/', (req, res) => {
    projectsDb.get(req.id)
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
            })
        })
})

router.get('/:id/actions', (req, res) => {
    projectsDb.getProjectActions(req.params.id)
        .then((projectActions) => {
            res.status(200).json(projectActions)
        })
        .catch((err) => {
            res.status(500).json({
                message: "The server is not responding",
                error: err
            })
        })
})

router.put('/:id', (req, res) => {
    projectsDb.update(req.params.id, req.body)
        .then((project) => {
            project
                ? res.status(201).json({
                    project,
                    message: "The project was updated successfully"
                })
                : res.status(404).json({
                    message: "The project does not exist"
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
    projectsDb.remove(parseInt(req.params.id))
        .then((project) => {
            project
                ? res.status(202).json({ message: "The project has been deleted" })
                : res.status(404).json({ message: "The project does not exisit" })
        })
        .catch((err) => {
            res.status(500).json({ message: "The server is not responding" })
        })
})

function validateProject(req,res,next) {
    const data = req.body;
    !data
        ? res.status(400).json({ message: "missing project data" })
        : !data.name ? res.status(400).json({ message: "Project Name is Required" })
        : !data.description ? res.status(400).json({ message: "Project Description is required" })
        : next();
}

module.exports = router;