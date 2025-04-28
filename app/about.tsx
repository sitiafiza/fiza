import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyRecipe</Text>
      <Text>Aplikasi resep sederhana untuk UTS Mobile Programming.</Text>
      <Text>Dibuat oleh: [Nama Kamu]</Text>
      <Text>Tahun: 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
