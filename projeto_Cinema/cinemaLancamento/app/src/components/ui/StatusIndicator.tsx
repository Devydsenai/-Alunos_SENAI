import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as cores from '../../../../styles/cores';

interface StatusIndicatorProps {
  isAdmin: boolean;
  onPress?: () => void;
}

export default function StatusIndicator({ isAdmin, onPress }: StatusIndicatorProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{
        position: 'absolute',
        top: -12,
        left: '50%',
        transform: [{ translateX: -30 }],
        backgroundColor: isAdmin ? cores.vermelhoPrimario : cores.cinzaMedio,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: cores.pretoProfundo,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Text style={{
        color: cores.brancoTotal,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        {isAdmin ? '👑 ADMIN' : '👤 CLIENTE'}
      </Text>
    </TouchableOpacity>
  );
}

