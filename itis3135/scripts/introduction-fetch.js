
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const apiURL = "https://intro-form.tommyhost.ing/";
    const container = document.getElementById("yearbook-container");
    const status = document.getElementById("yearbook-status");

    if (!container || !status) {
        return;
    }

    function getText(value, fallback) {
        if (typeof value === "string" && value.trim() !== "") {
            return value.trim();
        }

        return fallback;
    }

    function createTextElement(tag, text, className) {
        const element = document.createElement(tag);
        element.textContent = text;

        if (className) {
            element.className = className;
        }

        return element;
    }

    function getImageURL(imagePath, record) {
        if (typeof imagePath !== "string" || !imagePath.trim()) {
            return "";
        }

        const path = imagePath.trim();

        if (path.indexOf("data:image/") === 0) {
            return path;
        }

        if (path.indexOf("https://") === 0 ||
            path.indexOf("http://") === 0) {
            return path;
        }

        if (record.jsonUrl) {
            try {
                return new URL(path, record.jsonUrl).href;
            } catch (error) {
                return "";
            }
        }

        return "";
    }

    function createStudentCard(username, record) {
        const data = record.introductionData;

        if (!data || typeof data !== "object") {
            return null;
        }

        const firstName = getText(data.firstName, "");
        const middleName = getText(data.middleName, "");
        const lastName = getText(data.lastName, "");

        const fullName = [
            firstName,
            middleName,
            lastName
        ].filter(Boolean).join(" ");

        const name = fullName || username;

        const adjective = getText(data.adjectives, "");
        const animal = getText(data.animal, "");

        const mascot = [adjective, animal]
            .filter(Boolean)
            .join(" ") || "Mascot not provided";

        const quote = getText(
            data.quote,
            "No favorite quote provided."
        );

        const quoteAuthor = getText(data.quoteAuthor, "");

        const academic = data.personalInfo
            ? getText(
                data.personalInfo.academicBackground,
                "Academic background not provided."
            )
            : "Academic background not provided.";

        const card = document.createElement("article");
        card.className = "yearbook-card";

        const imageArea = document.createElement("figure");
        imageArea.className = "yearbook-photo";

        const imageURL = getImageURL(data.img, record);

        if (imageURL) {
            const picture = document.createElement("img");
            picture.src = imageURL;
            picture.alt = getText(
                data.pictureAlt,
                "Introduction photograph of " + name
            );
            picture.loading = "lazy";

            picture.addEventListener("error", function () {
                picture.remove();

                const unavailable = createTextElement(
                    "p",
                    "Photograph unavailable",
                    "yearbook-placeholder"
                );

                imageArea.prepend(unavailable);
            });

            imageArea.appendChild(picture);
        } else {
            imageArea.appendChild(
                createTextElement(
                    "p",
                    "No photograph available",
                    "yearbook-placeholder"
                )
            );
        }

        imageArea.appendChild(
            createTextElement("figcaption", name)
        );

        card.appendChild(imageArea);

        card.appendChild(
            createTextElement("h4", name, "yearbook-name")
        );

        card.appendChild(
            createTextElement(
                "p",
                "Mascot: " + mascot,
                "yearbook-mascot"
            )
        );

        const quoteBlock = document.createElement("blockquote");
        quoteBlock.className = "yearbook-quote";

        quoteBlock.appendChild(
            createTextElement("p", "“" + quote + "”")
        );

        if (quoteAuthor) {
            quoteBlock.appendChild(
                createTextElement("p", "— " + quoteAuthor)
            );
        }

        card.appendChild(quoteBlock);

        const academicHeading = createTextElement(
            "h5",
            "Academic Background"
        );

        card.appendChild(academicHeading);

        card.appendChild(
            createTextElement(
                "p",
                academic,
                "yearbook-academic"
            )
        );

        return card;
    }

    async function loadYearbook() {
        status.textContent = "Loading student introductions...";

        try {
            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error("Unable to retrieve introductions.");
            }

            const introductions = await response.json();

            if (!introductions ||
                typeof introductions !== "object") {
                throw new Error("Invalid introduction data.");
            }

            container.replaceChildren();

            const usernames = Object.keys(introductions)
                .filter(function (username) {
                    return introductions[username] &&
                        introductions[username].introductionData;
                })
                .sort(function (a, b) {
                    return a.localeCompare(b);
                });

            let count = 0;

            usernames.forEach(function (username) {
                const card = createStudentCard(
                    username,
                    introductions[username]
                );

                if (card) {
                    container.appendChild(card);
                    count += 1;
                }
            });

            if (count === 0) {
                status.textContent =
                    "No student introductions are available yet.";
            } else {
                status.textContent =
                    "Displaying " + count +
                    " student introduction" +
                    (count === 1 ? "." : "s.");
            }
        } catch (error) {
            status.textContent =
                "The class yearbook could not be loaded. " +
                "Please try again later.";
        }
    }

    loadYearbook();
});
