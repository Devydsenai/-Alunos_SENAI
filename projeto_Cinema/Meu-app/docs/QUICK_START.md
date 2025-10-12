# ⚡ Guia Rápido de Início

Este guia te levará do zero ao aplicativo rodando em **5 minutos**.

## 🚀 Instalação Rápida

### Pré-requisitos
```bash
# Verifique se você tem Node.js instalado
node --version  # Deve ser 18+

# Verifique se você tem npm
npm --version
```

### 1. Clone e Instale (2 minutos)

```bash
# Clone o repositório
git clone <repository-url>
cd projeto_Cinema/Meu-app

# Instale as dependências
npm install
```

### 2. Configure a API do TMDB (1 minuto)

```bash
# Crie o arquivo .env
touch .env

# Adicione sua chave da API
echo "TMDB_API_KEY=77360f6f4ee084ea5da7c4a534b666ae" > .env
echo "TMDB_API_URL=https://api.themoviedb.org/3" >> .env
echo "TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500" >> .env
```

> 💡 **Dica**: A chave acima é uma chave de demonstração. Para produção, obtenha sua própria em [TMDB](https://www.themoviedb.org/settings/api).

### 3. Execute o App (2 minutos)

```bash
# Inicie o Expo
npm start

# O Expo Dev Tools abrirá no navegador
# Escolha como executar:
```

**Opções de execução:**

#### 📱 No seu celular (Recomendado)
1. Instale o app **Expo Go** ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Escaneie o QR Code que apareceu no terminal
3. Aguarde o app carregar

#### 💻 No emulador
- **Android**: Pressione `a` no terminal
- **iOS** (apenas Mac): Pressione `i` no terminal

#### 🌐 No navegador
- Pressione `w` no terminal

## 🎯 Primeiro Uso

### 1. Tela Inicial
- Você verá a home com gradiente roxo/rosa
- Três opções de navegação

### 2. Criar Conta
```
1. Clique em "Criar Conta"
2. Preencha:
   - Nome: João Silva
   - Email: joao@teste.com
   - Senha: teste123
   - Confirmar Senha: teste123
3. Clique em "Criar Conta"
```

### 3. Fazer Login
```
1. Clique em "Já tenho conta"
2. Preencha:
   - Email: joao@teste.com
   - Senha: teste123
3. Clique em "Entrar"
```

### 4. Explorar Filmes
- Você verá uma grade de filmes populares
- Pull down para atualizar
- Clique em um filme (em breve: detalhes)

## 🎨 Tour Rápido das Features

### Gradientes Modernos
```tsx
// Tela inicial usa gradiente roxo → rosa
<GradientBackground variant="primary">
```

### Validação em Tempo Real
```tsx
// Input mostra erro imediatamente
<Input
  label="Email"
  error={emailError}  // "Email inválido"
/>
```

### Cards de Filmes
```tsx
// Poster + título + nota
<MovieCard
  title="Matrix"
  rating={8.7}
  posterPath="..."
/>
```

## 📱 Estrutura Básica

```
Meu-app/
├── app/                    # 📱 Telas
│   ├── index.tsx          # Home
│   ├── movies.tsx         # Filmes
│   └── (auth)/
│       ├── login.tsx      # Login
│       └── signup.tsx     # Cadastro
│
├── components/ui/         # 🎨 Componentes
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── MovieCard.tsx
│
├── api/src/              # 🔧 Backend
│   ├── services/         # Lógica de negócio
│   ├── models/           # Acesso aos dados
│   └── controllers/      # Orquestração
│
└── constants/            # 🎨 Design System
    └── theme.ts          # Cores, espaçamentos, etc
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm start              # Inicia Expo Dev Server
npm run android        # Abre no Android
npm run ios            # Abre no iOS (Mac only)
npm run web            # Abre no navegador

# Qualidade
npm run lint           # Verifica erros de lint
npm run type-check     # Verifica tipos TypeScript

# Limpeza
npm run reset-project  # Reset para estado inicial
rm -rf node_modules    # Remove dependências
npm install            # Reinstala dependências
```

## 🐛 Problemas Comuns

### Port já em uso
```bash
# Mude a porta
EXPO_WEB_PORT=3001 npm start
```

### Erro de dependências
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Expo Go não conecta
```bash
# Tente localhost
npm start --localhost

# Ou tunnel
npm start --tunnel
```

### App não atualiza
```bash
# Force reload no app
# Android: Shake + "Reload"
# iOS: Cmd+R (simulador) ou Shake + "Reload" (device)

# Limpe cache
npm start --clear
```

## 💡 Dicas Rápidas

### Hot Reload
- Salvou um arquivo? O app recarrega automaticamente! ⚡

### Fast Refresh
- Mudanças de UI aparecem instantaneamente
- Estado do componente é preservado

### Debug
```bash
# Abra React DevTools
npm start
# Pressione 'd' no terminal
```

### Logs
```tsx
// Veja logs no terminal onde rodou npm start
console.log('Debugging:', variavel);
```

## 📚 Próximos Passos

### Aprender Mais
1. [README Completo](../README.md) - Documentação detalhada
2. [Exemplos de Código](./EXAMPLES.md) - Como usar componentes
3. [Arquitetura](./ARCHITECTURE.md) - Como tudo funciona
4. [Contribuir](../CONTRIBUTING.md) - Como ajudar

### Customizar
```tsx
// Mude as cores em constants/theme.ts
export const Colors = {
  primary: {
    start: '#sua-cor',  // Personalize!
    end: '#sua-cor-2',
  },
};
```

### Adicionar Features
```tsx
// Crie uma nova tela em app/
export default function MinhaTelaScreen() {
  return <View>...</View>;
}

// Navegue para ela
router.push('/minha-tela');
```

## 🎉 Pronto!

Você agora tem:
- ✅ App rodando
- ✅ Entende a estrutura básica
- ✅ Sabe como navegar
- ✅ Conhece os comandos principais

### Recursos Úteis

**Documentação**
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router/)

**Comunidade**
- [Discord do Expo](https://chat.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- [GitHub Issues](../../issues)

---

**Divirta-se codificando! 🚀**

*Alguma dúvida? Confira o [README completo](../README.md) ou abra uma [issue](../../issues).*

