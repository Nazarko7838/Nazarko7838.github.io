document.addEventListener("DOMContentLoaded", function () {
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

    function loadQuestion() {
        const quizContainer = document.querySelector(".quiz");
        quizContainer.innerHTML = "";

        const randomQuestion = getRandomQuestion();
        
        const questionLabel = document.createElement("label");
        questionLabel.textContent = `${randomQuestion.language}: ${randomQuestion.question}`;
        quizContainer.appendChild(questionLabel);

        randomQuestion.options.forEach(option => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.value = option;
            
            const label = document.createElement("label");
            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + option));
            quizContainer.appendChild(label);
            quizContainer.appendChild(document.createElement("br"));
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Перевірити";
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();
            checkAnswer(randomQuestion.answer);
        });

        quizContainer.appendChild(submitButton);
    }

    function checkAnswer(correctAnswer) {
        const selectedOption = document.querySelector("input[name='quiz']:checked");
        if (!selectedOption) {
            alert("Оберіть відповідь!");
            return;
        }

        if (selectedOption.value === correctAnswer) {
            alert("✅ Правильно!");
        } else {
            alert("❌ Неправильно. Правильна відповідь: " + correctAnswer);
        }

        loadQuestion();
    }

    loadQuestion();
});
