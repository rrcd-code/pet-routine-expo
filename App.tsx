import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const INITIAL_ROUTINES = [
  { id: '1', title: 'Ração da Manhã', time: '08:00', completed: true, category: 'Alimentação' },
  { id: '2', title: 'Passeio Matinal', time: '09:00', completed: true, category: 'Exercício' },
  { id: '3', title: 'Remédio para Carrapato', time: '14:00', completed: false, category: 'Saúde' },
  { id: '4', title: 'Ração da Noite', time: '19:00', completed: false, category: 'Alimentação' },
];

export default function App() {
  const [routines, setRoutines] = useState(INITIAL_ROUTINES);

  const toggleRoutine = (id) => {
    setRoutines(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200' }}
          style={styles.petAvatar}
        />
        <View>
          <Text style={styles.petName}>Rex 🐶</Text>
          <Text style={styles.subtitle}>Rotina Diária do Pet</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, item.completed && styles.cardCompleted]}
            onPress={() => toggleRoutine(item.id)}
            activeOpacity={0.7}
          >
            <View>
              <Text style={[styles.cardTitle, item.completed && styles.textCompleted]}>
                {item.title}
              </Text>
              <Text style={styles.cardTime}>⏰ {item.time} | {item.category}</Text>
            </View>
            <Text style={styles.statusBadge}>
              {item.completed ? '✅ Concluído' : '⏳ Pendente'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  petAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  petName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#3182CE',
  },
  cardCompleted: {
    backgroundColor: '#EDF2F7',
    borderLeftColor: '#38A169',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
  },
  cardTime: {
    fontSize: 13,
    color: '#718096',
    marginTop: 4,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});