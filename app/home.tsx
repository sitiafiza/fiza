import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

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

        console.log('Data resep makanan:', data.meals); // Log API response ke console

        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Gagal fetch resep:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Daftar Resep</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/detail/[id]', params: { id: item.idMeal } })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada resep ditemukan.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: {
    backgroundColor: '#ffe0b2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', flexShrink: 1 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#888' },
});

export default HomeScreen;
