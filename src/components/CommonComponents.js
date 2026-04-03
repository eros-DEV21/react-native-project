import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Card = ({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

export const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export const Badge = ({ text, variant = 'primary', style }) => {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`], style]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

export const Divider = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

export const Spacer = ({ size = 'medium', horizontal = false }) => {
  const sizeMap = {
    small: 8,
    medium: 16,
    large: 24,
  };
  const dimension = sizeMap[size] || 16;

  return (
    <View
      style={
        horizontal ? { width: dimension } : { height: dimension }
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  header: {
    marginVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badge_primary: {
    backgroundColor: '#007AFF',
  },
  badge_success: {
    backgroundColor: '#34C759',
  },
  badge_warning: {
    backgroundColor: '#FF9500',
  },
  badge_danger: {
    backgroundColor: '#FF3B30',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
});
