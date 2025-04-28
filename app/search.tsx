import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import RecipeCard from '../components/RecipeCard';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const SearchScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
      const data = await response.json();
      setRecipes(data.meals || []);
    };

    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Pencarian</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            id={item.idMeal}
            name={item.strMeal}
            image={item.strMealThumb}
            onPress={() => router.push(`./detail/${item.idMeal}`)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default SearchScreen;
