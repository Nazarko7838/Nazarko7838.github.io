import React, { useState, useEffect } from "react";
import lessonsData from "../components/LessonsData";
import { Helmet } from "react-helmet";
import Config from "../Config.json";

const TITLE = "LESSONS | " + Config.SITE_TITLE;
const DESC =
  "Вивчайте нові мови з Easy Language! Інтерактивні уроки, відео та аудіо матеріали для всіх рівнів.";
const CANONICAL = Config.SITE_DOMAIN + "/lessons";

const Lessons = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedLevel, setSelectedLevel] = useState("Усі");
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  const levels = ["Усі", "A1", "A2", "B1", "B2", "C1", "C2"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Профіль не знайдено");
          return res.json();
        })
        .then((data) => {
          setUser({ ...data, token });
          fetchCompletedLessons(token);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const fetchCompletedLessons = async (token) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const res = await fetch(`http://localhost:3001/api/lessons?date=${today}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedLessons(data);

        const newProgress = {};
        data.forEach((lesson) => {
          if (!newProgress[lesson.language]) {
            newProgress[lesson.language] = {};
          }
          newProgress[lesson.language][lesson.title] = lesson.date; // <-- зберігаємо дату
        });
        setProgress(newProgress);
      }
    } catch (error) {
      console.error("Помилка отримання пройдених уроків:", error);
    }
  };

  const handleLessonClick = async (lessonTitle) => {
    if (!user || !user.token) {
      alert("Потрібно авторизуватись для збереження прогресу.");
      return;
    }

    const updatedProgress = { ...progress };

    if (!updatedProgress[selectedLanguage]) {
      updatedProgress[selectedLanguage] = {};
    }

    const today = new Date().toISOString().split("T")[0];
    updatedProgress[selectedLanguage][lessonTitle] = today;
    setProgress(updatedProgress);

    try {
      await fetch("http://localhost:3001/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          language: selectedLanguage,
          title: lessonTitle,
        }),
      });

      await fetchCompletedLessons(user.token);
    } catch (error) {
      console.error("Помилка збереження пройденого уроку:", error);
    }
  };

  const filteredLessons = lessonsData[selectedLanguage].lessons.filter((lesson) =>
    selectedLevel === "Усі" ? true : lesson.level === selectedLevel
  );

  const isCompletedToday = (title) => {
    return completedLessons.some(
      (item) => item.language === selectedLanguage && item.title === title
    );
  };

  return (
    <main>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
      </Helmet>

      <div className="language-selection">
        {Object.keys(lessonsData).map((lang) => (
          <button key={lang} onClick={() => setSelectedLanguage(lang)}>
            {lessonsData[lang].title}
          </button>
        ))}
      </div>

      <div className="level-selection">
        <label htmlFor="levelSelect">Рівень складності: </label>
        <select
          id="levelSelect"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <section className="language-section">
        <h1>{lessonsData[selectedLanguage].title}</h1>
        <div className="lesson-grid">
          {filteredLessons.map((lesson, index) => (
            <div className="lesson-card" key={index}>
              <h2>
                {lesson.title}{" "}
                <span style={{ fontSize: "0.8em", color: "gray" }}>
                  ({lesson.level})
                </span>
              </h2>
              {lesson.type === "video" && <video controls src={lesson.src} />}
              {lesson.type === "audio" && <audio controls src={lesson.src} />}
              {lesson.type === "link" && (
                <a href={lesson.src} target="_blank" rel="noreferrer">
                  Перейти
                </a>
              )}
              <button
                className={`progress-button ${
                  progress[selectedLanguage]?.[lesson.title] ? "completed" : ""
                } ${isCompletedToday(lesson.title) ? "today-completed" : ""}`}
                onClick={() => handleLessonClick(lesson.title)}
              >
                {progress[selectedLanguage]?.[lesson.title]
                  ? "Пройдено ✅"
                  : "Пройти урок"}
              </button>

              {/* Дата проходження */}
              {progress[selectedLanguage]?.[lesson.title] && (
                <p className="completion-date">
                  Пройдено: {progress[selectedLanguage][lesson.title]}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Lessons;
