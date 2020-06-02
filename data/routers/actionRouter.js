const express = require('express');

const Action = require('../helpers/actionModel');

const router = express.Router();

// GET all actions -- /api/action
router.get('/', (req, res) => {
    Action.get()
    .then(action => {
        res.status(200).json(action);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error: "The action could not be retrieved."
        });
    });
});


// DELETE specific action -- /api/action/:id
router.delete('/:id', (req, res) =>{
    Action.remove(req.params.id)
    .then(deleted => {
        res.status(204).json(deleted);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            error: "The action could not be removed"
        });
    });
});

// PUT - UPDATE specific action -- /api/action/:id
router.put('/:id', (req, res) => {
const id = req.params.id;
const { notes, description } = req.body;

if(!notes || !description){
    res.status(400).json({
        errorMessage: "Please provide name and description for the project."
    });
}

    Action.update(id, req.body)
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

//POST - Insert new action -- /api/action
router.post('/', (req, res) => {
    Action.insert(req.body)
    .then(newAction => {
    res.status(201).json(newAction)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Cannot insert action."})
    });
});

module.exports = router;