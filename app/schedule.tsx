import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Calendar as CalendarIcon,
  ArrowLeft,
  Clock, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react-native';

const scheduleData = [
  {
    id: '1',
    date: 'Monday, Jan 13',
    time: '7:00 AM - 3:00 PM',
    site: 'Site A',
    task: 'Foundation Work',
    status: 'upcoming',
  },
  {
    id: '2',
    date: 'Tuesday, Jan 14',
    time: '8:00 AM - 4:00 PM',
    site: 'Site B',
    task: 'Framing',
    status: 'upcoming',
  },
  {
    id: '3',
    date: 'Wednesday, Jan 15',
    time: '7:30 AM - 3:30 PM',
    site: 'Site C',
    task: 'Electrical',
    status: 'upcoming',
  },
];

export default function ScheduleScreen() {
  const [currentWeek, setCurrentWeek] = useState('Jan 13 - Jan 19, 2025');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>        
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Week Navigation */}
      <View style={styles.weekNavigation}>
        <TouchableOpacity style={styles.weekNavButton}>
          <ChevronLeft size={20} color="#9CA3AF" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.weekText}>{currentWeek}</Text>
        <TouchableOpacity style={styles.weekNavButton}>
          <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Schedule List */}
      <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
        {scheduleData.map((item) => (
          <View key={item.id} style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <View style={styles.dateContainer}>
                <CalendarIcon size={20} color="#3b82f6" strokeWidth={2} />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={[styles.statusBadge, styles.statusUpcoming]}>
                <Text style={styles.statusText}>Scheduled</Text>
              </View>
            </View>
            
            <View style={styles.scheduleDetails}>
              <View style={styles.detailRow}>
                <Clock size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.detailText}>{item.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.detailText}>{item.site}</Text>
              </View>
            </View>

            <Text style={styles.taskText}>{item.task}</Text>
          </View>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1F2937',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3b82f6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  weekNavButton: {
    padding: 8,
  },
  weekText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scheduleCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusUpcoming: {
    backgroundColor: '#1E40AF',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#93C5FD',
  },
  scheduleDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    marginLeft: 8,
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 20,
  },
});