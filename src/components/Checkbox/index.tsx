import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Container } from './styles';

interface CheckboxProps {
  onChange?: () => void;
}

export function Checkbox({ onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function toggle() {
    if (!isChecked) {
      onChange && onChange();
    }

    setIsChecked(!isChecked);
  }

  return (
    <Container isChecked={isChecked} onPress={toggle}>
      {isChecked && (
        <MaterialCommunityIcons name="check" color="#FFF" size={12} />
      )}
    </Container>
  );
}
