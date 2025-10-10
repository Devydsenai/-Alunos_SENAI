# 🎬 TESTE DO SISTEMA DE RESERVAS - PASSO A PASSO

## 🎯 **COMO TESTAR A CONFIRMAÇÃO DE POLTRONAS:**

### **PASSO 1: Abrir Console do Navegador**
1. Pressione **F12** no navegador
2. Clique na aba **"Console"**
3. Deixe aberto para ver os logs

### **PASSO 2: Ir para Home**
1. Certifique-se de estar na tela inicial
2. Você deve ver os filmes em carrossel

### **PASSO 3: Selecionar um Filme**
1. Clique no **pôster** de qualquer filme **DISPONÍVEL** (badge verde 🎟️)
2. Você deve ir para a tela de poltronas

### **PASSO 4: Selecionar Poltronas**
1. Clique em **pelo menos 1 poltrona** (exemplo: D5)
2. A poltrona deve ficar **VERDE** 🟢
3. Você pode selecionar mais de uma (D5, D6, D7...)

### **PASSO 5: Confirmar Reserva**
1. Clique no botão **"Confirmar (X poltronas)"** no rodapé
2. **DEVE APARECER:**
   - 🔴 No console: "BOTÃO CONFIRMAR CLICADO!"
   - 📱 **Alert na tela** com:
     - Título: "🎫 Confirmar Reserva"
     - Mensagem: Poltronas, Filme, Total
     - Botões: "Cancelar" e "Confirmar"

### **PASSO 6: Confirmar no Alert**
1. Clique no botão **"Confirmar"** do alert
2. **DEVE ACONTECER:**
   - 🔴 Console: "Botão CONFIRMAR do Alert clicado!"
   - 🔴 Console: "Marcando poltronas como ocupadas..."
   - 💾 Console: "Salvando reserva no banco:"
   - 🟢 **Poltronas ficam VERMELHAS** 🔴
   - ✅ Console: "Reserva salva:"
   - 📱 **Novo Alert:** "✅ Reserva Confirmada!"

### **PASSO 7: Finalizar**
1. Clique **"OK"** no alert de sucesso
2. Você volta para a **Home**
3. As poltronas permanecem vermelhas para aquele filme

---

## 🐛 **SE NÃO APARECER O ALERT:**

### **Teste 1: Verifique se selecionou poltronas**
- Se não selecionou nenhuma poltrona → Alert de erro: "Selecione pelo menos uma poltrona"

### **Teste 2: Verifique o console**
- Abra o console (F12)
- Clique no botão "Confirmar"
- Veja se aparece: "🔴 BOTÃO CONFIRMAR CLICADO!"
- Se não aparecer → O botão não está sendo clicado

### **Teste 3: Verifique se o botão está habilitado**
- O botão deve estar vermelho (habilitado)
- Se estiver cinza → Selecione poltronas primeiro

### **Teste 4: Recarregue o app**
```bash
# No terminal onde o Expo está rodando:
# Pressione: r (reload)
```

---

## 📊 **VERIFICAR RESERVA NO BANCO:**

### **Após confirmar a reserva:**

1. Abra uma nova aba no navegador
2. Acesse: `http://localhost:3000/reservas`
3. Você deve ver um JSON com a reserva:

```json
[
  {
    "id": 1,
    "filmeId": "639721",
    "filmeTitulo": "Demon Slayer",
    "poltronas": "[\"D5\",\"D6\"]",
    "total": "50.00",
    "dataReserva": "2025-10-10T17:45:00.000Z",
    "createdAt": "2025-10-10T17:45:00.000Z",
    "updatedAt": "2025-10-10T17:45:00.000Z"
  }
]
```

---

## 🎯 **CHECKLIST COMPLETO:**

### **ANTES DE CLICAR:**
- [ ] API rodando (porta 3000)
- [ ] App aberto no navegador
- [ ] Console aberto (F12)
- [ ] Na tela de poltronas
- [ ] Pelo menos 1 poltrona selecionada (verde)

### **AO CLICAR "CONFIRMAR":**
- [ ] Console mostra: "🔴 BOTÃO CONFIRMAR CLICADO!"
- [ ] Console mostra: "Poltronas selecionadas: [...]"
- [ ] Console mostra: "✅ Mostrando Alert de confirmação..."
- [ ] **Alert aparece na tela** 📱

### **AO CLICAR "CONFIRMAR" NO ALERT:**
- [ ] Console mostra: "🚀 Botão CONFIRMAR do Alert clicado!"
- [ ] Console mostra: "🔴 Marcando poltronas como ocupadas..."
- [ ] Console mostra: "💾 Salvando reserva no banco:"
- [ ] Console mostra: "✅ Reserva salva:"
- [ ] **Poltronas ficam vermelhas** 🔴
- [ ] **Novo alert de sucesso aparece** 📱

### **AO CLICAR "OK":**
- [ ] Volta para Home
- [ ] Reserva está no banco (`/reservas`)

---

## 🎬 **EXEMPLO COMPLETO:**

### **Cenário:**
- Filme: "Demon Slayer: Kimetsu no Yaiba"
- Poltronas: D5, D6

### **Sequência:**
1. ✅ Home → Clique no filme
2. ✅ Tela poltronas → Clique em D5 (fica verde)
3. ✅ Clique em D6 (fica verde)
4. ✅ Clique "Confirmar (2 poltronas)"
5. 📱 **Alert aparece:**
   ```
   🎫 Confirmar Reserva
   
   Poltronas: D5, D6
   
   Filme: Demon Slayer: Kimetsu no Yaiba
   Total: R$ 50,00
   
   [Cancelar] [Confirmar]
   ```
6. ✅ Clique "Confirmar"
7. 🔴 D5 e D6 ficam vermelhas
8. 📱 **Alert de sucesso:**
   ```
   ✅ Reserva Confirmada!
   
   Poltronas D5, D6 reservadas com sucesso!
   
   Filme: Demon Slayer: Kimetsu no Yaiba
   Total: R$ 50,00
   
   [OK]
   ```
9. ✅ Clique "OK" → Volta para Home

---

## 🚨 **PROBLEMAS COMUNS:**

### **"Alert não aparece"**
**Solução:**
1. Verifique se selecionou poltronas (devem estar verdes)
2. Abra o console (F12) e veja os logs
3. Recarregue o app (pressione `r` no terminal Expo)

### **"Poltronas não ficam vermelhas"**
**Solução:**
1. Verifique se a API está rodando
2. Veja o console para erros
3. Teste acessar `http://localhost:3000/reservas`

### **"Erro ao salvar reserva"**
**Solução:**
1. API não está rodando → Inicie: `cd api && node index.js`
2. Porta 3000 ocupada → Feche outros processos
3. Banco desatualizado → Reinicie a API

---

## ✅ **TESTE AGORA!**

Siga os passos acima com o **console aberto** para ver todos os logs e entender o que está acontecendo! 🎯✨

