# 🚀 COMO INICIAR O SISTEMA COMPLETO

## ✅ **PASSO A PASSO:**

### **1. Abrir 3 Terminais:**

#### **Terminal 1 - API de Filmes (porta 3000):**
```bash
cd api
node index.js
```
**Deve aparecer:**
```
✅ Banco conectado e modelos sincronizados.
API de Filmes rodando na porta 3000
```

#### **Terminal 2 - API de Poltronas (porta 3001):**
```bash
cd api
node poltronas-api.js
```
**Deve aparecer:**
```
✅ Banco de Poltronas conectado!
🎬 API de Poltronas rodando na porta 3001
```

#### **Terminal 3 - App React Native:**
```bash
npx expo start --clear
```
**Pressione `w` para abrir no navegador**

---

## 🎯 **TESTAR:**

### **1. Home → Selecione um filme**

### **2. Clique em poltronas:**
- ✅ Clique em D5 → Fica VERDE
- ✅ Clique em D6 → Fica VERDE
- ✅ Clique em D5 de novo → Volta CINZA (desselecionou!)
- ✅ Clique em D7 → Fica VERDE

### **3. Confirmar:**
- ✅ Clique "Confirmar (2 poltronas)"
- ✅ Alert aparece
- ✅ Clique "Confirmar"
- ✅ Poltronas ficam VERMELHAS
- ✅ Alert de sucesso
- ✅ Clique "OK"

### **4. Verificar Banco:**
Abra o navegador em:
```
http://localhost:3001/poltronas/filme/639721
```

Deve mostrar as reservas!

---

## 📋 **CHECKLIST:**

- [ ] API Filmes rodando (porta 3000)
- [ ] API Poltronas rodando (porta 3001)
- [ ] App aberto no navegador
- [ ] Consigo clicar em filme
- [ ] Poltronas ficam verdes ao clicar
- [ ] Clicar de novo desseleciona
- [ ] Confirmar funciona
- [ ] Poltronas ficam vermelhas
- [ ] Alert de sucesso aparece
- [ ] Dados salvos no banco

---

## 🎉 **PRONTO!**

**Sistema completo funcionando!** 🚀✨

**Arquivos criados:**
- ✅ `api/poltronas-api.js` - API de poltronas
- ✅ `api/start-poltronas.bat` - Script para iniciar
- ✅ `app/src/services/poltronas.ts` - Serviço frontend
- ✅ `SISTEMA_POLTRONAS_COMPLETO.md` - Documentação completa



