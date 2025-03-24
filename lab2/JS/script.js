const questions = {
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

function loadQuestions() {
    const language = document.getElementById("language-select").value;
    const container = document.getElementById("questions-container");
    container.innerHTML = "";

    questions[language].forEach((q, index) => {
        const label = document.createElement("label");
        label.innerText = (index + 1) + ". " + q.question;

        const select = document.createElement("select");
        select.id = "question" + index;

        q.options.forEach((option, optIndex) => {
            const opt = document.createElement("option");
            opt.value = optIndex;
            opt.innerText = option;
            select.appendChild(opt);
        });

        container.appendChild(label);
        container.appendChild(select);
    });
}

function checkAnswers() {
    const language = document.getElementById("language-select").value;
    let correctAnswers = 0;

    questions[language].forEach((q, index) => {
        if (document.getElementById("question" + index).value == q.correct) {
            correctAnswers++;
        }
    });

    let resultText;
    if (correctAnswers === questions[language].length) {
        resultText = "Ваш рівень: Високий (Advanced)";
    } else if (correctAnswers >= Math.floor(questions[language].length * 0.6)) {
        resultText = "Ваш рівень: Середній (Intermediate)";
    } else {
        resultText = "Ваш рівень: Початковий (Beginner)";
    }

    document.getElementById("quiz-result").innerText = resultText;
}

loadQuestions();