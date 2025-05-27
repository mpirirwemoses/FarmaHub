"use client";
import React, { useState, useEffect } from "react";

function Navigation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSummary, setIsSummary] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("questionnaireState");
    if (savedState) {
      const { answers: savedAnswers, currentIndex } = JSON.parse(savedState);
      setAnswers(savedAnswers);
      setCurrentQuestion(currentIndex);
      setSelectedOption(savedAnswers[questions[currentIndex]?.id] || ""); 
      setTextInput(savedAnswers[questions[currentIndex]?.id] || "");
    }
  }, []);

  const questions = [
    {
      id: "style",
      text: "What's your preferred style?",
      options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
    {
      id: "price",
      text: "What's your ideal price range?",
      options: ["$0-100", "$100-500", "$500-1000", "$1000+"],
    },
    {
      id: "use",
      text: "What's your primary use case?",
      options: ["Daily Wear", "Special Occasions", "Professional", "Sports"],
    },
    {
      id: "comments",
      text: "Any additional comments?",
      type: "text",
    },
  ];

  const saveState = () => {
    localStorage.setItem(
      "questionnaireState",
      JSON.stringify({ answers, currentIndex: currentQuestion })
    );
  };

  const handleNext = () => {
    setIsTransitioning(true);
    const newAnswers = { ...answers, [questions[currentQuestion].id]: questions[currentQuestion].type === "text" ? textInput : selectedOption };
    setAnswers(newAnswers);
    
    if (currentQuestion === questions.length - 1) {
      setIsSummary(true);
      saveState();
    } else {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setTextInput("");
        setIsTransitioning(false);
        saveState();
      }, 300);
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || "");
      setTextInput(answers[questions[currentQuestion - 1].id] || "");
      setIsTransitioning(false);
    }, 300);
  };

  const handleSelect = (option) => setSelectedOption(option);
  const handleTextChange = (e) => setTextInput(e.target.value);

  const handleEdit = (index) => {
    setCurrentQuestion(index);
    setSelectedOption(answers[questions[index].id] || "");
    setTextInput(answers[questions[index].id] || "");
    setIsSummary(false);
  };

  if (isSummary) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Summary of Your Responses</h1>
          <p className="text-gray-600 mb-8">Review and edit your answers below</p>
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-white p-6 border rounded-xl cursor-pointer" onClick={() => handleEdit(index)}>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">{q.text}</h2>
                <p className="text-gray-600">{answers[q.id]}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={() => setIsSummary(false)} className="text-gray-600 hover:text-gray-800">Edit Responses</button>
            <button onClick={() => alert("Submitting answers...")} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{questions[currentQuestion].text}</h2>
        {questions[currentQuestion].type === "text" ? (
          <textarea 
            value={textInput} 
            onChange={handleTextChange} 
            className="w-full p-4 border rounded-lg" 
            placeholder="Type your response here..."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button key={option} onClick={() => handleSelect(option)} className={`p-6 rounded-xl border-2 transition-all ${selectedOption === option ? "border-blue-600 bg-blue-50 shadow-md" : "border-gray-200 hover:border-blue-300"}`}>
                {option}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-8">
          {currentQuestion > 0 && <button onClick={handleBack} className="text-blue-600">Back</button>}
          <button onClick={handleNext} disabled={questions[currentQuestion].type === "text" ? !textInput.trim() : !selectedOption} className={`px-6 py-3 rounded-lg ${questions[currentQuestion].type === "text" ? textInput.trim() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400" : selectedOption ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>
            {currentQuestion === questions.length - 1 ? "View Summary" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;