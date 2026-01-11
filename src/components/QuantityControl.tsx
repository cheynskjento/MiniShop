import { View, Button, Text } from 'react-native';

type Props = {
  quantity: number;
  onPlus: () => void;
  onMinus: () => void;
};

export default function QuantityControl({ quantity, onPlus, onMinus }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Button title="-" onPress={onMinus} />
      <Text>{quantity}</Text>
      <Button title="+" onPress={onPlus} />
    </View>
  );
}
