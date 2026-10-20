async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);

    if (!container) {
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Could not load ${filePath}`);
        }

        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
        container.textContent = "This part of the page could not load.";
    }
}

loadComponent("site-header", "components/header.html");
loadComponent("site-footer", "components/footer.html");