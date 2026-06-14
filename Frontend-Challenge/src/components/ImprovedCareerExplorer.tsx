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

export default function ImprovedCareerExplore() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(careers.map((career) => career.category)),
  ];

  const filteredCareers =
    selectedCategory === "All"
      ? careers
      : careers.filter((career) => career.category === selectedCategory);

  return (
    <div>
      <h1>Explore Careers</h1>

      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      {filteredCareers.map((career) => (
        <div key={career.id}>{career.name}</div>
      ))}
    </div>
  );
}
