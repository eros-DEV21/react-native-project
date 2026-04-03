import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Picker,
} from 'react-native';
import { PreferencesService, StorageService } from '../services/StorageService';
import {
  Button,
  Card,
  Header,
  Switch,
  Divider,
  Spacer,
  Badge,
} from '../components';

export const SettingsScreen = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
  });
  const [appInfo, setAppInfo] = useState({
    version: '1.0.0',
    lastUpdated: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const prefs = await PreferencesService.getPreferences();
    setPreferences(prefs);
  };

  const updatePreference = async (key, value) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    await PreferencesService.updatePreferences(updated);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure? This will delete all your todos and data.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Clear',
          onPress: async () => {
            await StorageService.clearAll();
            loadPreferences();
            Alert.alert('Success', 'All data cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleExportData = async () => {
    try {
      const data = await StorageService.getData('todos');
      Alert.alert('Export', 'Todos exported (console output)');
      console.log('Exported data:', JSON.stringify(data, null, 2));
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Settings" subtitle="Customize your experience" />

        {/* Preferences Section */}
        <Card title="Preferences">
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              enabled={preferences.notifications}
              onChange={(value) => updatePreference('notifications', value)}
            />
          </View>

          <Divider />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Badge
              text={
                preferences.theme === 'light' ? '☀️ Light' : '🌙 Dark'
              }
              variant="primary"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={preferences.theme}
              onValueChange={(value) => updatePreference('theme', value)}
              style={styles.picker}
            >
              <Picker.Item label="Light Mode" value="light" />
              <Picker.Item label="Dark Mode" value="dark" />
              <Picker.Item label="Auto" value="auto" />
            </Picker>
          </View>

          <Divider />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Language</Text>
            <Badge text={preferences.language.toUpperCase()} variant="success" />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={preferences.language}
              onValueChange={(value) => updatePreference('language', value)}
              style={styles.picker}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="French" value="fr" />
              <Picker.Item label="German" value="de" />
            </Picker>
          </View>
        </Card>

        <Spacer size="large" />

        {/* App Information Section */}
        <Card title="App Information">
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>{appInfo.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated:</Text>
            <Text style={styles.infoValue}>{appInfo.lastUpdated}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build:</Text>
            <Badge text="Production" variant="success" />
          </View>
        </Card>

        <Spacer size="large" />

        {/* Data Management Section */}
        <Card title="Data Management">
          <Text style={styles.description}>
            Manage your application data and storage
          </Text>

          <Button
            title="Export Data"
            onPress={handleExportData}
            variant="primary"
            size="medium"
          />

          <Button
            title="Clear All Data"
            onPress={handleClearData}
            variant="danger"
            size="medium"
          />
        </Card>

        <Spacer size="large" />

        {/* About Section */}
        <Card title="About">
          <Text style={styles.aboutText}>
            React Native Demo App showcasing:
          </Text>
          <Text style={styles.aboutFeature}>✓ AsyncStorage integration</Text>
          <Text style={styles.aboutFeature}>✓ Multiple screens with navigation</Text>
          <Text style={styles.aboutFeature}>✓ Form components</Text>
          <Text style={styles.aboutFeature}>✓ Data persistence</Text>
          <Text style={styles.aboutFeature}>✓ Settings management</Text>
          <Text style={styles.aboutFeature}>✓ Custom components library</Text>
        </Card>

        <Spacer size="large" />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 React Native Project
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  pickerContainer: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F9F9F9',
  },
  picker: {
    height: 150,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  aboutFeature: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});
