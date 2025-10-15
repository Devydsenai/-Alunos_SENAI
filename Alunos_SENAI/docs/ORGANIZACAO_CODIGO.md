# 📁 Organização do Código - Alunos SENAI

## 🎯 Visão Geral

Este projeto foi reorganizado seguindo as melhores práticas de desenvolvimento React Native, com o objetivo de facilitar a manutenção, escalabilidade e compreensão do código, especialmente para fins educacionais.

## 📂 Estrutura de Pastas

```
Alunos_SENAI/
├── app/                          # Rotas do Expo Router
│   ├── (tabs)/                   # Telas principais (tabs)
│   │   ├── index.tsx             # Tela de cadastro de fornecedores
│   │   ├── index.styles.tsx      # Estilos da tela index
│   │   ├── categories.tsx        # Tela de categorias
│   │   ├── categories.styles.tsx # Estilos da tela categories
│   │   ├── products.tsx          # Tela de produtos
│   │   ├── products.styles.tsx   # Estilos da tela products
│   │   ├── stock.tsx             # Tela de estoque
│   │   ├── stock.styles.tsx      # Estilos da tela stock
│   │   ├── about.tsx             # Tela de listagem de fornecedores
│   │   ├── about.styles.tsx      # Estilos da tela about
│   │   └── _layout.tsx           # Layout das tabs
│   ├── services/                 # Serviços de API externa
│   │   ├── codigoBarras.ts       # Integração com API de código de barras
│   │   └── viaCep.ts             # Integração com ViaCEP
│   └── _layout.tsx               # Layout principal
├── components/                   # Componentes reutilizáveis (criar aqui)
├── constants/                    # Constantes e temas
│   └── theme.ts                  # Cores, espaçamentos, tamanhos de fonte
├── hooks/                        # Hooks personalizados (criar aqui)
├── api/                          # Backend da aplicação
└── docs/                         # Documentação
```

## 🎨 Sistema de Estilos com Styled Components

### Por que Styled Components?

1. **Organização**: Estilos separados da lógica de negócio
2. **Reutilização**: Componentes estilizados podem ser reutilizados
3. **Tipagem**: TypeScript nativo com autocomplete
4. **Manutenibilidade**: Fácil encontrar e modificar estilos
5. **Legibilidade**: Código mais limpo e profissional

### Exemplo de Uso

#### Antes (StyleSheet):
```tsx
<View style={styles.container}>
  <Text style={styles.title}>Título</Text>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Clique</Text>
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});
```

#### Depois (Styled Components):
```tsx
import * as S from './minhaT ela.styles';

<S.Container>
  <S.Title>Título</S.Title>
  <S.Button>
    <S.ButtonText>Clique</S.ButtonText>
  </S.Button>
</S.Container>
```

**Arquivo de estilos separado (minhatela.styles.tsx):**
```tsx
import styled from 'styled-components/native';
import { colors, spacing } from '../../constants/theme';

export const Container = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
  background-color: ${colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.textPrimary};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${colors.success};
  padding: 15px;
  border-radius: 25px;
`;

export const ButtonText = styled.Text`
  color: ${colors.textLight};
  font-size: 16px;
`;
```

## 🎨 Sistema de Temas (constants/theme.ts)

Todas as cores, tamanhos e espaçamentos estão centralizados em um único arquivo:

```typescript
export const colors = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  error: '#F44336',
  // ... mais cores
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 30,
};

export const fontSize = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  title: 24,
};
```

### Vantagens:

1. **Consistência**: Mesmos valores em todo o app
2. **Manutenção**: Mudar uma cor atualiza em todos os lugares
3. **Tema Escuro**: Fácil de implementar no futuro
4. **Documentação**: Valores nomeados são auto-documentados

## 📦 Organização por Responsabilidade

### **app/services/** - Serviços de API Externa
- Integrações com APIs de terceiros
- Exemplo: ViaCEP, API de código de barras

### **components/** - Componentes Reutilizáveis
- Componentes usados em múltiplas telas
- Botões personalizados
- Cards
- Modais
- Formulários

### **constants/** - Constantes e Configurações
- Temas e cores
- URLs de API
- Configurações globais

### **hooks/** - Hooks Personalizados
- Lógica reutilizável
- Exemplos: `useApi`, `useForm`, `useDebounce`

## ✅ Benefícios desta Organização

### Para Estudantes:
- 📚 **Aprendizado**: Código organizado facilita compreensão
- 🔍 **Localização**: Fácil encontrar onde cada coisa está
- 💡 **Boas Práticas**: Aprende padrões profissionais
- 🎯 **Foco**: Cada arquivo tem uma responsabilidade clara

### Para Professores:
- 📖 **Explicação**: Mais fácil explicar a estrutura
- 👥 **Colaboração**: Alunos podem trabalhar em partes diferentes
- 🔄 **Manutenção**: Correções e melhorias são mais rápidas
- 📈 **Escalabilidade**: Projeto pode crescer de forma organizada

### Para o Projeto:
- 🚀 **Performance**: Código mais limpo e otimizado
- 🐛 **Debug**: Erros são mais fáceis de encontrar
- 🔧 **Manutenção**: Alterações localizadas
- 📱 **Responsividade**: Tema centralizado facilita adaptações

## 🚀 Próximos Passos

### 1. Criar Componentes Reutilizáveis
Mover componentes comuns para a pasta `components/`:
- `Button.tsx` - Botão personalizado
- `Input.tsx` - Input personalizado
- `Card.tsx` - Card reutilizável
- `Modal.tsx` - Modal genérico

### 2. Criar Hooks Personalizados
Extrair lógica reutilizável para a pasta `hooks/`:
- `useApi.ts` - Hook para chamadas de API
- `useForm.ts` - Hook para gerenciamento de formulários
- `useDebounce.ts` - Hook para debounce em pesquisas

### 3. Melhorias no Tema
- Adicionar tema escuro
- Criar variações de componentes
- Adicionar mais tokens de design

## 📚 Para Saber Mais

- [Styled Components](https://styled-components.com/)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Expo Router](https://expo.github.io/router/docs/)
- [TypeScript](https://www.typescriptlang.org/)

## 🎓 Uso em Sala de Aula

### Exemplo de Aula 1: Introdução ao Tema
1. Abrir `constants/theme.ts`
2. Mostrar como as cores são definidas
3. Alterar uma cor e ver o reflexo em todo o app

### Exemplo de Aula 2: Criando um Componente
1. Criar `components/Button/index.tsx`
2. Criar `components/Button/styles.tsx`
3. Usar o componente em múltiplas telas

### Exemplo de Aula 3: Separação de Responsabilidades
1. Mostrar como cada pasta tem seu propósito
2. Explicar o fluxo de dados
3. Demonstrar como adicionar uma nova feature

---

**Desenvolvido para fins educacionais - SENAI**

