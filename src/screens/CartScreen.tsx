import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrementOrRemove, removeItem, selectSubtotal, clearCart } from '../store/cartSlice';
import { useTheme } from '../theme/useTheme';
import QuantityControl from '../components/QuantityControl';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';

export default function CartScreen() {
  const items = useSelector((state: any) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const disabled = items.length === 0;

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const slideAnim = useRef(new Animated.Value(-120)).current;

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    Animated.timing(slideAnim, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -120,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setSnackbarMessage(''));
      }, 5000);
    });
  };

  const handleCheckout = () => {
    if (disabled) return;

    showSnackbar(`Checkout completed! Total: €${subtotal}`);
    setTimeout(() => {
      dispatch(clearCart());
    }, 500);
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.price, { color: colors.text }]}>€ {item.price}</Text>
        <View style={styles.actions}>
          <QuantityControl
            quantity={item.quantity}
            onPlus={() => dispatch(increment(item.id))}
            onMinus={() => dispatch(decrementOrRemove(item.id))}
          />
          <TouchableOpacity
            onPress={() => dispatch(removeItem(item.id))}
            style={[styles.removeButton, { backgroundColor: colors.danger }]}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {items.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: colors.text, fontSize: 16 }}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 180 }}
          />

          <View style={[styles.subtotalContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.subtotalText, { color: colors.text }]}>
              Subtotal: € {subtotal}
            </Text>

            <TouchableOpacity
              disabled={disabled}
              style={[
                styles.checkoutButton,
                { backgroundColor: disabled ? colors.border : colors.button, opacity: disabled ? 0.6 : 1 },
              ]}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {snackbarMessage ? (
        <Animated.View
          style={[
            styles.snackbar,
            {
              backgroundColor: colors.button,
              transform: [{ translateY: slideAnim }],
              shadowColor: colors.shadow,
            },
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>{snackbarMessage}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: { width: 90, height: 90, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  price: { fontSize: 14, marginBottom: 8 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 8,
  },
  subtotalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  subtotalText: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  checkoutButton: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', elevation: 3 },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  snackbar: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 12,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
