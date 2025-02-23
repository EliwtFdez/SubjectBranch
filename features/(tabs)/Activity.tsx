import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, Surface } from 'react-native-paper';

interface Activity {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

const ActivityScreen = () => {
  // Datos de ejemplo - esto después se conectará con Firebase
  const activities: Activity[] = [
    {
      id: '1',
      title: 'Tarea de Matemáticas',
      subject: 'Matemáticas',
      dueDate: '2024-02-20',
      status: 'pending'
    },
    {
      id: '2', 
      title: 'Proyecto de Ciencias',
      subject: 'Ciencias',
      dueDate: '2024-02-25',
      status: 'completed'
    }
  ];

  const renderActivity = ({ item }: { item: Activity }) => (
    <Surface style={styles.surface} elevation={2}>
      <List.Item
        title={item.title}
        description={`Materia: ${item.subject}\nFecha de entrega: ${item.dueDate}`}
        left={props => <List.Icon {...props} icon="notebook" />}
        right={props => (
          <List.Icon 
            {...props} 
            icon={item.status === 'completed' ? 'check-circle' : 'clock-outline'}
            color={item.status === 'completed' ? '#4CAF50' : '#FFA000'}
          />
        )}
      />
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Actividades</Text>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  surface: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  listContainer: {
    paddingBottom: 16
  }
});

export default ActivityScreen;
