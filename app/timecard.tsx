import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Plus,
  ChevronDown,
  Clock,
  MapPin,
  Hammer,
  X,
  Check,
} from 'lucide-react-native';
interface TimeEntry {
  id: string;
  day: string;
  site: string;
  task: string;
  hours: number;
}

const initialTimeEntries: TimeEntry[] = [
  {
    id: '1',
    day: 'Monday',
    site: 'Site A',
    task: 'Welding',
    hours: 8,
  },
  {
    id: '2',
    day: 'Tuesday',
    site: 'Site B',
    task: 'Framing',
    hours: 7,
  },
  {
    id: '3',
    day: 'Wednesday',
    site: 'Site C',
    task: 'Drywall',
    hours: 8,
  },
];

export default function TimecardScreen() {
  const [timeEntries, setTimeEntries] =
    useState<TimeEntry[]>(initialTimeEntries);
  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Current Week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    day: '',
    site: '',
    task: '',
    hours: '',
  });

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  const handleAddEntry = () => {
    if (!newEntry.day || !newEntry.site || !newEntry.task || !newEntry.hours) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const entry: TimeEntry = {
      id: Date.now().toString(),
      day: newEntry.day,
      site: newEntry.site,
      task: newEntry.task,
      hours: parseFloat(newEntry.hours),
    };

    setTimeEntries([...timeEntries, entry]);
    setNewEntry({ day: '', site: '', task: '', hours: '' });
    setShowAddModal(false);
  };

  const weekOptions = [
    'Current Week',
    'Last Week',
    'Week of Jan 6-12',
    'Week of Dec 30-Jan 5',
  ];

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
        <Text style={styles.title}>Time Card</Text>
        <View style={styles.placeholder} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus size={24} color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Total Hours */}
      <View style={styles.totalContainer}>
        <Clock size={24} color="#3b82f6" strokeWidth={2} />
        <Text style={styles.totalText}>Total: {totalHours} hrs</Text>
      </View>

      {/* Week Selector */}
      <TouchableOpacity
        style={styles.weekSelector}
        onPress={() => setShowWeekPicker(true)}
      >
        <Text style={styles.weekSelectorText}>{selectedWeek}</Text>
        <ChevronDown size={20} color="#9CA3AF" strokeWidth={2} />
      </TouchableOpacity>

      {/* Time Entries */}
      <ScrollView
        style={styles.entriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {timeEntries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryDay}>{entry.day}</Text>
              <Text style={styles.entryHours}>{entry.hours} hrs</Text>
            </View>
            <View style={styles.entryDetails}>
              <View style={styles.entryDetailRow}>
                <MapPin size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.entryDetailText}>{entry.site}</Text>
              </View>
              <View style={styles.entryDetailRow}>
                <Hammer size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.entryDetailText}>{entry.task}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Week Picker Modal */}
      <Modal
        visible={showWeekPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWeekPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Week</Text>
              <TouchableOpacity onPress={() => setShowWeekPicker(false)}>
                <X size={24} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            {weekOptions.map((week) => (
              <TouchableOpacity
                key={week}
                style={styles.weekOption}
                onPress={() => {
                  setSelectedWeek(week);
                  setShowWeekPicker(false);
                }}
              >
                <Text style={styles.weekOptionText}>{week}</Text>
                {selectedWeek === week && (
                  <Check size={20} color="#3b82f6" strokeWidth={2} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Add Entry Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Time Entry</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Day</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Thursday"
                placeholderTextColor="#6B7280"
                value={newEntry.day}
                onChangeText={(text) => setNewEntry({ ...newEntry, day: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Site</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Site D"
                placeholderTextColor="#6B7280"
                value={newEntry.site}
                onChangeText={(text) =>
                  setNewEntry({ ...newEntry, site: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Task</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Electrical"
                placeholderTextColor="#6B7280"
                value={newEntry.task}
                onChangeText={(text) =>
                  setNewEntry({ ...newEntry, task: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Hours</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 8"
                placeholderTextColor="#6B7280"
                value={newEntry.hours}
                onChangeText={(text) =>
                  setNewEntry({ ...newEntry, hours: text })
                }
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={styles.addEntryButton}
              onPress={handleAddEntry}
            >
              <Text style={styles.addEntryButtonText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
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
  placeholder: {
    width: 44,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  totalText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  weekSelectorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  entriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  entryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDay: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  entryHours: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#3b82f6',
  },
  entryDetails: {
    gap: 8,
  },
  entryDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDetailText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1F2937',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  weekOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  weekOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#D1D5DB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  addEntryButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  addEntryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 20,
  },
});
