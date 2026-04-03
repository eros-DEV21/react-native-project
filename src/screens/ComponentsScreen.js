import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  SectionList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Card,
  Header,
  Badge,
  Divider,
  Spacer,
  Input,
  Checkbox,
} from '../components';

export const ComponentsScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false,
  });
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = (key) => {
    setCheckedItems({
      ...checkedItems,
      [key]: !checkedItems[key],
    });
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Async operation completed!');
    }, 2000);
  };

  const componentSections = [
    {
      title: 'Text Components',
      data: [
        { id: '1', name: 'Text', description: 'Basic text display' },
        { id: '2', name: 'Header', description: 'Large header text' },
      ],
    },
    {
      title: 'Input Components',
      data: [
        { id: '3', name: 'TextInput', description: 'Text input field' },
        {
          id: '4',
          name: 'Checkbox',
          description: 'Checkbox control',
        },
      ],
    },
    {
      title: 'Button Components',
      data: [
        { id: '5', name: 'Button', description: 'Interactive button' },
        {
          id: '6',
          name: 'TouchableOpacity',
          description: 'Pressable element',
        },
      ],
    },
    {
      title: 'Container Components',
      data: [
        { id: '7', name: 'View', description: 'Basic container' },
        { id: '8', name: 'ScrollView', description: 'Scrollable content' },
        { id: '9', name: 'FlatList', description: 'Efficient list' },
        { id: '10', name: 'SectionList', description: 'Sectioned list' },
      ],
    },
    {
      title: 'Modal & Feedback',
      data: [
        { id: '11', name: 'Modal', description: 'Modal dialog' },
        { id: '12', name: 'Alert', description: 'Alert dialog' },
        { id: '13', name: 'ActivityIndicator', description: 'Loading spinner' },
      ],
    },
  ];

  const renderSectionItem = ({ item }) => (
    <View style={styles.sectionItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Component Library"
          subtitle="Explore all available components"
        />

        {/* Input Components Demo */}
        <Card title="Text Input Demo">
          <Input
            label="Enter some text"
            placeholder="Type here..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Text style={styles.displayValue}>
            {inputValue ? `You typed: ${inputValue}` : 'Start typing...'}
          </Text>
        </Card>

        <Spacer />

        {/* Checkbox Demo */}
        <Card title="Checkbox Demo">
          <Checkbox
            label="Checkbox Option 1"
            checked={checkedItems.item1}
            onChange={() => toggleCheckbox('item1')}
          />
          <Checkbox
            label="Checkbox Option 2"
            checked={checkedItems.item2}
            onChange={() => toggleCheckbox('item2')}
          />
          <Checkbox
            label="Checkbox Option 3"
            checked={checkedItems.item3}
            onChange={() => toggleCheckbox('item3')}
          />
        </Card>

        <Spacer />

        {/* Badge Demo */}
        <Card title="Badge Variants">
          <View style={styles.badgeRow}>
            <Badge text="Primary" variant="primary" />
            <Badge text="Success" variant="success" />
          </View>
          <View style={styles.badgeRow}>
            <Badge text="Warning" variant="warning" />
            <Badge text="Danger" variant="danger" />
          </View>
        </Card>

        <Spacer />

        {/* Button Variants Demo */}
        <Card title="Button Variants">
          <Button title="Primary Button" variant="primary" onPress={() => {}} />
          <Button
            title="Secondary Button"
            variant="secondary"
            onPress={() => {}}
          />
          <Button
            title="Success Button"
            variant="success"
            onPress={() => {}}
          />
          <Button title="Danger Button" variant="danger" onPress={() => {}} />
        </Card>

        <Spacer />

        {/* Button Sizes Demo */}
        <Card title="Button Sizes">
          <Button title="Small" size="small" variant="primary" onPress={() => {}} />
          <Button
            title="Medium (Default)"
            size="medium"
            variant="primary"
            onPress={() => {}}
          />
          <Button
            title="Large"
            size="large"
            variant="primary"
            onPress={() => {}}
          />
        </Card>

        <Spacer />

        {/* Alert Demo */}
        <Card title="Alert Examples">
          <Button
            title="Show Info Alert"
            onPress={() => showAlert('Info', 'This is an information alert')}
            variant="primary"
          />
          <Button
            title="Show Warning Alert"
            onPress={() =>
              showAlert('Warning', 'Please be careful with this action')
            }
            variant="warning"
          />
          <Button
            title="Show Success Alert"
            onPress={() => showAlert('Success', 'Operation completed!')}
            variant="success"
          />
        </Card>

        <Spacer />

        {/* Loading Demo */}
        <Card title="Loading State">
          <Button
            title={loading ? 'Processing...' : 'Start Async Action'}
            onPress={handleAsyncAction}
            loading={loading}
            disabled={loading}
            variant="primary"
          />
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loaderText}>Processing...</Text>
            </View>
          )}
        </Card>

        <Spacer />

        {/* Component List with SectionList */}
        <Card title="All React Native Components">
          <SectionList
            sections={componentSections}
            keyExtractor={(item) => item.id}
            renderItem={renderSectionItem}
            renderSectionHeader={renderSectionHeader}
            scrollEnabled={false}
          />
        </Card>

        <Spacer size="large" />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This screen demonstrates various React Native components
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  displayValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  sectionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    marginVertical: 4,
    borderRadius: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
});
