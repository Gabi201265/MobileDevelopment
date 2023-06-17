import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { MealPlanContext } from './MealPlanContext';

const MealPlanning = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const { mealPlan, setMealPlan } = useContext(MealPlanContext);
  // console.log(mealPlan['Monday']['Breakfast'][0].nutrients.ENERC_KCAL);

  const renderMealItem = (day, meal) => {
    const handleRemoveFoodItem = (index) => {
      setMealPlan((mealPlan) => {
        const updatedMealPlan = { ...mealPlan };
        updatedMealPlan[day][meal].splice(index, 1);
        return updatedMealPlan;
      });
    };
    if (mealPlan[day][meal].length > 0) {
      return (
        <>
          {mealPlan[day][meal].map((foodItem, index) => (
            <View key={index} style={styles.foodItemContainer}>
              <Text key={index} style={styles.foodItemText}>
                {foodItem.label}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFoodItem(index)}>
                <Text style={styles.removeButton}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.totalCalories}>
            Total Meals's Calories: {calculateTotalCalories(mealPlan[day][meal])}
          </Text>
        </>
      );
    } else {
      return <Text style={styles.mealText}>No food item</Text>;
    }
  };

  const calculateTotalCalories = (foodItems) => {
    let totalCalories = 0;
    foodItems.forEach((foodItem) => {
      totalCalories += foodItem.nutrients.ENERC_KCAL;
    });
    return totalCalories.toFixed(2);
  };

  const calculateTotalCaloriesPerDay = (day) => {
    let totalCaloriesPerDay = 0;
    meals.forEach((meal) => {
      mealPlan[day][meal].forEach((foodItem) => {
        totalCaloriesPerDay += foodItem.nutrients.ENERC_KCAL;
      });
    });
    return totalCaloriesPerDay.toFixed(2);
  };

  

  const saveMealPlan = async (mealPlan) => {
    try {
      await AsyncStorage.setItem('mealPlan', JSON.stringify(mealPlan));
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  };

  const loadMealPlan = async () => {
    try {
      const mealPlanData = await AsyncStorage.getItem('mealPlan');
      if (mealPlanData !== null) {
        const parsedMealPlan = JSON.parse(mealPlanData);
        setMealPlan(parsedMealPlan);
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
    }
  };

  useEffect(() => {
    loadMealPlan();
  }, []);

  useEffect(() => {
    saveMealPlan(mealPlan);
  }, [mealPlan]);
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            {meals.map((meal) => (
              <View key={meal} style={styles.mealContainer}>
                <Text style={styles.mealHeaderText}>{meal}</Text>
                {renderMealItem(day, meal)}
              </View>
            ))}
            <Text style={styles.totalCaloriesPerDay}>
              Total Daily Calories: {calculateTotalCaloriesPerDay(day)}
            </Text>
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
  mealHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  foodItemText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  totalCalories: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
    marginLeft: 8,
  },
  totalCaloriesPerDay: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'red',
    marginLeft: 8,
  },
  foodItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    fontSize: 16,
    color: 'red',
  },
});

export default MealPlanning;
