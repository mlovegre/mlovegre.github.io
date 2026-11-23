
"use strict";

// Dynamic Feature 1: Interactive Password Strength Checker.
// All password checks happen locally in the browser.

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password-input");
    const strengthText = document.getElementById("password-strength");
    const strengthMeter = document.getElementById("strength-meter");
    const feedbackText = document.getElementById("password-feedback");
    const toggleButton = document.getElementById("toggle-password");

    // Check password strength whenever the user types.
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;

        if (password.length === 0) {
            strengthText.textContent = "Password Strength: Not Entered";
            strengthMeter.value = 0;
            feedbackText.textContent =
                "Enter a sample password to receive security suggestions.";
            return;
        }

        let score = 0;
        const suggestions = [];

        if (password.length >= 12) {
            score++;
        } else {
            suggestions.push("Use at least 12 characters.");
        }

        if (password.length >= 16) {
            score++;
        } else {
            suggestions.push("Consider using 16 or more characters.");
        }

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            score++;
        } else {
            suggestions.push("Try mixing uppercase and lowercase letters.");
        }

        if (/\d/.test(password)) {
            score++;
        } else {
            suggestions.push("Try including a number.");
        }

        if (/[^a-zA-Z0-9]/.test(password)) {
            score++;
        } else {
            suggestions.push("Try including a special character.");
        }

        strengthMeter.value = score;

        let strength;

        if (score <= 2) {
            strength = "Weak";
        } else if (score <= 4) {
            strength = "Moderate";
        } else {
            strength = "Strong";
        }

        strengthText.textContent = "Password Strength: " + strength;

        if (suggestions.length === 0) {
            feedbackText.textContent =
                "Good job! This sample meets all five checks. " +
                "Remember to use unique passwords for every account.";
        } else {
            feedbackText.textContent = suggestions.join(" ");
        }
    });

    // Allow users to show or hide their sample password.
    toggleButton.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleButton.textContent = "Hide Password";
        } else {
            passwordInput.type = "password";
            toggleButton.textContent = "Show Password";
        }
    });
});
