import { FlatList, View, Text, StyleSheet, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation';
import { useTheme } from '../../theme/useTheme';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = data?.filter(p =>
    p.title.toLowerCase().includes(debounced.toLowerCase())
  );

  if (isLoading)
    return <Centered text="Loading products..." />;

  if (error)
    return <Centered text="Error loading products" />;

  if (!filtered?.length)
    return <Centered text="No products found" />;

  return (
    <>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={colors.secondaryText}
        style={{
          backgroundColor: colors.card,
          color: colors.text,
          padding: 12,
          margin: 8,
          borderRadius: 12,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={i => i.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          />
        )}
      />
    </>
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
});
