import { router, Tabs } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  useEffect(() => {
    // Redireciona para a tela de loading primeiro
    const timer = setTimeout(() => {
      router.push('/loading');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tabs>
      <Tabs.Screen name="loading" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}