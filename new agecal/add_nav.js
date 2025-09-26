const fs = require('fs');
const path = require('path');

const navBar = `
    <nav class="main-nav">
        <a href="index.html">Main Calculator</a>
        <a href="age-in-days.html">Age in Days</a>
        <a href="age-in-months.html">Age in Months</a>
        <a href="age-difference.html">Age Difference</a>
        <a href="age-year-pages-index.html">Age by Year</a>
        <a href="about.html">About</a>
    </nav>
`;

const directoryPath = "new agecal";

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Check if navBar already exists to prevent duplicates
            if (!content.includes('<nav class="main-nav">')) {
                // Insert navBar after <body> tag
                content = content.replace(
                    /<body([^>]*)>/i,
                    `<body$1>\n    ${navBar}`
                );
                fs.writeFileSync(filePath, content);
                console.log(`Updated ${filePath} with navigation bar.`);
            } else {
                console.log(`Navigation bar already exists in ${filePath}. Skipping.`);
            }
        }
    });
    console.log("\nSuccessfully added/verified navigation bar in all HTML files.");
});
