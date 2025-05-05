import React, { useState } from "react";

const questionsData = {
    english: [
        { question: "Choose the correct past simple form: 'I ____ to the store yesterday.'", options: ["go", "went", "gone"], correct: 1 },
        { question: "Which word is an adjective?", options: ["Quickly", "Beautiful", "Running"], correct: 1 },
        { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes"], correct: 1 },
        { question: "Which sentence is correct?", options: ["He go to school", "He goes to school", "He going to school"], correct: 1 },
        { question: "What is the synonym for 'happy'?", options: ["Sad", "Excited", "Angry"], correct: 1 }
    ],
    german: [
        { question: "Wählen Sie die richtige Konjugation: 'Ich ____ ein Buch.'", options: ["lesen", "lese", "liest"], correct: 1 },
        { question: "Was ist das Gegenteil von 'groß'?", options: ["klein", "lang", "dick"], correct: 0 },
        { question: "Welches Wort ist ein Pronomen?", options: ["Haus", "Er", "Morgen"], correct: 1 },
        { question: "Welche Präposition ist korrekt? 'Ich war ____ Kino.'", options: ["in", "auf", "bei"], correct: 0 },
        { question: "Wählen Sie das richtige Wort: 'Der Hund ____ laut.'", options: ["bellt", "bellst", "bellen"], correct: 0 }
    ],
    polish: [
        { question: "Który czasownik oznacza 'mówić'?", options: ["Czytać", "Mówić", "Pisać"], correct: 1 },
        { question: "Jaki jest poprawny rodzajnik dla słowa 'dziecko'?", options: ["ten", "ta", "to"], correct: 2 },
        { question: "Jaka jest poprawna forma liczby mnogiej dla 'kot'?", options: ["Koty", "Koti", "Kotowie"], correct: 0 },
        { question: "Które zdanie jest poprawne?", options: ["On mieć książkę", "On ma książkę", "On ma książki"], correct: 1 },
        { question: "Jaki jest synonim słowa 'duży'?", options: ["Mały", "Wielki", "Cichy"], correct: 1 }
    ],
    ukrainian: [
        { question: "Який правильний варіант минулого часу: 'Він ____ листа.'", options: ["пише", "написав", "пишив"], correct: 1 },
        { question: "Що таке прикметник?", options: ["Дія", "Ознака предмета", "Назва предмета"], correct: 1 },
        { question: "Яке слово є дієсловом?", options: ["Читати", "Книга", "Учень"], correct: 0 },
        { question: "Яка правильна форма множини для 'стіл'?", options: ["Стіли", "Стола", "Столи"], correct: 2 },
        { question: "Яке слово є антонімом до 'високий'?", options: ["Низький", "Гарний", "Темний"], correct: 0 }
    ]
};

const Quiz = () => {
    const [language, setLanguage] = useState("english");
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState("");

    const handleSelectChange = (event) => {
        setLanguage(event.target.value);
        setAnswers({});
        setResult("");
    };

    const handleAnswerChange = (questionIndex, optionIndex) => {
        setAnswers({ ...answers, [questionIndex]: optionIndex });
    };

    const checkAnswers = () => {
        const correctAnswers = questionsData[language].filter(
            (q, index) => answers[index] === q.correct
        ).length;

        const totalQuestions = questionsData[language].length;

        if (correctAnswers === totalQuestions) {
            setResult("Ваш рівень: Високий (Advanced)");
        } else if (correctAnswers >= Math.floor(totalQuestions * 0.6)) {
            setResult("Ваш рівень: Середній (Intermediate)");
        } else {
            setResult("Ваш рівень: Початковий (Beginner)");
        }
    };

    return (
        <section className="quiz">
            <h2>Дізнайтеся свій рівень знань</h2>
            <p>Пройдіть тест та визначте свій рівень володіння мовою!</p>

            <div className="quiz-controls">
                <label htmlFor="language-select">Оберіть мову тесту:</label>
                <select id="language-select" value={language} onChange={handleSelectChange}>
                    <option value="english">Англійська</option>
                    <option value="german">Німецька</option>
                    <option value="polish">Польська</option>
                    <option value="ukrainian">Українська</option>
                </select>
            </div>

            <form id="language-test">
                {questionsData[language].map((q, index) => (
                    <div key={index} className="question">
                        <p>{index + 1}. {q.question}</p>
                        <select onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}>
                            <option value="">Виберіть відповідь</option>
                            {q.options.map((option, optIndex) => (
                                <option key={optIndex} value={optIndex}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <button type="button" className="btn" onClick={checkAnswers}>Перевірити</button>
                <p id="quiz-result">{result}</p>
            </form>
        </section>
    );
};

export default Quiz;
