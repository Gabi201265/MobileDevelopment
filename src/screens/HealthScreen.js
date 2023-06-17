import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import ResultScreen from './ResultScreen';

const HealthScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    console.log('Submitted!');
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Activity Level:', activityLevel);
    console.log('Health Goal:', healthGoal);
    const bmr = calculateBMR(age, gender, height, weight);
    console.log('BMR : ', bmr);
    const myTotalAfterChanged = calculateTotalCalories(bmr, activityLevel, healthGoal);
    setTotalCalories(myTotalAfterChanged);
    // Sometimes it sends 0 because it's an asynchrone process
    console.log('Total Calories before :', totalCalories);
    // But :
    console.log('Total Calories :', myTotalAfterChanged);
    setShowResult(true);
  };

  const calculateBMR = (age, gender, height, weight) => {
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (gender === 'female') {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    // To have only 2 decimals
    return bmr.toFixed(2);
  };

  const calculateTotalCalories = (bmr, activityLevel, healthGoal) => {
    let totalCalories = 0;
    switch (activityLevel) {
      case 'sedentary':
        totalCalories = bmr * 1.2;
        break;
      case 'light-exercise':
        totalCalories = bmr * 1.375;
        break;
      case 'moderate-exercise':
        totalCalories = bmr * 1.55;
        break;
      case 'heavy-exercise':
        totalCalories = bmr * 1.725;
        break;
      case 'extra-active':
        totalCalories = bmr * 1.9;
        break;
      default:
        break;
    }
    switch (healthGoal) {
      case 'weight-loss':
        totalCalories -= 500;
        break;
      case 'weight-gain':
        totalCalories += 500;
        break;
      default:
        break;
    }
    return totalCalories.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Age"
        maxLength={2}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Height (in cm)"
        maxLength={3}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (in kg)"
        maxLength={3}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Picker
        style={styles.input}
        selectedValue={activityLevel}
        onValueChange={(value) => setActivityLevel(value)}>
        <Picker.Item label="Select Activity Level" value="" />
        <Picker.Item label="Sedentary" value="sedentary" />
        <Picker.Item label="Light Exercise" value="light-exercise" />
        <Picker.Item label="Moderate Exercise" value="moderate-exercise" />
        <Picker.Item label="Heavy Exercise" value="heavy-exercise" />
        <Picker.Item label="Extra Active" value="extra-active" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={healthGoal}
        onValueChange={(value) => setHealthGoal(value)}>
        <Picker.Item label="Select Health Goal" value="" />
        <Picker.Item label="Weight Loss" value="weight-loss" />
        <Picker.Item label="Weight Maintenance" value="weight-maintenance" />
        <Picker.Item label="Weight Gain" value="weight-gain" />
      </Picker>

      <Button
        title="Submit"
        disabled={!age || !gender || !height || !weight || !activityLevel || !healthGoal}
        onPress={handleSubmit}
      />
      {showResult && <ResultScreen totalCalories={totalCalories} />}
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
});

export default HealthScreen;
