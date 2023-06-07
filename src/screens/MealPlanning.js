import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import FoodDatabase from './FoodDatabase';

const MealPlanning = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const [mealPlanData, setMealPlanData] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: [],
  });
  return (
    <View style={styles.container}>
      <FoodDatabase mealPlan={setMealPlanData} />
      <ScrollView vertical>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {meals.map((meal) => (
              <View key={meal} style={styles.mealContainer}>
                <Text style={styles.mealText}>{meal}</Text>
                {mealPlanData[meal].length > 0 ? (
                  mealPlanData[meal].map((foodItem) => (
                    <Text key={foodItem.label} style={styles.mealText}>
                      {foodItem.label}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.mealText}>No food item</Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealContainer: {
    marginBottom: 8,
    marginLeft: 16,
  },
  mealText: {
    fontSize: 16,
  },
});

export default MealPlanning;
