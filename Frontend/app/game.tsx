import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 448;

const RESTAURANTS = [
  {
    id: '1',
    name: 'Sushi House',
    distance: '1.2km',
    price: '$$',
    rating: '4.8/5',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
  },
  {
    id: '2',
    name: 'Bella Pasta',
    distance: '0.8km',
    price: '$$',
    rating: '4.6/5',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  },
  {
    id: '3',
    name: 'Taco Fiesta',
    distance: '1.5km',
    price: '$',
    rating: '4.5/5',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  },
  {
    id: '4',
    name: 'Golden Wok',
    distance: '2.0km',
    price: '$',
    rating: '4.7/5',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
  },
];

export default function GameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlist, setShortlist] = useState<string[]>([]);

  const currentRestaurant = RESTAURANTS[currentIndex];

  const handleReject = () => {
    if (currentIndex < RESTAURANTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLike = () => {
    if (currentRestaurant) {
      setShortlist([...shortlist, currentRestaurant.id]);
    }
    if (currentIndex < RESTAURANTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleInfo = () => {
    // placeholder for info modal
  };

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#101828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SwiperEats</Text>
      </View>

      <View style={styles.content}>
        {currentRestaurant ? (
          <View style={styles.card}>
            <Image
              source={{ uri: currentRestaurant.image }}
              style={styles.cardImage}
              contentFit="cover"
            />
            <View style={styles.cardOverlay}>
              <Text style={styles.restaurantName}>{currentRestaurant.name}</Text>
              <Text style={styles.restaurantInfo}>
                {currentRestaurant.distance} - {currentRestaurant.price} -{' '}
                {currentRestaurant.rating}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No more restaurants!</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.rejectBtn]}
            onPress={handleReject}
          >
            <Ionicons name="close" size={32} color="#ff6467" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.infoBtn]}
            onPress={handleInfo}
          >
            <Ionicons name="information-circle-outline" size={32} color="#51a2ff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.likeBtn]}
            onPress={handleLike}
          >
            <Ionicons name="heart-outline" size={32} color="#05df72" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.shortlistButton}
          onPress={() => router.push('/shortlist')}
        >
          <Text style={styles.shortlistButtonText}>
            View shortlist ({shortlist.length})
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    height: 88,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#101828',
    marginLeft: 'auto',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 12,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  restaurantInfo: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  emptyCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#364153',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    marginTop: 24,
    paddingHorizontal: 26,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  rejectBtn: {
    borderWidth: 1.6,
    borderColor: '#ff6467',
  },
  infoBtn: {
    borderWidth: 1.6,
    borderColor: '#51a2ff',
  },
  likeBtn: {
    borderWidth: 1.6,
    borderColor: '#05df72',
  },
  shortlistButton: {
    backgroundColor: '#4f39f6',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  shortlistButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
