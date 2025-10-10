# 📂 Estrutura de Telas - Cinema App

Todas as telas estão organizadas em pastas individuais para facilitar manutenção e escalabilidade.

## 📁 Estrutura Atual

```
app/src/screens/
├── home/
│   ├── index.tsx          # Tela principal (dashboard)
│   └── styles.tsx         # Estilos da home
│
├── explore/
│   ├── index.tsx          # Tela de exploração/busca
│   └── styles.ts          # Estilos do explore
│
├── seats/
│   ├── index.tsx          # Seleção de poltronas
│   └── styles.ts          # Estilos das poltronas
│
├── payment/
│   ├── index.tsx          # Formulário de pagamento
│   └── styles.ts          # Estilos do pagamento
│
├── signup/
│   ├── index.tsx          # Cadastro de filmes (admin)
│   └── styles.ts          # Estilos do cadastro
│
└── about/
    ├── index.tsx          # Sobre/Login
    └── styles.ts          # Estilos do sobre
```

## 🔄 Como Importar

No `AppNavigator.tsx`, as telas são importadas assim:

```typescript
import HomeScreen from '../screens/home';
import ExploreScreen from '../screens/explore';
import SeatsScreen from '../screens/seats';
import PaymentFormScreen from '../screens/payment';
import SignupScreen from '../screens/signup';
import AboutScreen from '../screens/about';
```

## 📝 Padrões

1. **Arquivo principal**: Sempre `index.tsx`
2. **Estilos**: Sempre `styles.ts` ou `styles.tsx` (se usar styled-components)
3. **Imports relativos**: Ajustados para a nova profundidade (`../../` ou `../../../../`)

## ✨ Benefícios

- ✅ **Organização**: Cada tela tem sua própria pasta
- ✅ **Escalabilidade**: Fácil adicionar novos arquivos (hooks, utils, tipos)
- ✅ **Manutenção**: Localização rápida de arquivos
- ✅ **Clareza**: Estrutura profissional e intuitiva

