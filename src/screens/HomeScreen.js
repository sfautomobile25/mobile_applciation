import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const quickActions = [
    { icon: 'add-circle', label: 'Add Product', color: '#4CAF50' },
    { icon: 'cart', label: 'New Order', color: '#FF9800' },
    { icon: 'stats-chart', label: 'Analytics', color: '#2196F3' },
    { icon: 'people', label: 'Customers', color: '#9C27B0' },
    { icon: 'document-text', label: 'Invoices', color: '#F44336' },
    { icon: 'settings', label: 'Settings', color: '#607D8B' },
  ];

  const recentActivities = [
    { id: 1, text: 'New order #00123 received', time: '10 min ago' },
    { id: 2, text: 'Product "Business Cards" low in stock', time: '1 hour ago' },
    { id: 3, text: 'Monthly revenue target achieved', time: '2 hours ago' },
    { id: 4, text: 'New customer registered', time: '5 hours ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Business Overview</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.statValue, { color: '#1976D2' }]}>$12,580</Text>
              <Text style={styles.statLabel}>Today's Revenue</Text>
              <Ionicons name="trending-up" size={20} color="#4CAF50" style={styles.statIcon} />
            </View>
            <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.statValue, { color: '#388E3C' }]}>42</Text>
              <Text style={styles.statLabel}>New Orders</Text>
              <Ionicons name="cart" size={20} color="#FF9800" style={styles.statIcon} />
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
              <Text style={[styles.statValue, { color: '#F57C00' }]}>156</Text>
              <Text style={styles.statLabel}>Total Customers</Text>
              <Ionicons name="people" size={20} color="#9C27B0" style={styles.statIcon} />
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}>
              <Text style={[styles.statValue, { color: '#7B1FA2' }]}>89%</Text>
              <Text style={styles.statLabel}>Growth Rate</Text>
              <Ionicons name="analytics" size={20} color="#2196F3" style={styles.statIcon} />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 12,
    position: 'relative',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  activitiesList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginTop: 5,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});