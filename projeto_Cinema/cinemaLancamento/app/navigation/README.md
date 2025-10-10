# 🧭 Sistema de Navegação

Este diretório contém toda a configuração de navegação do aplicativo usando React Navigation.

## 📁 Estrutura

- `types.ts` - Tipos TypeScript para navegação
- Futuras configurações de navegação serão adicionadas aqui

## 🚀 Como usar

### Navegação entre telas

```typescript
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Component = () => {
  const navigation = useNavigation<NavigationProp>();
  
  // Navegar para outra tela
  navigation.navigate('MovieDetails', { movieId: 123 });
};
```

## 📚 Documentação

- [React Navigation](https://reactnavigation.org/)
- [Expo Router vs React Navigation](https://docs.expo.dev/router/migrate/from-react-navigation/)

## ⚠️ Nota

Este projeto usa **Expo Router** como sistema de navegação principal, mas o React Navigation está disponível para casos específicos onde uma navegação mais customizada é necessária.

