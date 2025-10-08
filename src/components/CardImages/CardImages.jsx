// src/components/CardImages/CardImages.jsx

// Dynamically import all SVG card images from src/assets/SVG-cards
const cardModules = import.meta.glob("/src/assets/SVG-cards/*.svg", {
  eager: true,
  import: "default",
});

// Convert imports into an array of { name, src }
const cardImages = Object.entries(cardModules).map(([path, src]) => {
  const name = path.split("/").pop().replace(".svg", ""); // e.g., ace_of_hearts
  return { name, src };
});

// Optional: sort alphabetically
cardImages.sort((a, b) => a.name.localeCompare(b.name));

export default cardImages;
