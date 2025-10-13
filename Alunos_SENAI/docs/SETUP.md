# 🚀 Guia de Instalação e Configuração

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **npm** ou **yarn** (vem com Node.js)
- ✅ **Git** - [Download](https://git-scm.com/)

### Para testar no celular
- ✅ **Expo Go** no smartphone
  - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

### Opcional (para emuladores)
- Android Studio (emulador Android)
- Xcode (emulador iOS - apenas Mac)

---

## 📥 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd Alunos_SENAI
```

### 2. Instale as Dependências do App

```bash
npm install
```

Este comando instala:
- React Native
- Expo SDK
- Expo Router
- TypeScript
- Bibliotecas de UI (Ionicons)
- Expo Image Picker
- E todas as outras dependências

### 3. Instale as Dependências da API

```bash
cd api
npm install
cd ..
```

Este comando instala:
- Express
- Sequelize
- SQLite3
- CORS
- Nodemon (dev)

---

## ⚙️ Configuração

### Configuração da API

1. **Verifique o arquivo `api/index.js`:**
```javascript
const PORT = process.env.PORT || 3000;
```

2. **Se necessário, altere a porta:**
```javascript
const PORT = 3001; // Sua porta personalizada
```

3. **No app, atualize a URL da API** em:
   - `app/(tabs)/index.tsx`
   - `app/(tabs)/about.tsx`

```typescript
const API_URL = 'http://localhost:3000'; // Altere se mudou a porta
```

### Configuração do Expo

O projeto já vem configurado com `app.json`:

```json
{
  "expo": {
    "name": "alunos_senai",
    "slug": "alunos_senai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true
  }
}
```

---

## 🏃‍♂️ Executando o Projeto

### Método 1: Dois Terminais (Recomendado)

**Terminal 1 - API:**
```bash
cd api
npm run dev
```

Saída esperada:
```
[nodemon] 3.1.10
[nodemon] watching path(s): *.js
[nodemon] starting `node index.js`
Banco conectado e modelos sincronizados.
API rodando na porta 3000
```

**Terminal 2 - App:**
```bash
npm start
```

Saída esperada:
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or...
```

### Método 2: Script Único (Avançado)

Crie um arquivo `start.sh`:
```bash
#!/bin/bash
cd api && npm run dev &
npm start
```

Execute:
```bash
chmod +x start.sh
./start.sh
```

---

## 📱 Acessando o App

### No Smartphone (Expo Go)

1. **Abra o Expo Go** no celular
2. **Escaneie o QR Code** que apareceu no terminal
   - Android: Use a câmera do Expo Go
   - iOS: Use a câmera nativa do iPhone
3. **Aguarde o carregamento** (primeira vez demora mais)

### No Emulador Android

```bash
npm run android
```

Requisitos:
- Android Studio instalado
- Emulador Android configurado
- Android SDK instalado

### No Emulador iOS (apenas Mac)

```bash
npm run ios
```

Requisitos:
- Xcode instalado
- Simulador iOS configurado
- macOS

### No Navegador

```bash
npm run web
```

⚠️ **Nota:** Algumas funcionalidades podem não funcionar no navegador (câmera, por exemplo).

---

## 🧪 Executando Testes

### Testes do App
```bash
npm test
```

### Testes com Watch
```bash
npm run test:watch
```

### Testes com Coverage
```bash
npm run test:coverage
```

### Testes da API
```bash
cd api
npm test
```

---

## 🔧 Comandos Úteis

### App (React Native)

```bash
# Iniciar projeto
npm start

# Limpar cache
npx expo start --clear

# Resetar para projeto padrão
npm run reset-project

# Abrir em plataforma específica
npm run android
npm run ios
npm run web

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit
```

### API (Backend)

```bash
# Desenvolvimento (auto-reload)
npm run dev

# Produção
npm start

# Resetar banco de dados
# (delete api/database.sqlite e reinicie)
rm database.sqlite
npm run dev
```

---

## 🐛 Resolução de Problemas

### Problema: "Cannot connect to Metro"

**Solução:**
```bash
# Limpe o cache do Expo
npx expo start --clear

# Se não funcionar, limpe node_modules
rm -rf node_modules
npm install
```

### Problema: "API não conecta"

**Verificações:**
1. API está rodando? Veja se apareceu "API rodando na porta 3000"
2. Porta correta? Verifique se é 3000
3. Firewall bloqueando? Permita conexões na porta 3000

**Teste a API:**
```bash
curl http://localhost:3000
# Deve retornar: {"status":"ok"}
```

### Problema: "Expo Go não carrega"

**Soluções:**
1. Celular e computador na mesma rede WiFi
2. Tente usar o modo Tunnel:
   ```bash
   npx expo start --tunnel
   ```
3. Atualize o Expo Go no celular
4. Reinicie o servidor:
   ```bash
   # Ctrl+C para parar
   npm start
   ```

### Problema: "Module not found"

**Solução:**
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install

# Para a API também
cd api
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Problema: "expo-image-picker não funciona"

**Solução:**
```bash
# Reinstale o pacote
npx expo install expo-image-picker

# Permissões (já configuradas no código, mas verifique):
# - Câmera
# - Galeria/Photos
```

### Problema: "Erro ao tirar foto"

**Verificações:**
- Expo Go atualizado?
- Permissões concedidas?
- Testando em dispositivo físico? (emulador pode não ter câmera)

---

## 📦 Estrutura de Arquivos Importante

```
Alunos_SENAI/
├── app/                    # ⚛️ React Native App
│   ├── (tabs)/
│   │   ├── index.tsx      # 🏠 Home
│   │   └── about.tsx      # 👥 Clientes
│   └── _layout.tsx
│
├── api/                   # 🔧 Backend
│   ├── index.js          # 📡 API
│   ├── database.sqlite   # 🗄️ Banco
│   └── package.json
│
├── assets/               # 🖼️ Recursos
├── docs/                # 📚 Documentação
└── package.json         # 📦 Dependências
```

---

## 🔐 Permissões Necessárias

O app solicita as seguintes permissões:

### Android
- 📷 **Câmera** - Para tirar fotos
- 🖼️ **Armazenamento** - Para acessar galeria

### iOS
- 📷 **Camera** - Para tirar fotos
- 🖼️ **Photo Library** - Para acessar galeria

Essas permissões são solicitadas automaticamente quando você usa a funcionalidade.

---

## 🌐 Portas Utilizadas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| API | 3000 | Backend REST |
| Metro | 8081 | Bundler do React Native |
| Expo | 19000 | DevTools |

---

## 📝 Próximos Passos

Após a instalação:

1. ✅ Teste criar um cliente com foto
2. ✅ Verifique a lista de clientes
3. ✅ Teste editar e excluir
4. ✅ Explore a busca/filtros
5. 📖 Leia a [Documentação da API](API.md)
6. 🧪 Execute os testes

---

## 💡 Dicas

1. **Use dois monitores** - Um para código, outro para app
2. **Mantenha a API rodando** - Ela preserva os dados
3. **Use `npm run dev`** na API - Auto-reload é útil
4. **Limpe o cache** se algo estranho acontecer
5. **Leia os logs** - Erros aparecem no terminal

---

## 📞 Suporte

Problemas não resolvidos?

1. Verifique os [Issues no GitHub]
2. Consulte a [Documentação do Expo](https://docs.expo.dev/)
3. Veja o [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

---

**Desenvolvido com ❤️ para o SENAI**

