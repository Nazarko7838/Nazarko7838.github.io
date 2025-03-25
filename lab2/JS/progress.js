document.addEventListener("DOMContentLoaded", () => {
    updateProgress();
    renderChart();
});

document.getElementById("language").addEventListener("change", updateProgress);
document.getElementById("reset-button").addEventListener("click", resetProgress);

let progressChart;

function updateProgress() {
    let selectedLanguage = document.getElementById("language").value;
    let progress = JSON.parse(localStorage.getItem('lessonProgress')) || {};

    // Підрахунок уроків для вибраної мови
    let lessonsCompleted = progress[selectedLanguage] ? Object.keys(progress[selectedLanguage]).length : 0;
    document.getElementById("lessons-completed").textContent = lessonsCompleted;

    // Загальна кількість уроків (усі мови)
    let totalLessons = Object.values(progress).reduce((sum, lang) => sum + Object.keys(lang).length, 0);

    // Розрахунок часу навчання (1 урок ≈ 30 хв)
    let studyTimeMinutes = lessonsCompleted * 30;
    let hours = Math.floor(studyTimeMinutes / 60);
    let minutes = studyTimeMinutes % 60;
    document.getElementById("study-time").textContent = `${hours} год ${minutes} хв`;

    // Визначення рівня для обраної мови
    let level = "A1";
    if (lessonsCompleted >= 1) level = "A2";
    if (lessonsCompleted >= 3) level = "B1";
    if (lessonsCompleted >= 5) level = "B2";
    if (lessonsCompleted >= 8) level = "C1";
    if (lessonsCompleted >= 10) level = "C2";
    document.getElementById("proficiency-level").textContent = level;

    // Визначення досягнень
    let achievements = [];
    if (totalLessons >= 3) achievements.push("🏆 Початківець – Завершено 3 уроки");
    if (totalLessons >= 5) achievements.push("🎯 Середній рівень – 5+ уроків");
    if (totalLessons >= 10) achievements.push("📚 Досвідчений – 10+ уроків");
    if (totalLessons >= 20) achievements.push("💡 Майстер – 20+ уроків");
    if (totalLessons >= 30) achievements.push("🌍 Поліглот – 30+ уроків");
    if (totalLessons >= 40) achievements.push("🚀 Легенда – 40+ уроків");

    // Вивід досягнень
    let achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = "";
    achievements.forEach(ach => {
        let li = document.createElement("li");
        li.textContent = ach;
        achievementsList.appendChild(li);
    });

    // Оновлення графіка
    renderChart();
}

function renderChart() {
    let progress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
    let languages = ["english", "german", "polish", "ukrainian"];
    let labels = ["Англійська", "Німецька", "Польська", "Українська"];
    let data = languages.map(lang => (progress[lang] ? Object.keys(progress[lang]).length : 0));

    let ctx = document.getElementById("progressChart").getContext("2d");

    // Якщо графік вже створений – оновлюємо дані
    if (progressChart) {
        progressChart.data.datasets[0].data = data;
        progressChart.update();
        return;
    }

    // Створення нового графіка
    progressChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Пройдені уроки",
                data: data,
                backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
                borderColor: "#000",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function resetProgress() {
    if (confirm("Ви впевнені, що хочете скинути весь прогрес?")) {
        localStorage.removeItem("lessonProgress");
        updateProgress();
        alert("Статистика успішно скинута!");
    }
}
