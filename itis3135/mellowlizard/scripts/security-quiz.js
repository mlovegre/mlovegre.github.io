
"use strict";

// Dynamic Feature 2: Cybersecurity Readiness Quiz.
// Scores five security habits and provides personalized feedback.

document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("security-quiz");
    const resultsSection = document.getElementById("quiz-results");
    const scoreText = document.getElementById("quiz-score");
    const ratingText = document.getElementById("quiz-rating");
    const feedbackText = document.getElementById("quiz-feedback");
    const recommendationsList = document.getElementById(
        "quiz-recommendations"
    );

    const securityRecommendations = [
        "Use a different password for every account. " +
        "Consider using a password manager.",

        "Enable multi-factor authentication, preferably " +
        "using a passkey or authenticator application.",

        "Keep your operating system, browser, and applications " +
        "updated with security patches.",

        "Verify suspicious emails, links, and attachments " +
        "before interacting with them.",

        "Back up important files regularly and keep a " +
        "separate, protected copy."
    ];

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const answers = new FormData(quizForm);
        let score = 0;
        const improvements = [];

        for (let question = 1; question <= 5; question++) {
            const answer = answers.get("question" + question);

            if (answer === "1") {
                score++;
            } else {
                improvements.push(
                    securityRecommendations[question - 1]
                );
            }
        }

        scoreText.textContent =
            "Your Score: " + score + " out of 5";

        if (score <= 2) {
            ratingText.textContent =
                "Readiness Level: Needs Improvement";

            feedbackText.textContent =
                "Your answers suggest several opportunities " +
                "to strengthen your cybersecurity habits.";
        } else if (score <= 4) {
            ratingText.textContent =
                "Readiness Level: Developing";

            feedbackText.textContent =
                "You already practice some important security " +
                "habits, but there are still areas to improve.";
        } else {
            ratingText.textContent =
                "Readiness Level: Strong Habits";

            feedbackText.textContent =
                "Great work! Your answers reflect five " +
                "important cybersecurity practices. " +
                "Continue reviewing your security regularly.";
        }

        // Remove recommendations from the previous quiz attempt.
        recommendationsList.replaceChildren();

        if (improvements.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent =
                "Continue maintaining your current security habits.";
            recommendationsList.appendChild(listItem);
        } else {
            improvements.forEach(function (recommendation) {
                const listItem = document.createElement("li");
                listItem.textContent = recommendation;
                recommendationsList.appendChild(listItem);
            });
        }

        resultsSection.hidden = false;
    });

    // Clear old results whenever the quiz is reset.
    quizForm.addEventListener("reset", function () {
        resultsSection.hidden = true;
        scoreText.textContent = "";
        ratingText.textContent = "";
        feedbackText.textContent = "";
        recommendationsList.replaceChildren();
    });
});
