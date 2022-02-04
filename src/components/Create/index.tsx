import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, ButtonText, Container, Input } from './styles';

interface CreateProps {
  loading?: boolean;
  onCreate: (value: string) => void;
}

export function Create({ loading, onCreate }: CreateProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleCreate = useCallback(() => {
    onCreate(inputText);
    setInputText('');
  }, [inputText, onCreate]);

  return (
    <Container>
      <Input
        placeholder="Nova tarefa"
        value={inputText}
        onChangeText={setInputText}
      />

      <Button onPress={handleCreate}>
        <ButtonText>{loading ? <ActivityIndicator /> : 'Adicionar'}</ButtonText>
      </Button>
    </Container>
  );
}
