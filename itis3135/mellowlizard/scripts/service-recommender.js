
"use strict";

// Dynamic Feature 3: Security Service Recommendation Tool.
// Matches visitor concerns with Mellow Lizard Security services.

document.addEventListener("DOMContentLoaded", function () {
    const recommenderForm = document.getElementById(
        "service-recommender"
    );
    const resultsSection = document.getElementById("service-results");
    const summaryText = document.getElementById("service-summary");
    const serviceList = document.getElementById("service-list");

    // Each concern maps to an existing cybersecurity service.
    const serviceOptions = {
        website: {
            name: "Website Security",
            description:
                "Review website configurations, outdated software, " +
                "and account protections to identify opportunities " +
                "for improving website security."
        },
        network: {
            name: "Network Protection",
            description:
                "Review wireless security, firewall settings, " +
                "and access controls to strengthen network defenses."
        },
        vulnerabilities: {
            name: "Vulnerability Assessments",
            description:
                "Identify potential weaknesses in authorized " +
                "systems and prioritize recommended improvements."
        },
        training: {
            name: "Security Awareness Training",
            description:
                "Learn to recognize phishing attempts, suspicious " +
                "links, and other common cybersecurity threats."
        },
        accounts: {
            name: "Security Awareness Training",
            description:
                "Improve password practices, account protection, " +
                "and understanding of multi-factor authentication."
        }
    };

    recommenderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedConcerns = recommenderForm.querySelectorAll(
            'input[name="concern"]:checked'
        );

        serviceList.replaceChildren();

        if (selectedConcerns.length === 0) {
            summaryText.textContent =
                "Please select at least one cybersecurity concern " +
                "to receive a recommendation.";

            resultsSection.hidden = false;
            return;
        }

        // Prevent duplicate services when concerns overlap.
        const recommendedServices = new Map();

        selectedConcerns.forEach(function (checkbox) {
            const service = serviceOptions[checkbox.value];

            if (service) {
                recommendedServices.set(service.name, service);
            }
        });

        const serviceCount = recommendedServices.size;

        summaryText.textContent =
            "Based on your selections, we recommend " +
            serviceCount +
            (serviceCount === 1 ? " service:" : " services:");

        // Build the recommendations using DOM elements.
        recommendedServices.forEach(function (service) {
            const listItem = document.createElement("li");
            const serviceName = document.createElement("strong");
            const serviceDescription = document.createElement("p");

            serviceName.textContent = service.name;
            serviceDescription.textContent = service.description;

            listItem.appendChild(serviceName);
            listItem.appendChild(serviceDescription);
            serviceList.appendChild(listItem);
        });

        resultsSection.hidden = false;
    });

    // Clear results when selections are reset.
    recommenderForm.addEventListener("reset", function () {
        resultsSection.hidden = true;
        summaryText.textContent = "";
        serviceList.replaceChildren();
    });
});
