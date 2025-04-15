import React, { useEffect, useState } from "react";
import ProgressChart from "../components/ProgressChart";
import { Helmet } from "react-helmet";
import Config from "../Config.json";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getProgress, resetUserProgressFromFirestore } from "../services/firestoreService";

const TITLE = "PROGRESS | " + Config.SITE_TITLE;
const DESC = "Відстежуйте свій прогрес у вивченні мов з Easy Language.";
const CANONICAL = Config.SITE_DOMAIN + "/progress";

const languages = [
  { key: "english", label: "Англійська" },
  { key: "german", label: "Німецька" },
  { key: "polish", label: "Польська" },
  { key: "ukrainian", label: "Українська" },
];

const Progress = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);

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

  if (!user) {
    return <h2 style={{ padding: "2rem" }}>⚠️ Увійдіть, щоб переглянути свій прогрес.</h2>;
  }

  const lessonsCompleted = progress[selectedLanguage]
    ? Object.keys(progress[selectedLanguage]).length
    : 0;

  const totalLessons = Object.values(progress).reduce(
    (sum, lang) => sum + Object.keys(lang).length,
    0
  );

  const studyTimeMinutes = lessonsCompleted * 30;
  const hours = Math.floor(studyTimeMinutes / 60);
  const minutes = studyTimeMinutes % 60;

  const resetProgress = async () => {
    if (!user) {
      alert("Спочатку увійдіть у свій акаунт.");
      return;
    }
  
    const confirmed = window.confirm("Ви впевнені, що хочете скинути весь прогрес?");
    if (!confirmed) return;
  
    try {
      await resetUserProgressFromFirestore(user.uid); // Скидаємо в Firestore
      localStorage.removeItem("lessonProgress"); // Можеш також чистити локально
      setProgress({});
      alert("Статистика успішно скинута!");
    } catch (err) {
      alert("Сталася помилка при скиданні: " + err.message);
    }
  };
  

  let level = "A1";
  if (lessonsCompleted >= 1) level = "A2";
  if (lessonsCompleted >= 3) level = "B1";
  if (lessonsCompleted >= 5) level = "B2";
  if (lessonsCompleted >= 8) level = "C1";
  if (lessonsCompleted >= 10) level = "C2";

  const getAchievements = (totalLessons) => {
    const achievements = [];
    if (totalLessons >= 3) achievements.push("🏆 Початківець – Завершено 3 уроки");
    if (totalLessons >= 5) achievements.push("🎯 Середній рівень – 5+ уроків");
    if (totalLessons >= 10) achievements.push("📚 Досвідчений – 10+ уроків");
    if (totalLessons >= 20) achievements.push("💡 Майстер – 20+ уроків");
    if (totalLessons >= 30) achievements.push("🌍 Поліглот – 30+ уроків");
    if (totalLessons >= 40) achievements.push("🚀 Легенда – 40+ уроків");
    return achievements;
  };

  return (
    <main>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
      </Helmet>
      <section className="progress-container">
        <h1>Мій прогрес</h1>

        <div className="language-selector">
          <label htmlFor="language">Оберіть мову:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.key} value={lang.key}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div id="progress-content">
          <div className="stats">
            <h2>Статистика навчання</h2>
            <p>Пройдені уроки: <strong>{lessonsCompleted}</strong></p>
            <p>Час навчання: <strong>{hours} год {minutes} хв</strong></p>
            <p>Рівень володіння: <strong>{level}</strong></p>
          </div>

          <div className="progress-chart">
            <h2>Графік прогресу</h2>
            <ProgressChart progress={progress} />
          </div>

          <div className="achievements">
            <h2>Досягнення</h2>
            <ul>
              {getAchievements(totalLessons).map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
          <div className="reset-progress">
            <button Id="reset-button" onClick={resetProgress}>Скинути статистику</button>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Progress;
