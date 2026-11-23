
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introduction-form");
    const content = document.getElementById("introduction-content");
    const coursesContainer = document.getElementById("courses-container");
    const linksContainer = document.getElementById("footer-links-container");

    const defaultCourses = [
        {
            department: "ITIS",
            courseNumber: "3135",
            courseTitle: "Front End Web Development",
            reasonForTaking: "I have little experience with developing working applications at this time and took this class to get more experience with it."
        },
        {
            department: "ITIS",
            courseNumber: "3200",
            courseTitle: "Intro to Info Security & Priv",
            reasonForTaking: "I took this class because I have an interest with Cyber Security as it is my concentration."
        },
        {
            department: "ITSC",
            courseNumber: "2175",
            courseTitle: "Logic and Algorithms",
            reasonForTaking: "I took this class because my major required it."
        },
        {
            department: "MATH",
            courseNumber: "1241",
            courseTitle: "Calculus II",
            reasonForTaking: "My major requires this class."
        }
    ];

    const defaultLinks = [
        {
            label: "CLT Web",
            url: "https://webpages.charlotte.edu/mlovegre/"
        },
        {
            label: "GitHub Pages",
            url: ""
        },
        {
            label: "GitHub",
            url: ""
        },
        {
            label: "freeCodeCamp",
            url: ""
        },
        {
            label: "LinkedIn",
            url: ""
        }
    ];

    let uploadedImage = "";

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function addCourse(course = {}) {
        const courseGroup = document.createElement("fieldset");
        courseGroup.className = "course-entry";

        const legend = document.createElement("legend");
        legend.textContent = "Course";
        courseGroup.appendChild(legend);

        const fields = [
            ["department", "Department", "ITIS"],
            ["courseNumber", "Course Number", "3135"],
            ["courseTitle", "Course Name", "Course title"],
            ["reasonForTaking", "Reason for Taking", "Reason"]
        ];

        fields.forEach(function (field) {
            const label = document.createElement("label");
            label.textContent = field[1];

            const input = field[0] === "reasonForTaking"
                ? document.createElement("textarea")
                : document.createElement("input");

            input.className = field[0];
            input.value = course[field[0]] || "";
            input.placeholder = field[2];
            input.required = true;

            courseGroup.append(label, input);
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove Course";

        removeButton.addEventListener("click", function () {
            courseGroup.remove();
        });

        courseGroup.appendChild(removeButton);
        coursesContainer.appendChild(courseGroup);
    }

    function createFooterLinks() {
        linksContainer.replaceChildren();

        defaultLinks.forEach(function (link, index) {
            const group = document.createElement("fieldset");
            group.className = "footer-link-entry";

            const legend = document.createElement("legend");
            legend.textContent = "Link " + (index + 1);
            group.appendChild(legend);

            const label = document.createElement("label");
            label.textContent = "Link Label:";

            const labelInput = document.createElement("input");
            labelInput.className = "link-label";
            labelInput.value = link.label;
            labelInput.placeholder = "Website name";

            const urlLabel = document.createElement("label");
            urlLabel.textContent = "Website URL:";

            const urlInput = document.createElement("input");
            urlInput.type = "url";
            urlInput.className = "link-url";
            urlInput.value = link.url;
            urlInput.placeholder = "https://example.com";

            group.append(label, labelInput, urlLabel, urlInput);
            linksContainer.appendChild(group);
        });
    }

    defaultCourses.forEach(addCourse);
    createFooterLinks();

    document.getElementById("add-course").addEventListener(
        "click",
        function () {
            addCourse();
        }
    );

    document.getElementById("picture").addEventListener(
        "change",
        function (event) {
            const file = event.target.files[0];

            if (!file) {
                uploadedImage = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                event.target.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {
                uploadedImage = reader.result;
            };

            reader.readAsDataURL(file);
        }
    );

    function field(name) {
        return document.getElementById(name).value.trim();
    }

    function collectData() {
        const courses = Array.from(
            document.querySelectorAll(".course-entry")
        ).map(function (entry) {
            return {
                department: entry.querySelector(".department").value.trim(),
                courseNumber: entry.querySelector(".courseNumber").value.trim(),
                courseTitle: entry.querySelector(".courseTitle").value.trim(),
                reasonForTaking: entry.querySelector(".reasonForTaking").value.trim()
            };
        });

        const footerLinks = Array.from(
            document.querySelectorAll(".footer-link-entry")
        ).map(function (entry) {
            return {
                label: entry.querySelector(".link-label").value.trim(),
                url: entry.querySelector(".link-url").value.trim()
            };
        });

        return {
            firstName: field("firstName"),
            middleName: field("middleName"),
            nickname: field("nickname"),
            lastName: field("lastName"),
            acknowledgment: field("acknowledgment"),
            acknowledgmentDate: field("acknowledgmentDate"),
            prettyNameDivider: field("prettyNameDivider"),
            adjectives: field("adjectives"),
            animal: field("animal"),
            img: uploadedImage || "images/introduction-picture.png",
            pictureAlt: field("pictureAlt"),
            caption: field("caption"),
            personalInfo: {
                statement: field("statement"),
                personalBackground: field("personalBackground"),
                professionalBackground: field("professionalBackground"),
                academicBackground: field("academicBackground"),
                primaryWorkComputer: field("primaryWorkComputer"),
                primaryWorkLocation: field("primaryWorkLocation"),
                alternateComputerLocation: field("alternateComputerLocation")
            },
            courses: courses,
            quote: field("quote"),
            quoteAuthor: field("quoteAuthor"),
            funnyItem: field("funnyItem"),
            somethingToShare: field("somethingToShare"),
            footerLinks: footerLinks
        };
    }

    function generateHTML(data) {
        const safe = escapeHTML;

        const displayName = [
            data.firstName,
            data.middleName,
            data.lastName
        ].filter(Boolean).join(" ");

        const backgrounds = [
            ["Personal Background", data.personalInfo.personalBackground],
            ["Professional Background", data.personalInfo.professionalBackground],
            ["Academic Background", data.personalInfo.academicBackground],
            ["Primary Work Computer", data.personalInfo.primaryWorkComputer],
            ["Primary Work Location", data.personalInfo.primaryWorkLocation],
            ["Alternate Computer & Location", data.personalInfo.alternateComputerLocation]
        ];

        const bullets = backgrounds.map(function (item) {
            return "<li><strong>" + safe(item[0]) + ":</strong> " +
                safe(item[1]) + "</li>";
        }).join("\n");

        const courseItems = data.courses.map(function (course) {
            return "<li>" +
                safe(course.department) + " " +
                safe(course.courseNumber) + " - " +
                safe(course.courseTitle) + ": " +
                safe(course.reasonForTaking) +
                "</li>";
        }).join("\n");

        const extraItems = [
            data.funnyItem
                ? "<li><strong>Funny/Interesting Thing to Remember Me By:</strong> " +
                    safe(data.funnyItem) + "</li>"
                : "",
            data.somethingToShare
                ? "<li><strong>Something I Would Like to Share:</strong> " +
                    safe(data.somethingToShare) + "</li>"
                : ""
        ].filter(Boolean).join("\n");

        const footerLinks = data.footerLinks.filter(function (link) {
            return link.label && link.url;
        }).map(function (link) {
            return '<a href="' + safe(link.url) + '">' +
                safe(link.label) + "</a>";
        }).join(" | ");

        return `
<!-- This class styles the introduction display name. -->
<h6 class="introduction-name">
    ${safe(displayName)} ${safe(data.prettyNameDivider)}
    ${safe(data.adjectives)} ${safe(data.animal)}
</h6>

<figure>
    <img src="${safe(data.img)}"
         alt="${safe(data.pictureAlt)}"
         width="400">
    <figcaption>${safe(data.caption)}</figcaption>
</figure>

<p>${safe(data.personalInfo.statement)}</p>

<ul>
    ${bullets}

    <li>
        <strong>Courses I'm Taking, &amp; Why:</strong>
        <ol>
            ${courseItems}
        </ol>
    </li>

    ${extraItems}
</ul>

<blockquote>
    <p>“${safe(data.quote)}”</p>
    <p>~ ${safe(data.quoteAuthor)}</p>
</blockquote>

${footerLinks ? `<p>${footerLinks}</p>` : ""}

<p>
    <small>
        Acknowledged on ${safe(data.acknowledgmentDate)}:
        ${safe(data.acknowledgment)}
    </small>
</p>`;
    }

    function toXML(value, tag) {
        if (Array.isArray(value)) {
            const itemTag = tag === "courses"
                ? "course"
                : tag === "footerLinks"
                    ? "link"
                    : "item";

            return `<${tag}>
${value.map(function (item) {
    return toXML(item, itemTag);
}).join("\n")}
</${tag}>`;
        }

        if (value !== null && typeof value === "object") {
            const children = Object.entries(value).map(function (entry) {
                return toXML(entry[1], entry[0]);
            }).join("\n");

            return `<${tag}>
${children}
</${tag}>`;
        }

        const text = value === null || value === undefined
            ? ""
            : value;

        return `<${tag}>${escapeHTML(text)}</${tag}>`;
    }

    function showCode(format) {
        const data = collectData();
        let code = "";

        if (format === "HTML") {
            code = generateHTML(data).trim();
        } else if (format === "JSON") {
            code = JSON.stringify(data, null, 2);
        } else {
            code = '<?xml version="1.0" encoding="UTF-8"?>\n';
            code += toXML(data, "introduction");
        }

        const output = document.getElementById("generated-output");

        document.getElementById("output-heading").textContent =
            "Generated " + format;

        document.getElementById("output-code").value = code;
        output.hidden = false;
    }

    document.getElementById("generate-html").addEventListener(
        "click",
        function () {
            showCode("HTML");
        }
    );

    document.getElementById("generate-json").addEventListener(
        "click",
        function () {
            showCode("JSON");
        }
    );

    document.getElementById("generate-xml").addEventListener(
        "click",
        function () {
            showCode("XML");
        }
    );

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const data = collectData();

        // The h2 already exists in introduction_form.html.
        // Do not generate another h2 here.
        content.innerHTML = generateHTML(data);

        const restart = document.createElement("button");
        restart.type = "button";
        restart.textContent = "Return to Form";

        restart.addEventListener("click", function () {
            window.location.reload();
        });

        content.appendChild(restart);
    });

    form.addEventListener("reset", function () {
        uploadedImage = "";

        setTimeout(function () {
            coursesContainer.replaceChildren();
            defaultCourses.forEach(addCourse);
            createFooterLinks();

            document.getElementById("generated-output").hidden = true;
        }, 0);
    });

    document.getElementById("clear-form").addEventListener(
        "click",
        function () {
            form.querySelectorAll("input, textarea").forEach(function (input) {
                input.value = "";
            });

            uploadedImage = "";
            coursesContainer.replaceChildren();

            document.getElementById("generated-output").hidden = true;
        }
    );
});
