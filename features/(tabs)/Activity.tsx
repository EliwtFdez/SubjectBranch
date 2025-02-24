import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { List, Text, Surface, IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

  const handleDelete = (id: string) => {
    // Aquí irá la lógica para eliminar la actividad
    console.log('Eliminar actividad:', id);
  };

  const renderRightActions = (id: string) => {
    return (
      <View style={styles.deleteAction}>
        <IconButton
          icon="delete"
          iconColor="white"
          size={24}
          onPress={() => handleDelete(id)}
        />
      </View>
    );
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <Surface style={styles.surface} elevation={2}>
        <List.Item
          title={<Text style={styles.title}>{item.title}</Text>}
          description={
            <Text style={styles.description}>
              {`Materia: ${item.subject}\nFecha de entrega: ${item.dueDate}`}
            </Text>
          }
          left={props => <List.Icon {...props} icon="notebook" color="white" />}
          right={props => (
            <List.Icon 
              {...props} 
              icon={item.status === 'completed' ? 'check-circle' : 'clock-outline'}
              color={item.status === 'completed' ? '#4CAF50' : '#FFA000'}
            />
          )}
        />
      </Surface>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Mis Actividades</Text>
        <FlatList
          data={activities}
          renderItem={renderActivity}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    textAlign: 'center'
  },
  surface: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    width: '100%'
  },
  listContainer: {
    paddingBottom: 16,
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    color: '#808080'
  },
  deleteAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '90%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  }
});

export default ActivityScreen;
