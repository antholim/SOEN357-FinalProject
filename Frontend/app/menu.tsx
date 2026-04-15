import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CUISINES = [
  'Thai',
  'Chinese',
  'Italian',
  'Mexican',
  'Indian',
  'Mongolian',
  'American',
];

const BUDGETS = ['$', '$$', '$$$'];

export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(CUISINES);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleStart = () => {
    router.push('/game');
  };

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 48 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>What are you craving?</Text>

        <View style={styles.cuisineContainer}>
          {CUISINES.map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              style={[styles.cuisineChip, selectedCuisines.includes(cuisine) && styles.cuisineChipActive]}
              onPress={() => toggleCuisine(cuisine)}
            >
              <Text
                style={[
                  styles.cuisineText,
                  selectedCuisines.includes(cuisine) && styles.cuisineTextActive,
                ]}
              >
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.budgetHeading}>Budget</Text>

        <View style={styles.budgetContainer}>
          {BUDGETS.map((budget) => (
            <TouchableOpacity
              key={budget}
              style={[styles.budgetChip, selectedBudget === budget && styles.budgetChipActive]}
              onPress={() => setSelectedBudget(selectedBudget === budget ? null : budget)}
            >
              <Text
                style={[
                  styles.budgetText,
                  selectedBudget === budget && styles.budgetTextActive,
                ]}
              >
                {budget}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Let the swipping begin!</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#101828',
    textAlign: 'center',
    marginBottom: 32,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 40,
  },
  cuisineChip: {
    backgroundColor: '#fff',
    borderWidth: 1.6,
    borderColor: '#d1d5dc',
    borderRadius: 9999,
    paddingHorizontal: 20,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuisineChipActive: {
    backgroundColor: '#4f39f6',
    borderColor: '#4f39f6',
  },
  cuisineText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#364153',
  },
  cuisineTextActive: {
    color: '#fff',
  },
  budgetHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
    marginBottom: 24,
  },
  budgetContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 48,
  },
  budgetChip: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.6,
    borderColor: '#d1d5dc',
    borderRadius: 9999,
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetChipActive: {
    backgroundColor: '#4f39f6',
    borderColor: '#4f39f6',
  },
  budgetText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#364153',
  },
  budgetTextActive: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#4f39f6',
    borderRadius: 16,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
