import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import RecipeCard from '../components/RecipeCard'; // ← Import komponen

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resep Populer</Text>
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
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada resep ditemukan.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#888' },
});

export default HomeScreen;
