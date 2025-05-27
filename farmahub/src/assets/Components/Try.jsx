import { useState } from "react"

const Try =()=>{
    const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
    const [answers , setAnswers]= useState({});
    const [selectedOption , setSelectedOption]= useState(null);
    const [textInput , setTextInput]= useState("");
    const [isTransitioning , setIsTransitioning]= useState(false);
    const [isSummary , setIsSummary]= useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

const questions =[
    { id: "style",
        question :"what is your preferred style?",
    options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
    { id: "design",
        question :"what is your preferred style?",
    options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
    { id: "tech",
        question :"what is your preferred style?",
    options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
    { id: "clo",
        question :"what is your preferred style?",
    options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
    { id: "food",
        question:"what is your preferred style?",
    options: ["Classic", "Modern", "Vintage", "Minimalist"],
    },
]

    return(
        <div>
            <h3 className="text-lg font-bold mb-4">Answer The folllowing Questions </h3>
            <div>
                {questions.map((question, index)=>(
                    <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
                        <p className="text-gray-600 text-sm">{question.options}</p>
                        <p className="mt-2 text-gray-700">{question.options}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
            <button className="text-gray-600 hover:text-gray-800">Edit Responses</button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">continue</button>
            </div>
        </div>
    )
}
export default Try;