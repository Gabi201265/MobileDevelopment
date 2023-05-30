import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const HealthScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');

  const handleSubmit = () => {
    // Perform necessary calculations or data processing
    // based on the user inputs
    console.log('Submitted!');
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Activity Level:', activityLevel);
    console.log('Health Goal:', healthGoal);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Height (in cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (in kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Picker
        style={styles.input}
        selectedValue={activityLevel}
        onValueChange={(value) => setActivityLevel(value)}
      >
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
        onValueChange={(value) => setHealthGoal(value)}
      >
        <Picker.Item label="Select Health Goal" value="" />
        <Picker.Item label="Weight Loss" value="weight-loss" />
        <Picker.Item label="Weight Maintenance" value="weight-maintenance" />
        <Picker.Item label="Weight Gain" value="weight-gain" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} />
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
