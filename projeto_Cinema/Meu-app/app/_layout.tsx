import { Stack } from "expo-router";
import { useEffect } from "react";
import { initializeAPI } from "../api/src";
import { Colors } from "../constants/theme";

export default function RootLayout() {
  // Inicializa o banco de dados quando o app abre
  useEffect(() => {
    const initDB = async () => {
      try {
        console.log('🔄 Inicializando banco de dados...');
        await initializeAPI();
        console.log('✅ Banco de dados inicializado!');
      } catch (error) {
        console.error('❌ Erro ao inicializar banco:', error);
      }
    };
    
    initDB();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary.start,
        },
        headerTintColor: Colors.light,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: Colors.lightSecondary,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "Cinema App",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(auth)/login" 
        options={{
          title: "Login",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(auth)/signup" 
        options={{
          title: "Cadastro",
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="movies" 
        options={{
          title: "Explorar Filmes",
          headerStyle: {
            backgroundColor: Colors.primary.start,
          },
          headerTintColor: Colors.light,
        }} 
      />
      <Stack.Screen 
        name="sessions" 
        options={{
          title: "Sessões de Hoje",
          headerStyle: {
            backgroundColor: Colors.primary.start,
          },
          headerTintColor: Colors.light,
        }} 
      />
      <Stack.Screen 
        name="seats" 
        options={{
          title: "Seleção de Assentos",
          headerStyle: {
            backgroundColor: Colors.primary.start,
          },
          headerTintColor: Colors.light,
        }} 
      />
      <Stack.Screen 
        name="movie/[id]" 
        options={{
          headerStyle: {
            backgroundColor: Colors.primary.start,
          },
          headerTintColor: Colors.light,
        }} 
      />
    </Stack>
  );
}
