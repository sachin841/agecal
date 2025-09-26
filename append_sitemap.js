const fs = require('fs');
const path = require('path');

// List of 1000 calculator variables (same as in create_pages.js)
const variables = [
    "Lawn Mowing Cost", "Lawn Aeration Cost", "Lawn Dethatching Cost", "Lawn Fertilizing Cost", "Lawn Seeding Cost", "Lawn Sodding Cost", "Lawn Watering Cost", "Lawn Weed Control Cost", "Lawn Pest Control Cost", "Lawn Grub Control Cost",
    "Garden Tilling Cost", "Garden Weeding Cost", "Garden Mulching Cost", "Garden Planting Cost", "Garden Watering Cost", "Garden Fertilizing Cost", "Garden Pest Control Cost", "Garden Soil Amendment Cost", "Garden Edging Cost", "Garden Fencing Cost",
    "Tree Planting Cost", "Tree Removal Cost", "Tree Trimming Cost", "Tree Pruning Cost", "Tree Stump Grinding Cost", "Tree Stump Removal Cost", "Tree Fertilizing Cost", "Tree Pest Control Cost", "Tree Cabling Cost", "Tree Bracing Cost",
    "Shrub Planting Cost", "Shrub Removal Cost", "Shrub Trimming Cost", "Shrub Pruning Cost", "Shrub Fertilizing Cost", "Shrub Pest Control Cost", "Hedge Trimming Cost", "Hedge Planting Cost", "Hedge Removal Cost", "Hedge Fertilizing Cost",
    "Mulch Installation Cost", "Mulch Delivery Cost", "Wood Chips Cost", "Bark Mulch Cost", "Rubber Mulch Cost", "Gravel Installation Cost", "Gravel Delivery Cost", "Pea Gravel Cost", "River Rock Cost", "Crushed Stone Cost",
    "Soil Delivery Cost", "Topsoil Cost", "Compost Cost", "Sand Cost", "Fill Dirt Cost", "Garden Soil Cost", "Potting Soil Cost", "Lawn Soil Cost", "Mushroom Compost Cost", "Manure Cost",
    "Paver Patio Cost", "Brick Patio Cost", "Concrete Patio Cost", "Stone Patio Cost", "Flagstone Patio Cost", "Patio Sealing Cost", "Patio Cleaning Cost", "Patio Repair Cost", "Deck Building Cost", "Deck Staining Cost",
    "Deck Sealing Cost", "Deck Repair Cost", "Deck Cleaning Cost", "Fence Installation Cost", "Fence Repair Cost", "Fence Staining Cost", "Fence Painting Cost", "Wood Fence Cost", "Vinyl Fence Cost", "Chain Link Fence Cost",
    "Aluminum Fence Cost", "Wrought Iron Fence Cost", "Gate Installation Cost", "Gate Repair Cost", "Driveway Paving Cost", "Asphalt Driveway Cost", "Concrete Driveway Cost", "Gravel Driveway Cost", "Driveway Sealing Cost", "Driveway Repair Cost",
    "Walkway Paving Cost", "Sidewalk Paving Cost", "Concrete Walkway Cost", "Paver Walkway Cost", "Stone Walkway Cost", "Retaining Wall Cost", "Concrete Block Wall Cost", "Stone Retaining Wall Cost", "Wood Retaining Wall Cost", "Gabion Wall Cost",
    "Sprinkler System Installation Cost", "Sprinkler System Repair Cost", "Sprinkler System Winterization Cost", "Sprinkler System Start-Up Cost", "Drip Irrigation System Cost", "Irrigation System Repair Cost", "Outdoor Lighting Installation Cost", "Landscape Lighting Cost", "Low Voltage Lighting Cost", "Solar Landscape Lighting Cost",
    "Pond Installation Cost", "Pond Maintenance Cost", "Pond Cleaning Cost", "Water Feature Installation Cost", "Fountain Installation Cost", "Waterfall Installation Cost", "Drainage System Installation Cost", "French Drain Cost", "Dry Well Cost", "Sump Pump Installation Cost",
    "Sod Installation Cost", "Hydroseeding Cost", "Artificial Turf Installation Cost", "Putting Green Installation Cost", "Playset Installation Cost", "Swing Set Installation Cost", "Trampoline Installation Cost", "Shed Installation Cost", "Gazebo Installation Cost", "Pergola Installation Cost",
    "Outdoor Kitchen Cost", "Fire Pit Installation Cost", "Outdoor Fireplace Cost", "Land Clearing Cost", "Brush Removal Cost", "Grading Cost", "Excavation Cost", "Trenching Cost", "Leaf Removal Cost", "Gutter Cleaning Cost",
];

// Pad the list to 1000 with variations
const baseVars = [...variables];
const paddingNeeded = 1000 - variables.length;
for (let i = 0; i < paddingNeeded; i++) {
    const baseVar = baseVars[i % baseVars.length];
    variables.push(`${baseVar} (Alternative ${Math.floor(i / baseVars.length) + 1})`);
}

const sitemapPath = "sitemap.xml";
let sitemapContent = fs.readFileSync(sitemapPath, "utf8");

variables.forEach(varName => {
    const filename = "calculators/yard-calculator-" + varName.toLowerCase().replace(/ /g, "-").replace(/\(|\)|"/g, "") + ".html";
    const url = `http://www.example.com/${filename}`;
    sitemapContent += `    <url>\n        <loc>${url}</loc>\n        <lastmod>2025-09-25</lastmod>\n        <changefreq>monthly</changefreq>\n        <priority>0.8</priority>\n    </url>\n`;
});

sitemapContent += `</urlset>`;

fs.writeFileSync(sitemapPath, sitemapContent);

console.log("\nSuccessfully updated sitemap.xml with all calculator pages.");
