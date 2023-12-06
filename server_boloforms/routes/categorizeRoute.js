const express = require('express');
const CategorizeModel = require("../models/CategorizeModel");
const categorizeRouter = express.Router();

// GET
categorizeRouter.get('/', async (req, res) => {
  try {
    const form = await CategorizeModel.find();
    res.status(200).send({ msg: 'All data', form })

  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST
categorizeRouter.post('/create', async (req, res) => {
  const formData = req.body;

  try {
    const newForm = await CategorizeModel.create(formData);
    res.status(200).json({ msg: "New question created", payload: newForm });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = categorizeRouter;