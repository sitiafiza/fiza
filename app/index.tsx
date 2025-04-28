import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ImageBackground } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <ImageBackground
        source={require('../assets/images/makanan.png')}
        style={styles.background}
        resizeMode="cover"
        >

    <View style={styles.container}>
      <Text style={styles.buttonText}>Welcome to Resep Makanan ala Fiza</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Mulai Jelajahi Resep</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  button: {
    backgroundColor: '#f57c00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});

export default Index;
