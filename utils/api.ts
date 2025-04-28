// components/api.ts
export const fetchRecipes = async () => {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Gagal ambil data:', error);
    return [];
  }
};
 