import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { TodoService } from '../services/StorageService';
import {
  Button,
  Card,
  Header,
  Input,
  Spacer,
  Divider,
} from '../components';

export const HomeScreen = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await TodoService.getTodos();
      setTodos(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header
        title="Task Manager"
        subtitle="Organize your daily tasks with AsyncStorage"
      />

      <Card title="Statistics">
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todos.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todos.length - completedCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </Card>

      <Spacer />

      <Card title="Quick Actions">
        <Button
          title="Go to Todo List"
          onPress={() => {}}
          variant="primary"
          size="medium"
        />
        <Button
          title="Add New Task"
          onPress={() => {}}
          variant="success"
          size="medium"
        />
      </Card>

      <Spacer />

      <Card title="About This App">
        <Text style={styles.description}>
          This comprehensive React Native app demonstrates:
        </Text>
        <Text style={styles.feature}>• AsyncStorage for data persistence</Text>
        <Text style={styles.feature}>• ScrollView and RefreshControl</Text>
        <Text style={styles.feature}>• FlatList for rendering lists</Text>
        <Text style={styles.feature}>• TextInput and form controls</Text>
        <Text style={styles.feature}>• Modal dialogs</Text>
        <Text style={styles.feature}>• Navigation between screens</Text>
        <Text style={styles.feature}>• Custom components and styling</Text>
        <Text style={styles.feature}>• State management with hooks</Text>
      </Card>

      <Divider />

      <View style={styles.footer}>
        <Text style={styles.footerText}>React Native Demo App v1.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  feature: {
    fontSize: 13,
    color: '#666',
    marginVertical: 2,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});
