import React, { useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const CategorizeForm = () => {
  const [question, setQuestion] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleHeaderImageChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    setHeaderImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = {
    //   question,
    //   headerImage,
    //   categories,
    //   items,
    // };

    const formData = new FormData();
    formData.append("question", question);
    formData.append("headerImage", headerImage);
    categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });
    // formData.append("categories", categories);
    // formData.append("items", items);
    formData.append("items", JSON.stringify(items));

    console.log(formData);

    try {
      axios.post("http://localhost:8080/categorize/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setQuestion("");
      setHeaderImage(null);
      setCategories([]);
      setNewCategory("");
      setItems([]);
      setNewItem("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (index, updatedCategory) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategory;
    setCategories(updatedCategories);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== "" && selectedCategory.trim() !== "") {
      setItems([...items, { text: newItem, category: selectedCategory }]);
      setNewItem("");
      setSelectedCategory("");
    }
  };

  const handleEditItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedCategories = Array.from(categories);
    const [reorderedItem] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, reorderedItem);

    setCategories(reorderedCategories);
  };

  const onDragEndItems = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(updatedItems);
  };

  console.log(categories, items);

  return (
    <>
      <Link to="/categorize">
        <h1 className="text-2xl font-bold">
          Click here to see Categorize Questions page
        </h1>
      </Link>

      <form className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 shadow-md">
        {/* Question */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Add question"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Media:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeaderImageChange}
            className="mb-2"
          />
          {headerImage && (
            <img
              src={URL.createObjectURL(headerImage)}
              alt="Header"
              className="mb-2 rounded"
            />
          )}
        </div>

        {/* Categories Input  */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Categories:
          </label>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="categories" type="CATEGORY">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mb-2"
                >
                  {categories.map((category, index) => (
                    <Draggable
                      key={index}
                      draggableId={`category-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="drag-icon flex items-center mb-2">
                            <div className="drag-icon mr-2">
                              {/* 🔗 */}
                              {/* 📌 */}
                              🔽🔼
                            </div>
                            <input
                              type="text"
                              value={category}
                              onChange={(e) =>
                                handleEditCategory(index, e.target.value)
                              }
                              className="w-2/3 p-2 border border-gray-300 rounded mr-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveCategory(index)}
                              className="bg-red-500 text-white p-2 rounded"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              className="w-2/3 p-2 border border-gray-300 rounded mr-2"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Items Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Items:
          </label>
          <DragDropContext onDragEnd={onDragEndItems}>
            <Droppable droppableId="items" type="ITEM">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mb-2"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={`item-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center mb-2"
                        >
                          <div className="drag-icon mr-2">
                            {/* 🔗 */}
                            📌
                            {/* 🔽🔼 */}
                          </div>
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) =>
                              handleEditItem(index, {
                                text: e.target.value,
                                category: item.category,
                              })
                            }
                            className="w-2/3 p-2 border border-gray-300 rounded mr-2"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => {
                              const updatedItems = [...items];
                              updatedItems[index].category = e.target.value;
                              setItems(updatedItems);
                            }}
                            className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
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
          <div className="flex items-center">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="w-2/3 p-2 border border-gray-300 rounded mr-2"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded mr-2"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Item
            </button>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default CategorizeForm;
