import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASEURL;

const ClozeForm = () => {
  const [sentence, setSentence] = useState("");
  const [newOption, setNewOption] = useState("");
  const [underlinedWords, setUnderlinedWords] = useState([]);
  const [previewSection, setPreviewSection] = useState("");
  const [question, setQuestion] = useState("");
  const sentenceRef = useRef(null);

  // console.log(question, previewSection, "question");

  //   console.log(underlinedWords,"underlinedWords");

  const handleSentenceChange = () => {
    const updatedSentence = sentenceRef.current.innerText;
    setSentence(updatedSentence);
    setQuestion(updatedSentence);
  };

  const handleOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const addOption = () => {
    if (newOption.trim() !== "") {
      setUnderlinedWords([...underlinedWords, newOption.trim()]);
      setNewOption("");
    }
  };

  const underlineSelectedText = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    setUnderlinedWords((prevUnderlinedWords) => [
      ...prevUnderlinedWords,
      selectedText.trim(),
    ]);

    const span = document.createElement("span");
    span.style.textDecoration = "underline";
    range.surroundContents(span);

    // Replace underlined words with underscores in the Sentence Input
    const updatedSentence = sentenceRef.current.innerText.replace(
      /<span[^>]*>(.*?)<\/span>/g,
      (match, p1) => `_${p1}_`
    );
    setSentence(updatedSentence);

    selection.removeAllRanges();
  };

  const generatePreviewSentence = () => {
    // Create a copy of the sentence and replace underlined words with underscores
    let previewSentence = sentence;
    underlinedWords.forEach((word) => {
      const underscoredWord = "_".repeat(word.length);
      previewSentence = previewSentence.replace(word, underscoredWord);
    });
    // console.log(previewSentence);

    return previewSentence;
  };

  const handleUnderlinedWordChange = (index, updatedWord) => {
    setUnderlinedWords((prevUnderlinedWords) => {
      const newUnderlinedWords = [...prevUnderlinedWords];
      newUnderlinedWords[index] = updatedWord;
      return newUnderlinedWords;
    });
  };

  const handleRemoveUnderlinedWord = (index) => {
    setUnderlinedWords((prevUnderlinedWords) =>
      prevUnderlinedWords.filter((_, i) => i !== index)
    );
  };

  const onDragEndOptions = (result) => {
    if (!result.destination) return;

    const reorderedOptions = Array.from(underlinedWords);
    const [reorderedOption] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, reorderedOption);

    setUnderlinedWords(reorderedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        previewQuestion: previewSection,
        question,
        underlinedWords,
      };

      axios.post(`${baseUrl}/cloze`, formData);

      sentenceRef.current.innerText = "";

      setSentence("");
      setUnderlinedWords([]);
      setPreviewSection("");
      setQuestion("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    setPreviewSection(generatePreviewSentence());
  }, [sentence, underlinedWords]);

  return (
    <form>
      {/* <Link to="/cloze">
        <h1 className="text-2xl font-bold">
          Click here to see Categorize Questions page
        </h1>
      </Link> */}
      {/* Preview Section */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700">
          Preview:
        </label>
        <div className="border p-2">{generatePreviewSentence()}</div>
      </div>

      {/* Sentence Input */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700">
          Sentence:
        </label>
        <div
          ref={sentenceRef}
          contentEditable
          onInput={handleSentenceChange}
          placeholder="Type your sentence here..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={underlineSelectedText}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Underline Selected Text
        </button>
      </div>

      {/* Options Section */}
      <DragDropContext onDragEnd={onDragEndOptions}>
        <Droppable droppableId="options" type="OPTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {underlinedWords.map((underlinedWord, index) => (
                <Draggable
                  key={index}
                  draggableId={`option-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2 flex items-center justify-center"
                    >
                      <div className="drag-icon m-2">
                        🔗
                        {/* 📌 */}
                        {/* 🔽🔼 */}
                      </div>
                      <input
                        type="text"
                        value={underlinedWord}
                        onChange={(e) =>
                          handleUnderlinedWordChange(index, e.target.value)
                        }
                        className="w-2/3 p-2 border border-gray-300 rounded mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveUnderlinedWord(index)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <input
          type="text"
          value={newOption}
          onChange={handleOptionChange}
          placeholder="Type a new option..."
          className="w-2/3 p-2 border border-gray-300 rounded mr-2"
        />
        <button
          type="button"
          onClick={addOption}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Option
        </button>
      </div>

      <button
        className=" bg-blue-500 text-white p-2 rounded mt-5"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default ClozeForm;
