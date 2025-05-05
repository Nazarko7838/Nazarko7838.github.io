import React, { useState, useEffect } from "react";

const responses = {
    "привіт": ["Привіт! Як справи? 😊", "Вітаю! Чим можу допомогти?", "Привіт! Готовий до навчання?"],
    "як справи": ["У мене все чудово! А у тебе? 😃", "Дякую, що запитав! Як твій день?", "Все добре! Чим займаєшся?"],
    "дякую": ["Будь ласка! Радій навчанню! 😍", "Завжди радий допомогти!", "Нема за що!"],
    "що ти вмієш": ["Я можу допомогти з граматикою, перекладом та відповідями на питання. Спробуй запитати!"],
    "англійська граматика": ["Що саме тебе цікавить у граматиці? Часи, артиклі, модальні дієслова?"],
    "німецька граматика": ["Ich kann dir helfen! Напиши питання, і я допоможу!"],
    "польська граматика": ["Chcesz się nauczyć gramatyki? Napisz mi pytanie! 😊"],
    "українська граматика": ["Запитуй, що цікавить!"],
    "як сказати": ["Який саме вислів ти хочеш перекласти?", "Напиши фразу, і я допоможу її перекласти!"],
    "до побачення": ["До зустрічі! Успіхів у навчанні!", "Бувай! Не забувай практикуватися!"],
};

export default function ChatBot() {
    const [messages, setMessages] = useState([
        { text: "Привіт! Я твій мовний помічник. Запитай мене про граматику, переклад або просто поспілкуйся! 😊", sender: "bot" }
    ]);
    const [input, setInput] = useState("");

    const getResponse = (userMessage) => {
        userMessage = userMessage.toLowerCase();

        for (let key in responses) {
            if (userMessage.includes(key)) {
                const possibleResponses = responses[key];
                return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
            }
        }

        return "Я поки що цього не знаю, але навчаюсь! 🤖 Спробуй запитати інакше.";
    };

    const handleSend = () => {
        if (input.trim() === "") return;

        const userMsg = { text: input, sender: "user" };
        const botMsg = { text: getResponse(input), sender: "bot" };

        setMessages([...messages, userMsg, botMsg]);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="chatbot-section">
            <h2>💬 Діалог з чат-ботом</h2>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Введіть відповідь..."
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button className="chat-send" onClick={handleSend}>Надіслати</button>
        </div>
    );
}
