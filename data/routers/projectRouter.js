const express = require('express');

const Project = require('../helpers/projectModel');

const router = express.Router();

//Insert new project -- /api/project
router.post("/", (req, res) => {
    const project = req.body;

    Project.insert(project)
    .then(newProject =>{
        res.status(201).json(newProject)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving project to the database."
        });
    });
});


// GET all projects -- /api/project
router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.log('error from GET request', error)
        res.status(500).json({ errorMessage: 'Retrieving project information failed'})
    })
})

// GET specific project -- /api/project/:id
router.get('/:id', validateProjectId, (req, res) => {
    Project.get(req.param.id)
    .then(project =>{
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Project info could not be retrieved."
        });
    });
});

// GET specific project with actions
router.get('/:id/actions', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(projActions =>{
        res.status(200).json(projActions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Cannot get actions for project."})
    });
});

// DELETE specific project -- /api/project/:id
router.delete('/:id', validateProjectId, (req, res) =>{
    Project.remove(req.params.id)
    .then(deleted => {
        res.status(204).json(deleted);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error: "The project could not be removed"
        });
    });
});

// UPDATE specific project -- /api/project/:id
router.put('/:id', validateProjectId, (req, res) => {
const id = req.params.id;
const { name, description } = req.body;

    if(!name || !description){
        res.status(400).json({
            errorMessage: "Please provide name and description for the project."
        })
    }

    Project.update(id, req.body)
    .then(updatedProject =>{
        res.status(200).json(updatedProject);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The project could not be updated."
        });
    });
});


//Middleware
function validateProjectId(req, res, next){
    Project.get(req.params.id)
    .then(projectId =>{
        if(projectId){
            req.project = projectId;
            next();
        } else {
            res.status(400).json({message: "invalid project id"});
        }
    })
}


module.exports = router;