import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mealPlan, setMealPlan] = useState({
    Breakfast: [],
    Lunch: [],
    Snack: [],
    Dinner: [],
  });

  const APP_ID = '44e2f578';
  const APP_KEY = 'b91b52c750f2618779c8da62c2ae355a';
 
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const encodedQuery = encodeURIComponent(searchQuery);
        const url = `https://api.edamam.com/search?q=${encodedQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;

        const response = await fetch(url);
        const result = await response.json();

        if (result.hits.length > 0) {
          setFoodData(result.hits[0].recipe);
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
    if (selectedMeal.trim() !== '') {
      // Add
      const updatedMealPlan = { ...mealPlan };
      updatedMealPlan[selectedMeal].push(foodData);

      setMealPlan(updatedMealPlan);

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
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      {error && <Text style={styles.error}>{error}</Text>}
      {foodData && (
        <View style={styles.resultContainer}>
          <Text style={styles.label}>Food Name : </Text>
          <Text style={styles.value}>{foodData.label}</Text>
          <Text style={styles.label}>Calories : </Text>
          <Text style={styles.value}>{foodData.calories.toFixed(2)}</Text>
          <Text style={styles.label}>Other Nutritional Facts : </Text>
          {foodData.digest.map((item, index) => (
            <Text key={index} style={styles.value}>
              {item.label}: {item.total.toFixed(2)} {item.unit}
            </Text>
          ))}
          <Button title="Add to Meal Plan" onPress={() => setModalVisible(true)} />
        </View>
      )}
       <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Meal Type : </Text>
          <Picker
            style={styles.picker}
            selectedValue={selectedMeal}
            onValueChange={(value) => setSelectedMeal(value)}>
            <Picker.Item label="Select Meal" value="" />
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Snack" value="Snack" />
          </Picker>
          <Button title="Add to Meal Plan" onPress={handleAddToMealPlan} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
  picker: {
    marginBottom: 16,
  },
});

export default FoodDatabase;