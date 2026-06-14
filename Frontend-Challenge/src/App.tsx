import CareerDropdown from "./components/CareerDropdown";
import { useState } from "react";

function App() {
  const [techCategory, setTechCategory] = useState("All");
  const [creativeCategory, setCreativeCategory] = useState("All");

  const creativeCategories = ["All", "Arts", "Design", "Marketing", "Sales"];

  return (
    <div>
      <h1>Part 3: Build a Reusable Component for Career Dropdowns</h1>
      
      <CareerDropdown
        categories={[
          "All",
          "Technology",
          "Education",
          "Business",
          "Healthcare",
        ]}
        value={techCategory}
        onChange={setTechCategory}
      />
      <CareerDropdown
        categories={creativeCategories}
        value={creativeCategory}
        onChange={setCreativeCategory}
      />
    </div>
  );
}

export default App;
