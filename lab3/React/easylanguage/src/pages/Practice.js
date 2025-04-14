import React from "react";
import GrammarQuiz from "../components/GrammarQuiz";
import ChatBot from "../components/ChatBot";
import { Helmet } from 'react-helmet';
import Config from '../Config.json';

const TITLE = "PRACTICE | " + Config.SITE_TITLE;
const DESC = "Інтерактивні вправи для покращення навичок!";
const CANONICAL = Config.SITE_DOMAIN + "/practice";

function Practice() {
    return (
        <main>
            <Helmet>
                <title>{TITLE}</title>
                <link rel="canonical" href={CANONICAL} />
                <meta name="description" content={DESC} />
            </Helmet>
            <section className="practice-container">
                <h1>Практика</h1>
                <p>Інтерактивні вправи для покращення навичок!</p>

                <GrammarQuiz />
                <ChatBot />
            </section>
        </main>
    );
}

export default Practice;
