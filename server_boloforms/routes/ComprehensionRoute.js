const express = require('express');
const ComprehensionModel = require("../models/ComprehensionModel");
const comprehensionRouter = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET
comprehensionRouter.get("/", async (req, res) => {
    try {
        const forms = await ComprehensionModel.find();
        res.status(200).json(forms);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST
comprehensionRouter.post("/", upload.single("selectedImage"), async (req, res) => {
    try {
        const { passage, questions } = req.body;

        let selectedImage = "";
        if (req.file) {
            selectedImage = req.file.buffer.toString("base64");
        }

        const comprehensionForm = new ComprehensionModel({
            passage,
            selectedImage,
            questions: JSON.parse(questions),
        });

        const savedComprehensionForm = await comprehensionForm.save();
        res.status(200).json(savedComprehensionForm);
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = comprehensionRouter;