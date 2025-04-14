import React from 'react';
import Quiz from '../components/Quiz';
import {Helmet} from 'react-helmet';
import Config from '../Config.json';

const TITLE = "HOME | " + Config.SITE_TITLE;
const DESC = "Легке та ефективне вивчення мов. Інтерактивні уроки, практика вимови, тести та персоналізовані плани навчання – усе це допоможе вам заговорити швидше.";
const CANONICAL = Config.SITE_DOMAIN + "/";

class Home extends React.Component {
    render() {
        return (
            <main>
                <Helmet>
                    <title>{TITLE}</title>
                    <link rel="canonical" href={CANONICAL} />
                    <meta name="description" content={DESC} />
                </Helmet>
                <section class="hero">
                    <div class="hero-content">
                        <h2>Легке та ефективне вивчення мов</h2>
                        <p>Вивчайте нові мови весело та легко! Інтерактивні уроки, практика вимови, тести та персоналізовані плани навчання – усе це допоможе вам заговорити швидше.</p>
                        <a href="html/lessons.html" class="btn"><b>Почати зараз</b></a>
                    </div>
                </section>

                <section class="features">
                    <h2>Що ми пропонуємо?</h2>
                    <div class="feature-container">
                        <div class="feature">
                            <img src="./images/lesson-icon.png" alt="Іконка уроків" />
                            <h3>Інтерактивні уроки</h3>
                            <p>Покрокові уроки з граматики, лексики та аудіювання для всіх рівнів.</p>
                        </div>
                        <div class="feature">
                            <img src="./images/practice-icon.png" alt="Іконка практики" />
                            <h3>Жива практика</h3>
                            <p>Спілкуйтеся з носіями мови та беріть участь у розмовних клубах.</p>
                        </div>
                        <div class="feature">
                            <img src="./images/progress-icon.png" alt="Іконка прогресу" />
                            <h3>Персональний прогрес</h3>
                            <p>Відстежуйте свої досягнення та отримуйте рекомендації для покращення.</p>
                        </div>
                    </div>
                </section>

                <Quiz />

                <section class="testimonials">
                    <h2>Що кажуть наші користувачі?</h2>
                    <div class="testimonial">
                        <p>“Завдяки Easy Лангуаге я нарешті почав говорити англійською! Дякую за цікаві уроки!”</p>
                        <span>- Олександр, 25 років</span>
                    </div>
                    <div class="testimonial">
                        <p>“Дуже подобається практика з носіями мови! Це робить навчання живим та веселим.”</p>
                        <span>- Марія, 30 років</span>
                    </div>
                    <div class="testimonial">
                        <p>“План навчання адаптований до моїх потреб, і я бачу прогрес вже після кількох тижнів!”</p>
                        <span>- Андрій, 35 років</span>
                    </div>
                    <div class="testimonial">
                        <p>“Найкращий сайт для вивчення мов! Легко та зручно вивчати нові слова і граматику.”</p>
                        <span>- Олена, 28 років</span>
                    </div>
                </section>
            </main>
        );
    }
}

export default Home;