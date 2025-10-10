import React from 'react';
import { Text, View } from 'react-native';
import * as cores from '../../../../styles/cores';

interface TabIconProps {
  name: string;
  focused: boolean;
  color: string;
  isAdmin?: boolean;
}

export default function TabIcon({ name, focused, color, isAdmin }: TabIconProps) {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return focused ? '🏠' : '🏡';
      case 'explore':
        return focused ? '🔍' : '🔎';
      case 'signup':
        return focused ? '➕' : '📝';
      case 'seats':
        return focused ? '🎟️' : '🎫';
      case 'about':
        return focused ? 'ℹ️' : '📋';
      default:
        return '❓';
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Text style={{ fontSize: 24, marginBottom: 2 }}>
        {getIcon()}
      </Text>
      {isAdmin && name === 'signup' && (
        <View style={{
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
        }}>
          <Text style={{
            color: cores.brancoTotal,
            fontSize: 10,
            fontWeight: 'bold',
          }}>
            A
          </Text>
        </View>
      )}
    </View>
  );
}
