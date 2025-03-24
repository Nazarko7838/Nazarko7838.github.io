function checkAnswers() {
    let correctAnswers = 0;
    if (document.getElementById("question1").value === "correct") correctAnswers++;
    if (document.getElementById("question2").value === "correct") correctAnswers++;

    document.getElementById("quiz-result").innerText = 
        correctAnswers === 2 ? "Вітаємо! Ви відповіли правильно!" : "Спробуйте ще раз!";
}