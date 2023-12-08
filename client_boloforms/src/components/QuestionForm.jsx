import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedInputType, setSelectedInputType] = useState("radio");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

//   console.log(question);
  //   console.log(options);
  //   console.log(answers);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    const newAnswers = [...answers];
    newAnswers[index] = undefined;
    setAnswers(newAnswers);
  };

  const handleAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    setAnswers([...answers, undefined]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const handleAnswerChange = (index, isChecked) => {
    const newAnswers = [...answers];
    newAnswers[index] = isChecked ? index : undefined;
    setAnswers(newAnswers);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedOptions = Array.from(options);
    const [reorderedOption] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, reorderedOption);

    setOptions(reorderedOptions);

    const reorderedAnswers = Array.from(answers);
    const [reorderedAnswer] = reorderedAnswers.splice(result.source.index, 1);
    reorderedAnswers.splice(result.destination.index, 0, reorderedAnswer);
    setAnswers(reorderedAnswers);
  };

  const renderOptionInput = (option, index) => (
    <div key={index} className="flex items-center">
      <Draggable draggableId={`option-${index}`} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex"
          >
            <div className="drag-icon mr-2">🔽🔼</div>
            <input
              type={selectedInputType}
              name={`option-${index}`}
              checked={answers.includes(index)} 
              onChange={(e) => handleAnswerChange(index, e.target.checked)}
              className="mr-2"
            />
          </div>
        )}
      </Draggable>

      <input
        value={option}
        onChange={(e) => handleOptionChange(index, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded ml-2"
      />

      {options.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemoveOption(index)}
          className="bg-red-500 text-white p-2 rounded ml-2"
        >
          Remove
        </button>
      )}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredAnswers = answers.filter((answer) => answer !== undefined);

    onAddQuestion({
      question,
      options,
      answers: filteredAnswers,
      selectedInputType,
    });
    setQuestion("");
    setOptions([]);
    setAnswers([]);
    setSelectedInputType("radio");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="options" type="OPTION">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="question-form">
              <label className="block text-sm font-bold text-gray-700">
                Question:
              </label>
              <textarea
                value={question}
                onChange={handleQuestionChange}
                placeholder="Add your question..."
                className="w-full p-2 border border-gray-300 rounded"
              />

              <label className="block text-sm font-bold text-gray-700">
                Input Type:
              </label>
              <select
                value={selectedInputType}
                onChange={(e) => setSelectedInputType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="radio">Radio Button</option>
                <option value="checkbox">Checkbox</option>
              </select>

              <label className="block text-sm font-bold text-gray-700">
                Options:
              </label>
              {options.map((option, index) => renderOptionInput(option, index))}

              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Option
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-5 bg-green-500 text-white p-2 rounded"
              >
                Add Question
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionForm;
