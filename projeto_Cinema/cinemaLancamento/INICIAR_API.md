# 🚀 Como Iniciar a API

## ✅ Banco de dados já está populado!

✓ 16 filmes inseridos
✓ 12 filmes em cartaz
✓ 4 lançamentos

---

## 📝 Passo a passo:

### 1. Abra um novo terminal (PowerShell ou CMD)

### 2. Navegue até a pasta da API:
```bash
cd C:\Users\Devyd Silva\Documents\GitHub\-Alunos_SENAI\projeto_Cinema\cinemaLancamento\api
```

### 3. Inicie o servidor:
```bash
node index.js
```

Você deve ver:
```
Banco conectado e modelos sincronizados.
API de Filmes rodando na porta 3000
```

---

## 🧪 Testar a API

### Em outro terminal, execute:
```bash
curl http://localhost:3000/
```

Deve retornar:
```json
{"status":"ok","message":"API de Filmes rodando!"}
```

### Testar filmes em cartaz:
```bash
curl http://localhost:3000/filmes/em-cartaz
```

### Testar lançamentos:
```bash
curl http://localhost:3000/filmes/lancamentos
```

---

## ❌ Se der erro "porta em uso":

### Encontrar o processo usando a porta 3000:
```bash
netstat -ano | findstr :3000
```

### Matar o processo (substitua PID pelo número encontrado):
```bash
taskkill /PID <número> /F
```

---

## 🔧 Problema com CORS no React Native?

Se você estiver testando em um **dispositivo físico** ou **emulador Android**, precisa mudar a URL da API:

### Para Android Emulator:
Edite `app/services/api.ts`:
```typescript
const API_URL = 'http://10.0.2.2:3000';
```

### Para dispositivo físico:
Use o IP da sua máquina:
```typescript
const API_URL = 'http://192.168.x.x:3000';  // Seu IP local
```

Para descobrir seu IP:
```bash
ipconfig
```
Procure por "Endereço IPv4" na sua conexão de rede ativa.

---

## ✅ Checklist

- [ ] API rodando em http://localhost:3000
- [ ] Banco populado (16 filmes)
- [ ] URL correta no `api.ts` para seu dispositivo
- [ ] App React Native rodando
- [ ] Sem erros no console

---

## 🎬 Quando tudo estiver funcionando:

1. ✅ API rodando em um terminal
2. ✅ App Expo rodando em outro terminal
3. ✅ Abra o app no dispositivo/emulador
4. ✅ Aguarde 3 segundos (tela de loading)
5. ✅ Você deve ver os **16 cards de filmes**!

---

## 📊 Estrutura esperada:

**Em Cartaz (12 filmes):**
- Avatar
- The Avengers
- Interstellar
- I Am Legend
- 300
- The Wolf of Wall Street
- Breaking Bad
- Game of Thrones
- Vikings
- Gotham
- Power
- Narcos

**Lançamentos (4 filmes):**
- Doctor Strange
- Rogue One: A Star Wars Story
- Assassin's Creed
- Luke Cage


