import React, { useState, useEffect } from "react";
import lessonsData from "../components/LessonsData";
import { Helmet } from "react-helmet";
import Config from "../Config.json";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveProgress, getProgress } from "../services/firestoreService";

const TITLE = "LESSONS | " + Config.SITE_TITLE;
const DESC = "Вивчайте нові мови з Easy Language! Інтерактивні уроки, відео та аудіо матеріали для всіх рівнів.";
const CANONICAL = Config.SITE_DOMAIN + "/lessons";

const Lessons = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedLevel, setSelectedLevel] = useState("Усі");
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);

  const levels = ["Усі", "A1", "A2", "B1", "B2", "C1", "C2"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const data = await getProgress(user.uid);
        if (data) {
          setProgress(data);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLessonClick = async (lessonTitle) => {
    if (!user) {
      alert("Потрібно авторизуватись для збереження прогресу.");
      return;
    }

    const updatedProgress = { ...progress };

    if (!updatedProgress[selectedLanguage]) {
      updatedProgress[selectedLanguage] = {};
    }

    updatedProgress[selectedLanguage][lessonTitle] = true;
    setProgress(updatedProgress);

    await saveProgress(user.uid, updatedProgress);
  };

  const filteredLessons = lessonsData[selectedLanguage].lessons.filter((lesson) =>
    selectedLevel === "Усі" ? true : lesson.level === selectedLevel
  );

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
                <span style={{ fontSize: "0.8em", color: "gray" }}>({lesson.level})</span>
              </h2>
              {lesson.type === "video" && <video controls src={lesson.src} />}
              {lesson.type === "audio" && <audio controls src={lesson.src} />}
              {lesson.type === "link" && (
                <a href={lesson.src} target="_blank" rel="noreferrer">
                  Перейти
                </a>
              )}
              <button
                className={`progress-button ${progress[selectedLanguage]?.[lesson.title] ? "completed" : ""}`}
                onClick={() => handleLessonClick(lesson.title)}
              >
                {progress[selectedLanguage]?.[lesson.title] ? "Пройдено ✅" : "Пройти урок"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Lessons;
