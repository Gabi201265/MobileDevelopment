import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';

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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.container}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.input}>
        <TouchableOpacity style={styles.container} onPress={() => setModalVisible('gender')}>
          <Text style={styles.button}>{gender ? gender : 'Select Gender'}</Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible === 'gender'}
          onRequestClose={() => {
            setModalVisible(null);
          }}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Picker
                style={styles.modalText}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(null);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.container}
          placeholder="Height (in cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.input}>
        <TextInput
          style={styles.container}
          placeholder="Weight (in kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.input}>
        <TouchableOpacity style={styles.container} onPress={() => setModalVisible('activityLevel')}>
          <Text style={styles.button}>
            {activityLevel ? activityLevel : 'Select Activity Level'}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible === 'activityLevel'}
          onRequestClose={() => {
            setModalVisible(null);
          }}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Picker
                style={styles.modalText}
                selectedValue={activityLevel}
                onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}>
                <Picker.Item label="Sedentary" value="Sedentary" />
                <Picker.Item label="Light Exercise" value="Light Exercise" />
                <Picker.Item label="Moderate Exercise" value="Moderate Exercise" />
                <Picker.Item label="Heavy Exercise" value="Heavy Exercise" />
                <Picker.Item label="Extra Exercise" value="Extra Exercise" />
              </Picker>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(null);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.input}>
        <TouchableOpacity style={styles.container} onPress={() => setModalVisible('healthGoal')}>
          <Text style={styles.button}>{healthGoal ? healthGoal : 'Select Health Goal'}</Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible === 'healthGoal'}
          onRequestClose={() => {
            setModalVisible(null);
          }}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Picker
                style={styles.modalText}
                selectedValue={healthGoal}
                onValueChange={(itemValue, itemIndex) => setHealthGoal(itemValue)}>
                <Picker.Item label="Weight Loss" value="weight-loss" />
                <Picker.Item label="Weight Maintenance" value="weight-maintenance" />
                <Picker.Item label="Weight Gain" value="weight-gain" />
              </Picker>
              <Button
                title="Close"
                onPress={() => {
                  setModalVisible(null);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.container}>
        <Button
          title="Submit"
          disabled={!age || !gender || !height || !weight || !activityLevel || !healthGoal}
          onPress={handleSubmit}
        />
        {showResult && <ResultScreen totalCalories={totalCalories} />}
      </View>
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
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    padding: 10,
    marginBottom: 16,
    justifyContent: 'center',
  },
});

export default HealthScreen;
