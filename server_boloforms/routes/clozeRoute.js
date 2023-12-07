const express = require('express');
const ClozeModel = require("../models/ClozeModel");
const clozeRouter = express.Router();

// GET
clozeRouter.get('/', async (req, res) => {
    try {
        const formData = await ClozeModel.find();
        res.status(200).send({ msg: "Successfully fetched", formData })
    } catch (error) {
        console.error('Error fetching formData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST
clozeRouter.post('/', async (req, res) => {
    const formData = req.body;
    // console.log(formData);
    try {
        const newForm = await ClozeModel.create(formData);
        res.status(200).json({ msg: "New question created", payload: newForm });
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = clozeRouter;