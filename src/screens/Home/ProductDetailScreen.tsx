import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../../api/products';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { useTheme } from '../../theme/useTheme';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading)
    return <Centered text="Loading product..." />;

  if (!data)
    return <Centered text="Error loading product" />;

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image source={{ uri: data.thumbnail }} style={styles.image} />
        <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
        <Text style={[styles.price, { color: colors.button }]}>€ {data.price}</Text>
        <Text style={[styles.description, { color: colors.text }]}>{data.description}</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => dispatch(addToCart(data))}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Centered({ text }: { text: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.center}>
      <Text style={{ color: colors.text }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 16, padding: 16, borderRadius: 16 },
  image: { width: '100%', height: 250, borderRadius: 16, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 22, marginBottom: 24 },
  button: { padding: 16, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
