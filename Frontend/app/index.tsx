import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/login-hero.jpg')}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push({ pathname: '/login', params: { tab: 'login' } })}
          >
            <Ionicons name="log-in-outline" size={20} color="#101828" />
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push({ pathname: '/login', params: { tab: 'signup' } })}
          >
            <Ionicons name="person-add-outline" size={20} color="#fff" />
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: 340,
    height: 340,
    borderRadius: 197,
    overflow: 'hidden',
    marginBottom: 60,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 308,
    gap: 16,
  },
  loginButton: {
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
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
  },
  signupButton: {
    backgroundColor: '#4f39f6',
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
