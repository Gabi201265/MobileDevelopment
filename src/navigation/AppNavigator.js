import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import FoodDatabase from '../screens/FoodDatabase';
import HealthScreen from '../screens/HealthScreen';
import { MealPlanProvider } from '../screens/MealPlanContext';
import MealPlanning from '../screens/MealPlanning';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <MealPlanProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Health Goals"
            component={HealthScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Food Database"
            component={FoodDatabase}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="cutlery" color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Meal Planning"
            component={MealPlanning}
            options={{
              tabBarIcon: ({ color, size }) => <Icon name="calendar" color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MealPlanProvider>
  );
};

export default AppNavigator;
