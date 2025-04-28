import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log('Data detail:', data.meals[0]); // cek di console
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error('Gagal fetch detail:', error);
      }
    };

    if (id) {
      fetchRecipeDetail();
    }
  }, [id]);

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading resep...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  title: { fontSize: 26, fontWeight: 'bold', margin: 20, textAlign: 'center' },
  instructions: { fontSize: 16, marginHorizontal: 20, marginBottom: 20, lineHeight: 24 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { fontSize: 18, fontWeight: 'bold' },
});

export default DetailScreen;
