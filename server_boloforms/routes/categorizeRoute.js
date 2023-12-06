const express = require('express');
const CategorizeModel = require("../models/CategorizeModel");
const categorizeRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



// GET
categorizeRouter.get('/', async (req, res) => {
  try {
    const form = await CategorizeModel.find();
    res.status(200).send(form)

  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST
categorizeRouter.post('/create', upload.single('headerImage'), async (req, res) => {

  const formData = req.body;
  formData.items = JSON.parse(formData.items);

  if (req?.file?.path) {
    formData.headerImage = req.file.path;
  }
  // console.log(formData, ">>>>>>>>>>>>>>>>>>>>");
  try {
    const newForm = await CategorizeModel.create(formData);
    res.status(200).json({ msg: "New question created", payload: newForm });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = categorizeRouter;