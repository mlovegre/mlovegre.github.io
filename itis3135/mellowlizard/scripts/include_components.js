
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    async function loadComponent(file, elementId) {
        const container = document.getElementById(elementId);

        if (!container) {
            return;
        }

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error("Unable to load " + file);
            }

            container.innerHTML = await response.text();
        } catch (error) {
            container.textContent = "Unable to load page component.";
        }
    }

    async function loadComponents() {
        await Promise.all([
            loadComponent("components/header.html", "site-header"),
            loadComponent("components/footer.html", "site-footer")
        ]);
    }

    loadComponents();
});
