import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      }
    };
    fetchDetail();
  }, [id]);

  if (!recipe) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <Text style={styles.section}>Kategori: {recipe.strCategory}</Text>
      <Text style={styles.section}>Asal: {recipe.strArea}</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  instructions: { marginTop: 15, fontSize: 16, lineHeight: 22, textAlign: 'justify' },
});

export default DetailPage;
