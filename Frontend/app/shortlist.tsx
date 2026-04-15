import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RESTAURANTS } from '../constants/restaurants';
import { useShortlist } from '../context/ShortlistContext';

export default function ShortlistScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { shortlist } = useShortlist();

  const shortlistedRestaurants = RESTAURANTS.filter(r => shortlist.includes(r.id));

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/game');
    }
  };

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#101828" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Shortlist</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{shortlistedRestaurants.length}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {shortlistedRestaurants.length > 0 ? (
          shortlistedRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image
                  source={{ uri: restaurant.image }}
                  style={styles.cardImage}
                  contentFit="cover"
                />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardName}>{restaurant.name}</Text>
                    <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#f59e0b" />
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text style={styles.metaText}>{restaurant.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={16} color="#6b7280" />
                    <Text style={styles.metaText}>{restaurant.distance}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book a table</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>Your shortlist is empty</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/game')}
            >
              <Text style={styles.exploreButtonText}>Start Swiping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },
  countBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 9999,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
    width: '100%',
    alignSelf: 'center',
  },
  cardImageContainer: {
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 16,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#101828',
  },
  cardCuisine: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  bookButton: {
    backgroundColor: '#4f39f6',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
  },
  exploreButton: {
    backgroundColor: '#4f39f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
