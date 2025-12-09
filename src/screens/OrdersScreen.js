import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  const statusFilters = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];
  
  const orders = [
    { 
      id: 'ORD001', 
      customer: 'John Smith', 
      amount: '$149.99', 
      status: 'Pending',
      date: '2024-01-15',
      items: 3,
    },
    { 
      id: 'ORD002', 
      customer: 'Sarah Johnson', 
      amount: '$89.99', 
      status: 'Processing',
      date: '2024-01-14',
      items: 2,
    },
    { 
      id: 'ORD003', 
      customer: 'Mike Wilson', 
      amount: '$249.99', 
      status: 'Completed',
      date: '2024-01-13',
      items: 5,
    },
    { 
      id: 'ORD004', 
      customer: 'Emma Davis', 
      amount: '$59.99', 
      status: 'Cancelled',
      date: '2024-01-12',
      items: 1,
    },
    { 
      id: 'ORD005', 
      customer: 'Robert Brown', 
      amount: '$179.99', 
      status: 'Pending',
      date: '2024-01-11',
      items: 4,
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#FF9800';
      case 'Processing': return '#2196F3';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.orderCustomer}>{item.customer}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cube-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.items} items</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.amount}</Text>
        </View>
      </View>
      
      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye-outline" size={18} color="#007AFF" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="print-outline" size={18} color="#666" />
          <Text style={styles.actionText}>Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={18} color="#666" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
        <View style={styles.headerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$12,580</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>
      </View>

      {/* Status Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {statusFilters.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterChip,
              selectedStatus === status && styles.filterChipActive
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={[
              styles.filterText,
              selectedStatus === status && styles.filterTextActive
            ]}>
              {status}
            </Text>
            {status !== 'All' && (
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>
                  {orders.filter(o => o.status === status).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Orders List */}
      <FlatList
        data={orders.filter(order => 
          selectedStatus === 'All' || order.status === selectedStatus
        )}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
  filters: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  filterCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ordersList: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderCustomer: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});