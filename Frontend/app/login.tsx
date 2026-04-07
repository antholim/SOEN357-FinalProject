import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [isLogin, setIsLogin] = useState(params.tab !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    router.replace('/menu');
  };

  const handleGuestContinue = () => {
    router.replace('/menu');
  };

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 48 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Welcome to SwiperEats</Text>

          {/* Tab Toggle */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.tabActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.tabActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="rgba(10,10,10,0.5)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="rgba(10,10,10,0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="rgba(10,10,10,0.5)"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            {isLogin && (
              <TouchableOpacity style={styles.forgotContainer}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, !isLogin && styles.submitButtonPurple]}
            onPress={handleSubmit}
          >
            <Ionicons
              name={isLogin ? 'log-in-outline' : 'person-add-outline'}
              size={20}
              color={isLogin ? '#101828' : '#fff'}
            />
            <Text
              style={[
                styles.submitButtonText,
                isLogin ? styles.submitTextDark : styles.submitTextLight,
              ]}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Bottom Links */}
          <View style={styles.bottomLinks}>
            {isLogin && (
              <TouchableOpacity onPress={handleGuestContinue}>
                <Text style={styles.linkText}>Continue as Guest</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.linkText}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already a SwiperEats user? Log in'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#101828',
    textAlign: 'center',
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 9999,
    padding: 4,
    gap: 8,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5565',
  },
  tabTextActive: {
    color: '#101828',
  },
  formContainer: {
    gap: 20,
    marginBottom: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#364153',
  },
  input: {
    borderWidth: 0.8,
    borderColor: '#d1d5dc',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0a0a0a',
    backgroundColor: 'transparent',
  },
  forgotContainer: {
    alignItems: 'flex-end',
  },
  submitButton: {
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 32,
  },
  submitButtonPurple: {
    backgroundColor: '#4f39f6',
    borderWidth: 0,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitTextDark: {
    color: '#101828',
  },
  submitTextLight: {
    color: '#fff',
  },
  bottomLinks: {
    alignItems: 'center',
    gap: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#155dfc',
    textAlign: 'center',
  },
});
