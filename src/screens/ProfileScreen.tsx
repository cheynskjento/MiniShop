import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalItems, selectSubtotal } from '../store/cartSlice';
import { toggleTheme } from '../store/themeSlice';
import { useTheme } from '../theme/useTheme';
import { useState } from 'react';

export default function ProfileScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const { dark, colors } = useTheme();

  const [themeModalVisible, setThemeModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <View style={[styles.avatar, { backgroundColor: colors.button }]}>
          <Text style={styles.avatarText}>KC</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>Kjento Cheyns</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Mobile Shopper</Text>

        <TouchableOpacity
          style={styles.themeIcon}
          onPress={() => setThemeModalVisible(true)}
        >
          <Text style={{ fontSize: 28 }}>🎨</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={[styles.statCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Items in Cart</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{totalItems}</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Subtotal</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>€ {subtotal}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.button }]}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.primaryButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        visible={themeModalVisible}
        animationType="fade"
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPressOut={() => setThemeModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Theme</Text>

            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: '#fff',
                  borderColor: dark ? colors.border : '#000',
                },
              ]}
              onPress={() => {
                if (dark) dispatch(toggleTheme());
                setThemeModalVisible(false);
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Light</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                {
                  backgroundColor: '#121212',
                  borderColor: !dark ? colors.border : '#fff',
                },
              ]}
              onPress={() => {
                if (!dark) dispatch(toggleTheme());
                setThemeModalVisible(false);
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Dark</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 36,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#888' },
  themeIcon: { position: 'absolute', top: 24, right: 24 },

  section: { paddingHorizontal: 16, marginTop: 24 },

  statCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  statLabel: { fontSize: 14, fontWeight: '500' },
  statValue: { fontSize: 22, fontWeight: '700', marginTop: 6 },

  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 240,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
});
