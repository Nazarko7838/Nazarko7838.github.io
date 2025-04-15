import React, { useState, useEffect } from "react";

const questions = [
    {
        question: "Виберіть правильний варіант: 'She ___ to the store every day.'",
        options: ["go", "goes", "going"],
        answer: "goes",
        language: "Англійська"
    },
    {
        question: "Виберіть правильну форму артикля: 'Ich habe ___ Apfel.'",
        options: ["ein", "eine", "einen"],
        answer: "einen",
        language: "Німецька"
    },
    {
        question: "Яке слово означає 'стіл' польською мовою?",
        options: ["Krzesło", "Stół", "Łóżko"],
        answer: "Stół",
        language: "Польська"
    },
    {
        question: "Виберіть правильний варіант: 'Вона ___ книгу зараз.'",
        options: ["читає", "читаєш", "читаю"],
        answer: "читає",
        language: "Українська"
    },
    {
        question: "Як правильно сказати 'Я маю собаку' англійською?",
        options: ["I have a dog", "I has a dog", "I am have a dog"],
        answer: "I have a dog",
        language: "Англійська"
    },
    {
        question: "Як сказати 'Добрий вечір' німецькою?",
        options: ["Guten Morgen", "Guten Abend", "Gute Nacht"],
        answer: "Guten Abend",
        language: "Німецька"
    },
    {
        question: "Що означає слово 'dom' польською?",
        options: ["Будинок", "Місто", "Село"],
        answer: "Будинок",
        language: "Польська"
    },
    {
        question: "Виберіть правильний варіант: 'Вони ___ у парку вчора.'",
        options: ["гуляють", "гуляли", "будуть гуляти"],
        answer: "гуляли",
        language: "Українська"
    },
    {
        question: "Яке слово є антонімом до 'темний'?",
        options: ["чорний", "світлий", "синій"],
        answer: "світлий",
        language: "Українська"
    },
    {
        question: "Яка правильна форма слова у множині: 'дерево'?",
        options: ["дереви", "дерева", "деревище"],
        answer: "дерева",
        language: "Українська"
    },
    {
        question: "Що означає фразеологізм 'вилізти на рожен'?",
        options: ["досягти успіху", "спровокувати конфлікт", "стати лідером"],
        answer: "спровокувати конфлікт",
        language: "Українська"
    }
];

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

export default function GrammarQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const checkAnswer = () => {
        if (!selectedAnswer) {
            alert("Оберіть відповідь!");
            return;
        }

        if (selectedAnswer === currentQuestion.answer) {
            alert("✅ Правильно!");
        } else {
            alert("❌ Неправильно. Правильна відповідь: " + currentQuestion.answer);
        }

        setCurrentQuestion(getRandomQuestion());
        setSelectedAnswer("");
    };

    return (
        <div className="test-section">
            <h2>📝 Тест: Основи граматики</h2>
            <p>{currentQuestion.language}: {currentQuestion.question}</p>
            {currentQuestion.options.map((option, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="quiz"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    {" "}{option}
                    <br />
                </label>
            ))}
            <button onClick={checkAnswer}>Перевірити</button>
        </div>
    );
}
