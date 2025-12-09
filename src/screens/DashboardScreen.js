import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Dashboard</Text>
        <Text style={styles.subtitle}>Overview & Analytics</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Revenue Summary</Text>
        <View style={styles.metricRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>$45,230</Text>
            <Text style={styles.metricLabel}>This Month</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>$12,580</Text>
            <Text style={styles.metricLabel}>This Week</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>$1,850</Text>
            <Text style={styles.metricLabel}>Today</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Performance Metrics</Text>
        <View style={styles.metricContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>156</Text>
            <Text style={styles.metricText}>Total Orders</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>89%</Text>
            <Text style={styles.metricText}>Completion Rate</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNumber}>4.8</Text>
            <Text style={styles.metricText}>Avg. Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Products</Text>
        {['Business Cards', 'Flyers', 'Banners', 'Stickers', 'Brochures'].map((product, index) => (
          <View key={index} style={styles.productItem}>
            <Text style={styles.productName}>{product}</Text>
            <Text style={styles.productSales}>${(1000 - index * 150).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#eee',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
  productSales: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});