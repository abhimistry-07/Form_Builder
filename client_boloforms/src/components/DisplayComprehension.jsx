import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayComprehension = () => {
  const [comprehensionData, setComprehensionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/comprehension");
        setComprehensionData(response.data);
      } catch (error) {
        console.error("Error fetching comprehension data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {comprehensionData?.map((comprehensionItem, index) => (
        <div key={index} className="mb-8 border-solid border-4 p-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Passage:</h2>
            <p className="break-words">{comprehensionItem.passage}</p>
          </div>

          <div className="mb-4">
            {/* <h2 className="text-2xl font-bold mb-2">Questions:</h2> */}
            {comprehensionItem.questions.map((question, qIndex) => (
              <div key={qIndex} className="mb-4">
                <h3 className="text-xl font-bold">Question {qIndex + 1}</h3>
                <h3 className="text-xl font-bold">{question.question}</h3>
                <ul className="list-disc ml-6">
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex} className="flex items-center mb-2">
                      {question.selectedInputType === "radio" ? (
                        <input type="radio" className="mr-2"></input>
                      ) : (
                        <input type="checkbox" className="mr-2"></input>
                      )}
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayComprehension;
