import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DisplayCategorize = () => {
  const [data, setData] = useState([]);
  const [categoryItems, setCategoryItems] = useState({});

  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:8080/categorize";
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(categoryItems);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const movedItemId = result.draggableId;
    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    setCategoryItems((prevCategoryItems) => {
      const updatedCategoryItems = { ...prevCategoryItems };

      updatedCategoryItems[sourceCategory] =
        updatedCategoryItems[sourceCategory] || [];

      updatedCategoryItems[sourceCategory] = updatedCategoryItems[
        sourceCategory
      ].filter((itemId) => itemId !== movedItemId);

      updatedCategoryItems[destinationCategory] =
        updatedCategoryItems[destinationCategory] || [];

      updatedCategoryItems[destinationCategory].push(movedItemId);

      return updatedCategoryItems;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {data.map((questionData, index) => (
          <div key={index} className="border border-gray-300 p-4 m-4">
            <h3 className="text-lg font-bold mb-2">
              Question: {questionData.question}
            </h3>

            <Droppable droppableId="items" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap"
                >
                  {questionData.items.map((item, itemIndex) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={itemIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border border-gray-300 p-2 m-1 draggable-item"
                        >
                          {item.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="flex flex-wrap">
              {questionData.categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="border border-gray-300 p-2 m-1 flex-grow"
                >
                  <h4>{category}</h4>
                  <Droppable droppableId={category} direction="vertical">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-wrap"
                      >
                        {categoryItems[category]?.map((itemId, index) => (
                          <Draggable
                            key={itemId}
                            draggableId={itemId}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="border border-gray-300 p-2 m-1 draggable-item"
                              >
                                {
                                  questionData.items.find(
                                    (item) => item._id === itemId
                                  )?.text
                                }
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DisplayCategorize;
