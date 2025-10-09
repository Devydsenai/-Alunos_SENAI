import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Cinema</Text>
      <Text style={styles.subtitle}>Filmes em Cartaz</Text>
      <Text style={styles.info}>Bem-vindo à tela principal!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E50914",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: "#999",
  },
});
