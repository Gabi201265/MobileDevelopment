import React, { createContext, useState } from 'react';

export const MealPlanContext = createContext();

const getDayMealPlan = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayMealPlan = {};
  for (const day of daysOfWeek) {
    dayMealPlan[day] = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snacks: [],
    };
  }
  return dayMealPlan;
};

export const MealPlanProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState(getDayMealPlan());

  return (
    <MealPlanContext.Provider value={{ mealPlan, setMealPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
};
