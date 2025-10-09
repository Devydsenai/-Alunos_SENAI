import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
      }}
      initialRouteName="loading"
    >
      <Tabs.Screen 
        name="loading" 
        options={{ 
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Pesquisar',
          tabBarLabel: '🔍 Pesquisar',
        }} 
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: 'Filmes',
          tabBarLabel: '🎬 Filmes',
        }} 
      />
      <Tabs.Screen 
        name="seats" 
        options={{ 
          title: 'Poltronas',
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
    </Tabs>
  );
}