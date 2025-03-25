document.addEventListener("DOMContentLoaded", function () {
    showLessons('english'); // Відкрити англійську мову за замовчуванням
    loadProgress(); // Завантажити прогрес уроків
});

function showLessons(language) {
    document.querySelectorAll('.language-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(language).classList.remove('hidden');
    loadProgress(language);
}

function loadProgress(language = 'english') {
    let progress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
    let languageProgress = progress[language] || {};

    document.querySelectorAll(`#${language} .lesson-card`).forEach(card => {
        let lessonTitle = card.querySelector('h2').textContent;
        let button = card.querySelector('.progress-button');

        if (languageProgress[lessonTitle]) {
            button.textContent = "Пройдено ✅";
            button.classList.add("completed");
        }

        button.onclick = function () {
            languageProgress[lessonTitle] = true;
            progress[language] = languageProgress;
            localStorage.setItem('lessonProgress', JSON.stringify(progress));
            button.textContent = "Пройдено ✅";
            button.classList.add("completed");
            updateProgressPage();
        };
    });
}

