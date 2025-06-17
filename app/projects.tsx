import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FolderOpen, Plus, Users, Calendar, ChartBar as BarChart3, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

const projectsData = [
  {
    id: '1',
    name: 'Downtown Office Complex',
    client: 'ABC Corp',
    progress: 75,
    dueDate: 'Mar 15, 2025',
    team: 8,
    location: 'Downtown',
    status: 'active',
  },
  {
    id: '2',
    name: 'Residential Complex A',
    client: 'XYZ Development',
    progress: 45,
    dueDate: 'Apr 20, 2025',
    team: 12,
    location: 'North Side',
    status: 'active',
  },
  {
    id: '3',
    name: 'Shopping Center Renovation',
    client: 'Retail Solutions',
    progress: 90,
    dueDate: 'Feb 28, 2025',
    team: 6,
    location: 'West End',
    status: 'active',
  },
];

export default function ProjectsScreen() {
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
        <Text style={styles.title}>Projects</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#ffffff" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <FolderOpen size={24} color="#3b82f6" strokeWidth={2} />
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>
        <View style={styles.statCard}>
          <BarChart3 size={24} color="#10B981" strokeWidth={2} />
          <Text style={styles.statValue}>70%</Text>
          <Text style={styles.statLabel}>Avg Progress</Text>
        </View>
      </View>

      {/* Projects List */}
      <ScrollView style={styles.projectsContainer} showsVerticalScrollIndicator={false}>
        {projectsData.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.clientName}>{project.client}</Text>
              </View>
              <View style={[styles.statusBadge, styles.statusActive]}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${project.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{project.progress}%</Text>
            </View>

            {/* Project Details */}
            <View style={styles.projectDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.detailText}>Due: {project.dueDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Users size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.detailText}>{project.team} team members</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#9CA3AF" strokeWidth={2} />
                <Text style={styles.detailText}>{project.location}</Text>
              </View>
            </View>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  projectsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  projectCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  clientName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: '#065F46',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    minWidth: 35,
  },
  projectDetails: {
    gap: 8,
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
  bottomSpacing: {
    height: 20,
  },
});