import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DisplayCloze = () => {
  const [clozeData, setClozeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cloze");
        setClozeData(response.data);
      } catch (error) {
        console.error("Error fetching cloze data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const updatedClozeData = [...clozeData];

    console.log(updatedClozeData);

    const draggedWord =
      updatedClozeData[source.droppableId].underlinedWords[source.index];

    const blankIndex =
      updatedClozeData[destination.droppableId].previewQuestion.indexOf(
        "______"
      );

    const newPreviewQuestion = updatedClozeData[
      destination.droppableId
    ].previewQuestion.replace("______", draggedWord);
    updatedClozeData[destination.droppableId].previewQuestion =
      newPreviewQuestion;

    const [removed] = updatedClozeData[
      source.droppableId
    ].underlinedWords.splice(source.index, 1);
    updatedClozeData[destination.droppableId].underlinedWords.splice(
      destination.index,
      0,
      removed
    );

    setClozeData(updatedClozeData);
  };

  return (
    <div className="container mx-auto p-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        {clozeData?.map((clozeItem, index) => (
          <div key={index} className="mb-8 border-solid border-4 p-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Question {index + 1}</h2>
              <Droppable
                droppableId={`droppable-${index}`}
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex"
                  >
                    {clozeItem.underlinedWords.map((word, wordIndex) => (
                      <Draggable
                        key={wordIndex}
                        draggableId={`draggable-${index}-${wordIndex}`}
                        index={wordIndex}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="mb-2 mr-2"
                          >
                            <button className="bg-blue-500 text-white p-2 rounded">
                              {word}
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div>
              <div className="mb-4 font-bold text-2xl">
                <Droppable
                  droppableId={`preview-${index}`}
                  direction="horizontal"
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex"
                    >
                      {clozeItem.previewQuestion
                        .split(/\b/)
                        .map((part, partIndex) =>
                          part.trim() !== "" ? (
                            <Droppable
                              key={partIndex}
                              droppableId={`blank-${index}-${partIndex}`}
                              direction="horizontal"
                            >
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className="p-2"
                                >
                                  {part}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          ) : (
                            <div key={partIndex}>{part}</div>
                          )
                        )}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DisplayCloze;
