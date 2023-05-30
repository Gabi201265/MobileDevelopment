import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const HealthScreen = () => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Picker
      // selectedValue={selectedValue}
      // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>

      //   <Picker.Item label="Option 1" value="1" />
      //   <Picker.Item label="Option 2" value="2" />
      >
      </Picker>
    </View>
  );
};

export default HealthScreen;
