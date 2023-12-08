import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const ComprehensionForm = () => {
  const [passage, setPassage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [questions, setQuestions] = useState([]);

  // console.log(questions, ">>>>>>");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("passage", passage);
      if (selectedImage) {
        formData.append("selectedImage", selectedImage);
      }
      formData.append("questions", JSON.stringify(questions));

      const response = await axios.post(
        `http://localhost:8080/comprehension`,
        formData
      );

      console.log("Response:", response.data);

      setPassage("");
      setSelectedImage("");
      setQuestions([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <p className="p-2 border border-gray-300 rounded text-lg font-bold">
          Read the question below and answer based on it
        </p>
        <textarea
          value={passage}
          type="text"
          placeholder="Add passage"
          onChange={(e) => setPassage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
        />

        <label className="block mt-4 text-sm font-bold text-gray-700">
          Media:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <QuestionForm onAddQuestion={handleAddQuestion} />

      <div className="questions">
        {questions?.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold">Question {index + 1}</h3>
            <p className="max-w-md">{question.question}</p>
            <ul className="list-disc ml-6">
              {question?.options.map(
                (option, optionIndex) =>
                  option && (
                    <li key={optionIndex} className="flex items-center mb-2">
                      <input
                        type={
                          question.selectedInputType === "radio"
                            ? "radio"
                            : "checkbox"
                        }
                        name={`question-${index}`}
                        className="mr-2"
                      />
                      <span>{option}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </form>
  );
};

export default ComprehensionForm;
