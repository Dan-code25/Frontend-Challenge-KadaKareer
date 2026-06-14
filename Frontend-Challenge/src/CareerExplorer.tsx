// CareerExplorer.tsx
import { useState } from "react";
type Career = {
  id: number;
  name: string;
  category: string;
};

const careers: Career[] = [
  { id: 1, name: "Software Engineer", category: "Technology" },
  { id: 2, name: "Teacher", category: "Education" },
  { id: 3, name: "Product Manager", category: "Business" },
];

export default function CareerExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCareers = careers.filter((career) => {
    if (selectedCategory === "All") {
      return true;
    }

    return career.category === selectedCategory;
  });

  return (
    <div>
      <h1>Explore Careers</h1>

      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option>All</option>
        <option>Technology</option>
        <option>Education</option>
        <option>Business</option>
      </select>

      {filteredCareers.map((career) => (
        <div key={career.id}>{career.name}</div>
      ))}
    </div>
  );
}
