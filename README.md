# Frontend Challenge: Career Explorer Component (React + TypeScript)

# Submitted By: Dan Jheniel P. Bringas

## Here is where you can find the files matching each part of the challenge:

- **Part 1 (Given Code):** `src/CareerExplorer.tsx
- **Part 2 (Improvements):** `src/components/ImprovedCareerExplorer.tsx`
- **Part 3 (Reusable Component):** `src/components/CareerDropdown.tsx`
- **Application Entry:** `src/App.tsx` (Renders the overall layout and this is where the reusable component is used).

## Part 1: Explain the Code

### 1. What happens when the component loads?

This component (CareerExplorer.tsx) is a dropdown that lets u browse careers and filtered it by category. What happens here when the component loads, react renders the CareerExplorer function and initializes the selectedCategory as "All". Then it filters the career category based on the selectedCategory and store it on the filteredCareers. And finally, since the selected category is initialized as "All", it will display all the career names.

### 2. What does useState do?

In general, state is data that represents the current condition of an application. In React, useState is a hook that lets a component store and update this kind of data. It returns an array with the current state value and a function to update it. In this code, useState is used to store the selected category in selectedCategory, and setSelectedCategory is used to update it when the user selects a different option by re-rendering.

### 3. How does the dropdown affect the displayed careers?

When the user selects a category from the dropdown, the onChange event is triggered. This calls setSelectedCategory, which updates the state with the selected value. Once the state changes, React re-renders the component. During this re-render, filteredCareers is recalculated using the .filter() method to include only careers that match the selected category. Since filteredCareers is used in the .map() function to display the list, the UI updates automatically and shows only the careers that match the selected filter

### 4. Why is key = {career.id} needed?

In a list, react needs a way to tell each item apart. Without a key, it would have a hard time knowing which item is which when the list updates. By using key = {career.id}, each career has a unique label. So when the filteredCareers is recalculated, react can easily identify which careers are removed, added, or stayed the same.

## Part 2: Improve the Feature

### Improvement 1: Maintainability

#### Problem:

The category options of the dropdown are hardcoded. If a new career with a different category is added, the dropdown will not automatically include it which means we have to manually update the options of the dropdown which is not efficient.

#### Proposed Solution:

To solve this problem, I came up with a solution to dynamically generate the category options instead of hardcoding them. What my proposed solution does is we will extract the unique categories from the careers data using a Set then use a map to create option elements along with the unique categories.

**Code snippet of the solution:**

```jsx
const categories = [
  "All",
  ...new Set(careers.map((career) => career.category)),
];

// inside the return()
<select
  value={selectedCategory}
  onChange={(event) => setSelectedCategory(event.target.value)}
>
  {categories.map((category) => (
    <option key={category}>{category}</option>
  ))}
</select>;
```

#### Why it improves the feature:

This solution makes the code easier to maintain because the UI automatically stay in sync with the data. The developer does not have to hardcode the options when there are new careers or categories added. This also reduces the chances of bugs and human errors in the code.

### Improvement 2: Performance

#### Problem:

The current filtering logic has a condition inside the .filter() to check if the selected category is "All" but it has some performance issues. Let say we have thousands of categories and the user select "All". This makes the code slow since we will need to loop through all of the career with the same condition for "All" even though we don't need filtering, which makes the code inefficient and slow.

#### Proposed Solution:

Instead of checking "All" inside the loop, we will decide first whether to filter the careers. We will add a condition that if the selected category is "All", we will not filter the careers and will only filter if it is not "All".

**Code snippet of the solution:**

```jsx
const filteredCareers =
  selectedCategory === "All"
    ? careers
    : careers.filter((career) => career.category === selectedCategory);
```

#### Why it improves the feature:

It improves the feature logic because instead of checking "All" condition for every item inside the loop, we will now just handle it once. This avoids unnecessary repeated checks and makes our code much easier to understand. This also makes the filtering process more efficient and faster.

## Part 3: Build a Component

### Create a reusable component: CareerDropdown

**Code for the component and its sample usage**

```jsx
// File path of the component: src/components/CareerDropdown.tsx
type CareerDropdownProps = {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CareerDropdown({
  categories,
  value,
  onChange,
}: CareerDropdownProps) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
```

```jsx
// File path of the component: Frontend-Challenge/src/App.tsx
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
```

**You can test the live deployment of the reusable component in this link:**
https://frontend-challenge-kadakareer.vercel.app/

## AI Reflections

### 1. What did you use ask AI to help with?

I wrote the code myself from scratch. I used GitHub Copilot in VS Code as a helper to speed things up by using it's inline suggestions, mainly for writing repetitive JSX and TypeScript code. It helped me reduce typing time, but I was still the one who designed the solution and logic.

### 2. Which AI suggestions did you use?

I only accepted simple, context-based inline suggestions that matched what I already planned to implement. These includes the automatically completing and structuring the `<select>` and `<option>` elements after I started writing the `.map()` logic and filling in common React patterns like `(e) => onChange(e.target.value)` after I began writing the onChange attribute.

### 3. Which suggestions did you modify or reject?

I ignored and rejected larger multi-line suggestions where Copilot tried to take over the component design. For example, it suggested adding useState inside the child component. I didn’t accept this because I wanted to keep `<CareerDropdown />` reusable and independent. Instead, I kept the state in the parent component and passed it down as props.

## Final Reflection

### If this feature grew to support thousands of students, what would you improve first and why?

If the Career Explorer feature scaled to support thousands of active students navigating the platform, the first thing I would improve is its filtering. The current problem is that the storing and filtering of the entire career data is processed in the client-side browser. If we have thousands of career data, the filtering logic might make the website slower especially for the students who has a low-end device. So to improve this, I will move the filtering logic to the backend database and add pagination so we would only fetch the small chunk of career data instead of overloading the client-side browser with a large amount of data.
