import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Shield, Moon, Globe, CircleHelp as HelpCircle, FileText, Star, ChevronRight, Smartphone, Clock, Mail, Lock, Eye, Database, Trash2 } from 'lucide-react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push-notifications',
          title: 'Push Notifications',
          subtitle: 'Receive alerts and updates',
          icon: Bell,
          type: 'toggle' as const,
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'email-notifications',
          title: 'Email Notifications',
          subtitle: 'Get updates via email',
          icon: Mail,
          type: 'toggle' as const,
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          id: 'biometric',
          title: 'Biometric Login',
          subtitle: 'Use fingerprint or face ID',
          icon: Shield,
          type: 'toggle' as const,
          value: biometric,
          onToggle: setBiometric,
        },
        {
          id: 'change-password',
          title: 'Change Password',
          subtitle: 'Update your account password',
          icon: Lock,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Feature', 'Password change coming soon'),
        },
        {
          id: 'privacy-settings',
          title: 'Privacy Settings',
          subtitle: 'Manage your data privacy',
          icon: Eye,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Feature', 'Privacy settings coming soon'),
        },
      ],
    },
    {
      title: 'App Preferences',
      items: [
        {
          id: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          icon: Moon,
          type: 'toggle' as const,
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'auto-sync',
          title: 'Auto Sync',
          subtitle: 'Automatically sync data',
          icon: Database,
          type: 'toggle' as const,
          value: autoSync,
          onToggle: setAutoSync,
        },
        {
          id: 'time-format',
          title: 'Time Format',
          subtitle: '12-hour format',
          icon: Clock,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Feature', 'Time format settings coming soon'),
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English (US)',
          icon: Globe,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Feature', 'Language settings coming soon'),
        },
      ],
    },
    {
      title: 'Support & About',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          icon: HelpCircle,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Support', 'Contact support at support@securetime.com'),
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          icon: FileText,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Terms', 'Terms of service coming soon'),
        },
        {
          id: 'rate',
          title: 'Rate App',
          subtitle: 'Rate us on the app store',
          icon: Star,
          type: 'navigation' as const,
          onPress: () => Alert.alert('Thank you!', 'Rating feature coming soon'),
        },
        {
          id: 'version',
          title: 'App Version',
          subtitle: 'v1.0.0',
          icon: Smartphone,
          type: 'navigation' as const,
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          id: 'clear-data',
          title: 'Clear Local Data',
          subtitle: 'Remove all local app data',
          icon: Trash2,
          type: 'action' as const,
          color: '#EF4444',
          onPress: () => {
            Alert.alert(
              'Clear Data',
              'This will remove all local data. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Clear', 
                  style: 'destructive',
                  onPress: () => Alert.alert('Success', 'Local data cleared')
                }
              ]
            );
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    const IconComponent = item.icon;
    const iconColor = item.color || '#9CA3AF';
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingLeft}>
          <View style={[styles.settingIcon, item.color && { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={iconColor} strokeWidth={2} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, item.color && { color: item.color }]}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.settingRight}>
          {item.type === 'toggle' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#374151', true: '#2563EB' }}
              thumbColor={item.value ? '#ffffff' : '#9CA3AF'}
            />
          )}
          {item.type === 'navigation' && item.id !== 'version' && (
            <ChevronRight size={20} color="#6B7280" strokeWidth={2} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  settingRight: {
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#374151',
    marginLeft: 68,
  },
  bottomSpacing: {
    height: 40,
  },
});