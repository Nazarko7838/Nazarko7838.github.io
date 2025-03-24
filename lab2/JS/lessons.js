document.addEventListener("DOMContentLoaded", function () {
    showLessons('english'); // Відкрити англійську мову за замовчуванням
});

function showLessons(language) {
    // Ховаємо всі секції
    document.querySelectorAll('.language-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Показуємо вибрану мову
    document.getElementById(language).classList.remove('hidden');
}

