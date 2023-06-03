import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const APP_ID = '44e2f578';
  const APP_KEY = 'b91b52c750f2618779c8da62c2ae355a';
 
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      const url = `https://api.edamam.com/search?q=${encodeURIComponent(searchQuery)}&app_id=${APP_ID}&app_key=${APP_KEY}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setSearchResults(result.hits);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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

      {searchResults.length > 0 && (
        <View>
          <Text>Search Results : </Text>
          {searchResults.map((result) => (
            <Text key={result.recipe.label}>{result.recipe.label}</Text>
          ))}
        </View>
      )}
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

export default FoodDatabase;