import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
} from 'react-native';
import { TodoService } from '../services/StorageService';
import {
  Button,
  Card,
  Header,
  Input,
  Checkbox,
  Spacer,
} from '../components';

export const TodosScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await TodoService.getTodos();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      Alert.alert('Error', 'Please enter a todo');
      return;
    }

    await TodoService.addTodo({
      text: newTodo,
      completed: false,
    });

    setNewTodo('');
    setModalVisible(false);
    loadTodos();
    Alert.alert('Success', 'Todo added successfully');
  };

  const toggleTodo = async (id, currentStatus) => {
    await TodoService.updateTodo(id, { completed: !currentStatus });
    loadTodos();
  };

  const deleteTodo = async (id) => {
    Alert.alert('Delete Todo', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          await TodoService.deleteTodo(id);
          loadTodos();
        },
        style: 'destructive',
      },
    ]);
  };

  const getFilteredTodos = () => {
    if (filterStatus === 'completed') return todos.filter((t) => t.completed);
    if (filterStatus === 'pending') return todos.filter((t) => !t.completed);
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  const renderTodoItem = ({ item }) => (
    <Card style={styles.todoCard}>
      <View style={styles.todoRow}>
        <Checkbox
          checked={item.completed}
          onChange={() => toggleTodo(item.id, item.completed)}
        />
        <Text
          style={[
            styles.todoText,
            item.completed && styles.todoTextCompleted,
          ]}
        >
          {item.text}
        </Text>
      </View>
      <View style={styles.todoActions}>
        <Button
          title="Delete"
          onPress={() => deleteTodo(item.id)}
          variant="danger"
          size="small"
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Todos" subtitle="Manage your tasks" />

      <View style={styles.filterContainer}>
        <Button
          title="All"
          onPress={() => setFilterStatus('all')}
          variant={filterStatus === 'all' ? 'primary' : 'secondary'}
          size="small"
        />
        <Button
          title="Pending"
          onPress={() => setFilterStatus('pending')}
          variant={filterStatus === 'pending' ? 'primary' : 'secondary'}
          size="small"
        />
        <Button
          title="Completed"
          onPress={() => setFilterStatus('completed')}
          variant={filterStatus === 'completed' ? 'primary' : 'secondary'}
          size="small"
        />
      </View>

      <View style={styles.contentContainer}>
        {filteredTodos.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>
              {filterStatus === 'all'
                ? 'No todos yet. Add one to get started!'
                : `No ${filterStatus} todos`}
            </Text>
          </Card>
        ) : (
          <FlatList
            data={filteredTodos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={false}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Button
          title="+ Add New Todo"
          onPress={() => setModalVisible(true)}
          variant="success"
          size="large"
        />
      </View>

      {/* Modal for adding new todo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Header title="Add New Todo" />
            <Input
              placeholder="What do you need to do?"
              value={newTodo}
              onChangeText={setNewTodo}
              multiline={true}
              numberOfLines={4}
            />

            <Spacer />

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                variant="secondary"
              />
              <Button
                title="Add Todo"
                onPress={addTodo}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'space-around',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  todoCard: {
    marginVertical: 8,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  todoText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginLeft: 8,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 24,
    maxHeight: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});
