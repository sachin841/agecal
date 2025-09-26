const fs = require('fs');
const path = require('path');

const startYear = 1925;
const endYear = 2025;
const directoryPath = "new agecal";

// Read the index.html content to use as a template
let templateHtml;
try {
    templateHtml = fs.readFileSync(path.join(directoryPath, "index.html"), "utf8");
} catch (err) {
    console.error("Error reading index.html template: " + err.message);
    process.exit(1);
}

// Generate individual year pages
const generatedPageLinks = [];
for (let year = startYear; year <= endYear; year++) {
    const filename = `age-${year}.html`;
    const filePath = path.join(directoryPath, filename);
    const dobValue = `${year}-01-01`; // Assuming Jan 1st for pre-fill

    let pageContent = templateHtml;

    // Update title
    pageContent = pageContent.replace(
        /<title>Modern Age Calculator<\/title>/,
        `<title>Age Calculator for ${year} Born<\/title>`
    );

    // Pre-fill DOB and auto-calculate on load
    pageContent = pageContent.replace(
        /<input type="date" id="dob">/,
        `<input type="date" id="dob" value="${dobValue}">`
    );

    // Add script to auto-calculate on page load
    pageContent = pageContent.replace(
        `<script src="script.js"><\/script>`,
        `<script src="script.js"><\/script>\n    <script>document.addEventListener('DOMContentLoaded', calculateAge);<\/script>`
    );

    // Replace the main title to reflect the specific year
    pageContent = pageContent.replace(
        /<h1 class="title">Age Calculator<\/h1>/,
        `<h1 class="title">Age Calculator for ${year} Born<\/h1>`
    );

    fs.writeFileSync(filePath, pageContent);
    console.log(`Generated ${filePath}`);
    generatedPageLinks.push({ name: `${year} Born`, url: filename });
}

// Create age-year-pages-index.html
let indexPageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Age Calculators by Birth Year</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="main-nav">
        <a href="index.html">Main Calculator</a>
        <a href="age-in-days.html">Age in Days</a>
        <a href="age-in-months.html">Age in Months</a>
        <a href="age-difference.html">Age Difference</a>
        <a href="age-year-pages-index.html">Age by Year</a>
        <a href="about.html">About</a>
    </nav>
    <div class="container">
        <h1 class="title">Age Calculators by Birth Year</h1>
        <div class="calculator-card">
            <p>Click on a year below to see the age calculated for someone born in that year (as of today).</p>
            <div class="year-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 20px;">
`;

generatedPageLinks.forEach(link => {
    indexPageContent += `                <a href="${link.url}" class="year-link" style="display: block; padding: 10px; background-color: #e0f7fa; border-radius: 5px; text-decoration: none; color: #2193b0; font-weight: 600; transition: background-color 0.2s ease;">${link.name}</a>\n`;
});

indexPageContent += `
            </div>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(directoryPath, "age-year-pages-index.html"), indexPageContent);
console.log("Generated age-year-pages-index.html");

// Update navigation in existing pages
const existingPages = ["index.html", "age-in-days.html", "age-in-months.html", "age-difference.html", "about.html"];
const navLinkToAdd = `<a href="age-year-pages-index.html">Age by Year</a>`;

existingPages.forEach(page => {
    const filePath = path.join(directoryPath, page);
    let content = fs.readFileSync(filePath, "utf8");
    if (!content.includes(navLinkToAdd)) { // Prevent duplicate additions
        content = content.replace(
            /<a href="about.html">About<\/a>/,
            `${navLinkToAdd}\n        <a href="about.html">About</a>`
        );
        fs.writeFileSync(filePath, content);
        console.log(`Updated navigation in ${page}`);
    }
});

console.log("\nAll year-specific age calculator pages and index generated, and navigation updated.");
