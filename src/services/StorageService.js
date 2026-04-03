import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TODOS: 'todos',
  USER_PREFERENCES: 'userPreferences',
  NOTES: 'notes',
  SETTINGS: 'settings',
};

// Generic AsyncStorage operations
export const StorageService = {
  /**
   * Save data to AsyncStorage
   */
  saveData: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Data saved to ${key}`);
      return true;
    } catch (error) {
      console.error(`Error saving data to ${key}:`, error);
      return false;
    }
  },

  /**
   * Retrieve data from AsyncStorage
   */
  getData: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving data from ${key}:`, error);
      return null;
    }
  },

  /**
   * Delete data from AsyncStorage
   */
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed from ${key}`);
      return true;
    } catch (error) {
      console.error(`Error removing data from ${key}:`, error);
      return false;
    }
  },

  /**
   * Clear all AsyncStorage data
   */
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared');
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  },
};

// Todo-specific operations
export const TodoService = {
  getTodos: async () => {
    const todos = await StorageService.getData(STORAGE_KEYS.TODOS);
    return todos || [];
  },

  addTodo: async (todo) => {
    const todos = await TodoService.getTodos();
    const newTodo = {
      id: Date.now().toString(),
      ...todo,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    await StorageService.saveData(STORAGE_KEYS.TODOS, todos);
    return newTodo;
  },

  updateTodo: async (id, updates) => {
    const todos = await TodoService.getTodos();
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
      await StorageService.saveData(STORAGE_KEYS.TODOS, todos);
    }
    return todos[index] || null;
  },

  deleteTodo: async (id) => {
    const todos = await TodoService.getTodos();
    const filtered = todos.filter((t) => t.id !== id);
    await StorageService.saveData(STORAGE_KEYS.TODOS, filtered);
    return true;
  },
};

// User Preferences
export const PreferencesService = {
  getPreferences: async () => {
    const prefs = await StorageService.getData(STORAGE_KEYS.USER_PREFERENCES);
    return (
      prefs || {
        theme: 'light',
        notifications: true,
        language: 'en',
      }
    );
  },

  updatePreferences: async (updates) => {
    const prefs = await PreferencesService.getPreferences();
    const updated = { ...prefs, ...updates };
    await StorageService.saveData(STORAGE_KEYS.USER_PREFERENCES, updated);
    return updated;
  },
};

export default { StorageService, TodoService, PreferencesService };
