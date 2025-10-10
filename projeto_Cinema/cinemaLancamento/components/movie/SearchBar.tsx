import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Buscar por título, gênero ou diretor...",
  resultCount 
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => onChangeText('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {resultCount !== undefined && (
        <Text style={styles.resultCount}>
          {resultCount} {resultCount === 1 ? 'filme encontrado' : 'filmes encontrados'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    color: "#999",
    fontSize: 20,
    fontWeight: "bold",
  },
  resultCount: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
});

