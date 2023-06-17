import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
<<<<<<< HEAD
  return <AppNavigator />;
=======
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
>>>>>>> a9e8440 (vue/coherence ios)
};

export default App;
