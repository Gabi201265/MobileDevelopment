import { Picker } from '@react-native-picker/picker';
import React, { useState, useContext } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Modal } from 'react-native';

import { MealPlanContext } from './MealPlanContext';

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { setMealPlan } = useContext(MealPlanContext);
  const APP_ID = '089c9172';
  const APP_KEY = '94b30ed41f645ed8dd6ce9796766b49b';

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        // To encode to have spaces
        const encodedQuery = encodeURIComponent(searchQuery.toLowerCase());
        const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodedQuery}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(url);
        console.log(data);
        if (data.hints.length > 0) {
          setFoodData(data.hints[0].food);
          setError(null);
        } else {
          setFoodData(null);
          setError('Food not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setFoodData(null);
        setError('An error occurred');
      }
    }
  };
  const handleAddToMealPlan = () => {
    if (selectedMeal.trim() !== '' && selectedDay.trim() !== '') {
      setMealPlan((prevMealPlan) => {
        const updatedMealPlan = { ...prevMealPlan };
        updatedMealPlan[selectedDay][selectedMeal] = [
          ...updatedMealPlan[selectedDay][selectedMeal],
          foodData,
        ];
        return updatedMealPlan;
      });

      // Reset state variables
      setFoodData(null);
      setSelectedMeal('');
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter food name"
        maxLength={24}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {error && <Text style={styles.error}>{error}</Text>}
      {foodData && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Food Name : </Text>
          <Text style={styles.value}>{foodData.label}</Text>
          <Text style={styles.label}>ENERC_KCAL : </Text>
          <Text style={styles.value}>{foodData.nutrients.ENERC_KCAL}</Text>
          <Button title="Add to Meal Plan" onPress={() => setModalVisible(true)} />
        </View>
      )}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Meal Type : </Text>
          <Picker
            style={styles.mealPicker}
            selectedValue={selectedMeal}
            onValueChange={(value) => setSelectedMeal(value)}>
            <Picker.Item style={styles.customLabel} label="Select Meal" value="" />
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Snack" value="Snack" />
          </Picker>
          <Text style={styles.modalTitle}>Select Day : </Text>
          <Picker
            style={styles.dayPicker}
            selectedValue={selectedDay}
            onValueChange={(value) => setSelectedDay(value)}>
            <Picker.Item style={styles.customLabel} label="Select Day" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title="Add to Meal Plan" onPress={handleAddToMealPlan} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  resultContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mealPicker: {
    marginBottom: 16,
  },
  dayPicker: {
    marginBottom: 16,
  },
  customLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default FoodDatabase;
