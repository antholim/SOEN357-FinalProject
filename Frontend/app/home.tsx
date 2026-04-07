import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 28 * 2 - 14) / 2;

const CATEGORIES = [
  {
    id: '1',
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  },
  {
    id: '2',
    name: 'Japanese',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80',
  },
  {
    id: '3',
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
  },
  {
    id: '4',
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
  },
];

const POPULAR = [
  {
    id: '1',
    name: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
  },
  {
    id: '2',
    name: 'Sushi Platter',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
  },
  {
    id: '3',
    name: 'Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + 12 }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.greeting}>Welcome to</Text>
      <Text style={styles.appName}>SwiperEats</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>&#128269;</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a dish..."
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity key={item.id} style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} contentFit="cover" />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular Near You</Text>
      <View style={styles.grid}>
        {POPULAR.map((item) => (
          <TouchableOpacity key={item.id} style={styles.popularCard}>
            <Image source={{ uri: item.image }} style={styles.popularImage} contentFit="cover" />
            <Text style={styles.popularName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 28,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1a2e',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 14,
  },
  horizontalList: {
    gap: 12,
    marginBottom: 28,
  },
  categoryCard: {
    width: 120,
    alignItems: 'center',
  },
  categoryImage: {
    width: 120,
    height: 90,
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  grid: {
    gap: 14,
  },
  popularCard: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f2f2f7',
  },
  popularImage: {
    width: '100%',
    height: 160,
  },
  popularName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    padding: 12,
  },
});
