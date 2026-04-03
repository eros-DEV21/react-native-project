# React Native Project

A comprehensive React Native application demonstrating best practices, featuring AsyncStorage integration, navigation, and a wide variety of UI components.

## 🚀 Features

### Core Features
- ✅ **AsyncStorage Integration** - Data persistence with async/await patterns
- ✅ **Bottom Tab Navigation** - Multi-screen navigation with React Navigation
- ✅ **Todo Management** - Full CRUD operations with local storage
- ✅ **Settings Management** - User preferences and app configuration
- ✅ **Component Library** - Reusable, custom-built UI components

### UI Components Included
- **Text & Display**: Text, Header, Badge, Divider
- **Input Controls**: TextInput, Checkbox, Switch
- **Actions**: Button (multiple variants and sizes)
- **Containers**: View, ScrollView, FlatList, SectionList, SafeAreaView
- **Feedback**: Alert, ActivityIndicator, Modal
- **Layout**: Card, Spacer, Custom styling

### Screens
1. **Home Screen** - Dashboard with app statistics and overview
2. **Todos Screen** - Complete todo list with filtering and modal for adding items
3. **Components Screen** - Interactive showcase of all components
4. **Settings Screen** - App preferences, theme selection, and data management

## 📁 Project Structure

```
react-native-project/
├── App.js                          # Main app entry point with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── src/
│   ├── screens/                    # Screen components
│   │   ├── HomeScreen.js
│   │   ├── TodosScreen.js
│   │   ├── ComponentsScreen.js
│   │   ├── SettingsScreen.js
│   │   └── index.js
│   ├── components/                 # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── CommonComponents.js
│   │   └── index.js
│   ├── services/                   # Business logic & storage
│   │   └── StorageService.js
│   └── utils/                      # Utility functions
└── assets/                         # Images, fonts, etc.
```

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (for running the app)

### Setup Steps

1. **Navigate to the project:**
   ```bash
   cd react-native-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device:**
   - **iOS**: Press `i` after starting the dev server
   - **Android**: Press `a` after starting the dev server
   - **Web**: Press `w` after starting the dev server

## 📱 Available Commands

```bash
# Start development server
npm start

# Run on Android emulator/device
npm run android

# Run on iOS simulator/device
npm run ios

# Run on web browser
npm run web

# Eject from Expo (one-way operation)
npm run eject
```

## 🎯 AsyncStorage Usage

### Basic Operations

```javascript
import { StorageService, TodoService, PreferencesService } from './src/services/StorageService';

// Save data
await StorageService.saveData('key', { data: 'value' });

// Get data
const data = await StorageService.getData('key');

// Remove data
await StorageService.removeData('key');

// Clear all
await StorageService.clearAll();
```

### Todo Management

```javascript
// Get all todos
const todos = await TodoService.getTodos();

// Add todo
const newTodo = await TodoService.addTodo({ text: 'Buy milk', completed: false });

// Update todo
await TodoService.updateTodo(todoId, { completed: true });

// Delete todo
await TodoService.deleteTodo(todoId);
```

### User Preferences

```javascript
// Get preferences
const prefs = await PreferencesService.getPreferences();

// Update preferences
await PreferencesService.updatePreferences({ theme: 'dark', notifications: false });
```

## 🎨 Component Usage

### Button Component

```javascript
import { Button } from './src/components';

<Button
  title="Click me"
  onPress={() => console.log('Pressed')}
  variant="primary"     // primary | secondary | danger | success
  size="medium"         // small | medium | large
  loading={false}
/>
```

### Input Component

```javascript
import { Input, Checkbox, Switch } from './src/components';

<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  multiline={false}
  error={emailError}
/>

<Checkbox
  label="I agree"
  checked={agreed}
  onChange={setAgreed}
/>

<Switch
  enabled={enabled}
  onChange={setEnabled}
/>
```

### Card Component

```javascript
import { Card, Header, Badge, Spacer } from './src/components';

<Card title="My Card">
  <Text>Card content here</Text>
</Card>

<Header title="Main Title" subtitle="Subtitle" />

<Badge text="New" variant="success" />

<Spacer size="medium" />
```

## 🔄 State Management

The app uses React hooks for state management:
- `useState` - Component state
- `useEffect` - Side effects and async operations

## 📚 Dependencies

### Core
- `react` - UI library
- `react-native` - Mobile framework
- `expo` - Development platform

### Storage
- `@react-native-async-storage/async-storage` - Persistent storage

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/stack` - Stack navigation
- `react-native-screens` - Native screen handling
- `react-native-safe-area-context` - Safe area support

### Other
- `expo-status-bar` - Status bar management

## 🌟 Component Examples

### Todos Screen Highlights
- **FlatList** for efficient list rendering
- **Modal** for adding new todos
- **Filter buttons** for status filtering
- **RefreshControl** for pull-to-refresh
- **AsyncStorage integration** for data persistence

### Settings Screen Highlights
- **Picker** component for language/theme selection
- **Switch** component for toggles
- **Badge** component for status display
- **Alert** for confirmations
- **Data management functions**

### Components Screen Highlights
- **SectionList** for organized component display
- **Input** fields with validation
- **Multiple button variants** and sizes
- **ActivityIndicator** for loading states
- **All component showcase**

## 🚨 Error Handling

The app includes error handling for:
- Async storage operations
- Data loading and persistence
- User input validation
- Alert confirmations

## 📝 Best Practices Implemented

1. **Component Reusability** - Custom components for common UI patterns
2. **Service Layer** - Separated business logic in StorageService
3. **Async/Await** - Modern async operation handling
4. **Error Boundaries** - Try-catch blocks for safe operations
5. **Responsive Design** - Works on different screen sizes
6. **Code Organization** - Clear folder structure
7. **Naming Conventions** - Consistent, descriptive names
8. **Configuration** - Centralized settings management

## 🐛 Troubleshooting

### Dependencies not installing
```bash
npm install --legacy-peer-deps
```

### Port already in use (Expo)
```bash
npm start -c
```

### AsyncStorage not working
- Ensure the app has storage permissions
- Check that AsyncStorage is properly installed
- Verify data is being saved with console logs

### Build issues
- Clear Expo cache: `rm -rf .expo`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Coding! 🎉**