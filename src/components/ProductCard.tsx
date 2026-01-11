import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Product } from '../api/products';
import { useTheme } from '../theme/useTheme';

type Props = {
  product?: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { colors } = useTheme();

  if (!product) return null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { transform: [{ scale: pressed ? 0.97 : 1 }] },
      ]}
    >
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {product.thumbnail ? (
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <Text>No Image</Text>
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
          <Text style={[styles.price, { color: colors.button }]}>€ {product.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { flex: 1, margin: 8 },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    elevation: 4,
  },
  image: { width: '100%', height: 180 },
  noImage: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  price: { fontSize: 14, fontWeight: '600' },
});
