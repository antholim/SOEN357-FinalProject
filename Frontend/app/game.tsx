import { useState, useCallback, memo, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
  Extrapolation,
} from 'react-native-reanimated';
import { RESTAURANTS } from '../constants/restaurants';
import { useShortlist } from '../context/ShortlistContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 448;
const SWIPE_THRESHOLD = width * 0.25;

const SwipeCard = memo(({ restaurant, translateX, role, gesture, webStyles }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (role === 'top') {
      const rotate = interpolate(translateX.value, [-width / 2, 0, width / 2], [-15, 0, 15]);
      return {
        transform: [
          { translateX: translateX.value },
          { rotate: `${rotate}deg` },
          { scale: 1 }
        ],
        opacity: 1,
        zIndex: 10,
      };
    }
    
    if (role === 'back') {
      const absX = Math.abs(translateX.value);
      const scale = interpolate(absX, [0, width / 2], [0.92, 1], Extrapolation.CLAMP);
      const opacity = interpolate(absX, [0, width / 2], [0.8, 1], Extrapolation.CLAMP);
      
      return {
        transform: [{ translateX: 0 }, { rotate: '0deg' }, { scale }],
        opacity,
        zIndex: 5,
      };
    }

    return {
      transform: [{ translateX: 0 }, { rotate: '0deg' }, { scale: 0.9 }],
      opacity: 0,
      zIndex: 1,
    };
  });

  return (
    <GestureDetector gesture={role === 'top' ? gesture : Gesture.Pan().enabled(false)}>
      <Animated.View style={[styles.card, animatedStyle, !restaurant && { display: 'none' }, webStyles]}>
        {restaurant && (
          <>
            <Image
              source={{ uri: restaurant.image }}
              style={styles.cardImage}
              contentFit="cover"
              transition={0}
              // @ts-ignore: draggable is a web-only prop
              draggable={false}
              pointerEvents="none"
            />
            <View style={styles.cardOverlay}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantInfo}>
                {restaurant.distance} - {restaurant.price} - {restaurant.rating}
              </Text>
            </View>
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
});

export default function GameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { shortlist, addToShortlist } = useShortlist();

  const trans0 = useSharedValue(0);
  const trans1 = useSharedValue(0);
  const trans2 = useSharedValue(0);
  const translations = [trans0, trans1, trans2];

  const topSlot = currentIndex % 3;
  const backSlot = (currentIndex + 1) % 3;
  const activeTrans = translations[topSlot];

  const handleInfo = () => {
    // placeholder for info modal
  };

  const finalizeSwipe = useCallback((isLike: boolean) => {
    if (isLike && RESTAURANTS[currentIndex]) {
      addToShortlist(RESTAURANTS[currentIndex].id);
    }
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, addToShortlist]);

  useEffect(() => {
    const prevSlot = (currentIndex - 1 + 3) % 3;
    translations[prevSlot].value = 0;
  }, [currentIndex]);

  const handleReject = useCallback(() => {
    activeTrans.value = withTiming(-width * 1.5, { duration: 350 }, () => {
      runOnJS(finalizeSwipe)(false);
    });
  }, [finalizeSwipe, activeTrans]);

  const handleLike = useCallback(() => {
    activeTrans.value = withTiming(width * 1.5, { duration: 350 }, () => {
      runOnJS(finalizeSwipe)(true);
    });
  }, [finalizeSwipe, activeTrans]);

  const gesture = Gesture.Pan()
    .activeOffsetX([-5, 5])
    .onUpdate((e) => { activeTrans.value = e.translationX; })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
        runOnJS(e.translationX > 0 ? handleLike : handleReject)();
      } else {
        activeTrans.value = withSpring(0);
      }
    });

  const webStyles = Platform.OS === 'web' ? {
    touchAction: 'none', userSelect: 'none', cursor: 'grab',
  } : {};

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/menu');
    }
  };

  return (
    <LinearGradient colors={['#eff6ff', '#e0e7ff']} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#101828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SwiperEats</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          {[0, 1, 2].map((slotId) => (
            <SwipeCard
              key={slotId}
              restaurant={RESTAURANTS[currentIndex + (slotId === topSlot ? 0 : slotId === backSlot ? 1 : -1)]}
              translateX={slotId === backSlot || slotId === topSlot ? activeTrans : translations[slotId]}
              role={slotId === topSlot ? 'top' : slotId === backSlot ? 'back' : 'ghost'}
              gesture={gesture}
              webStyles={webStyles}
            />
          ))}
          {currentIndex >= RESTAURANTS.length && (
            <View style={styles.emptyCard}><Text style={styles.emptyText}>No more!</Text></View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]} onPress={handleReject}>
            <Ionicons name="close" size={32} color="#ff6467" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.infoBtn]} onPress={handleInfo}>
            <Ionicons name="information-circle-outline" size={32} color="#51a2ff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.likeBtn]} onPress={handleLike}>
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
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
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
    paddingTop: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
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
  },
  restaurantInfo: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  emptyCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 0,
    elevation: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#364153',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 24,
  },
  actionBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
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
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    elevation: 6,
  },
  shortlistButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
