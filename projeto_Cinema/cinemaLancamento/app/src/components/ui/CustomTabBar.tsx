import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as cores from '../../../../styles/cores';

interface TabItem {
  name: string;
  label: string;
  icon: string;
  href?: string | null;
}

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  isAdmin: boolean;
}

export default function CustomTabBar({ state, descriptors, navigation, isAdmin }: CustomTabBarProps) {
  const tabs: TabItem[] = [
    { name: 'home', label: 'Início', icon: '🏠', href: undefined },
    { name: 'explore', label: 'Explorar', icon: '🔍', href: undefined },
    { name: 'signup', label: 'Cadastrar', icon: '➕', href: isAdmin ? undefined : null },
    { name: 'about', label: 'Sobre', icon: 'ℹ️', href: undefined },
  ];

  const visibleTabs = tabs.filter(tab => tab.href !== null);

  return (
    <View style={styles.container}>
      {visibleTabs.map((tab, index) => {
        const isFocused = state.index === index;
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[index].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(state.routes[index].name);
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <Text style={[styles.icon, isFocused && styles.activeIcon]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {tab.label}
            </Text>
            {isAdmin && tab.name === 'signup' && (
              <View style={styles.adminBadge}>
                <Text style={styles.adminText}>A</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: cores.pretoProfundo,
    borderTopWidth: 1,
    borderTopColor: cores.cinzaBorda,
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: cores.vermelhoTransparente20,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 24,
    marginBottom: 2,
  },
  activeIcon: {
    // Ícone ativo mantém o mesmo estilo
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: cores.cinzaTexto,
  },
  activeLabel: {
    color: cores.vermelhoPrimario,
  },
  adminBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: cores.vermelhoPrimario,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cores.pretoProfundo,
  },
  adminText: {
    color: cores.brancoTotal,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

