import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultScreen = ({ totalCalories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Daily Calories : </Text>
      <Text style={styles.value}>{totalCalories} kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
