import React from 'react';
import { Text, View } from 'react-native';
import * as cores from '../../../../styles/cores';

export default function AdminBadge() {
  return (
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
  );
}

