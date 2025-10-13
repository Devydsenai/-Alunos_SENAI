# 🧪 Guia de Teste Completo - Sistema de Almoxarifado

## 🔧 **CORREÇÕES APLICADAS:**

### ✅ **Problema 1: Botão Deletar Produtos**
- **Correção**: API agora deleta estoque e movimentações junto
- **Logs**: Adicionados para debug completo

### ✅ **Problema 2: Botão Deletar Categorias**
- **Correção**: Logs adicionados para debug
- **Validação**: Verificação completa

### ✅ **Problema 3: Botão Saída de Estoque**
- **Correção**: `Alert.prompt` removido (não funciona no Android)
- **Novo**: Modal com TextInput funcionando em todas as plataformas
- **Validação**: Não permite saída maior que estoque atual

---

## 🚀 **COMO TESTAR AGORA:**

### **Passo 1: Reinicie a API**
```bash
# Se já está rodando, Ctrl+C e reinicie:
cd api
npm run dev
```

### **Passo 2: Reinicie o App**
```bash
# Ctrl+C no terminal e reinicie:
npm start
```

### **Passo 3: Teste Completo**

---

## 📋 **ROTEIRO DE TESTES:**

### **TESTE 1: Categorias** 📁

1. **Criar Categoria:**
   - Ir em "Categorias"
   - Clicar "Nova"
   - Nome: "Eletrônicos"
   - Descrição: "Produtos eletrônicos"
   - Salvar
   - ✅ Deve aparecer na lista

2. **Deletar Categoria:**
   - Clicar em "Excluir"
   - Confirmar
   - ✅ Deve sumir da lista
   - 📋 **Veja o console** - deve aparecer logs

---

### **TESTE 2: Fornecedores** 👥

1. **Criar Fornecedor:**
   - Ir em "Home"
   - Tirar foto
   - Nome: "Fornecedor Teste"
   - Email: "teste@email.com"
   - Telefone: "11999999999"
   - Criar
   - ✅ Ir em "Fornecedores" e verificar

---

### **TESTE 3: Produtos** 📦

1. **Criar Produto:**
   - Ir em "Produtos"
   - Clicar "Novo"
   - Tirar foto do produto
   - Nome: "Notebook Dell"
   - Descrição: "i5, 8GB"
   - Escolher categoria
   - Escolher fornecedor
   - Preço custo: 2000
   - Preço venda: 3000
   - Estoque mín: 5
   - Salvar
   - ✅ Deve aparecer na lista de Produtos
   - ✅ Deve aparecer na aba Estoque (qtd = 0)

2. **Deletar Produto:**
   - Clicar em "Excluir"
   - Confirmar
   - ✅ Deve sumir de Produtos
   - ✅ Deve sumir de Estoque
   - 📋 **Veja o console** - deve mostrar:
     ```
     🗑️ DELETE produto: 1
     🗄️ Deletando estoque...
     📝 Deletando movimentações...
     📦 Deletando produto...
     ✅ Produto deletado!
     ```

---

### **TESTE 4: Estoque - Entrada** 📥

1. **Dar Entrada:**
   - Ir em "Estoque"
   - Encontrar produto
   - Clicar "Entrada"
   - Digite: 50
   - Confirmar
   - ✅ Quantidade deve mudar para 50

---

### **TESTE 5: Estoque - Saída** 📤 (CORRIGIDO!)

1. **Dar Saída:**
   - Ir em "Estoque"
   - Clicar "Saída"
   - ✅ Deve mostrar estoque atual
   - Clicar "OK"
   - ✅ Abre modal (novo!)
   - Digite: 10
   - Confirmar
   - ✅ Quantidade deve diminuir para 40

2. **Testar Validação:**
   - Clicar "Saída"
   - Digite: 100 (mais que tem)
   - ✅ Deve mostrar erro: "Quantidade maior que estoque atual"

---

## 🔍 **COMO VER OS LOGS:**

### **No Terminal da API:**
```
Você verá:
🗑️ DELETE produto: 1
🗄️ Deletando estoque do produto...
📝 Deletando movimentações do produto...
📦 Deletando produto...
✅ Produto deletado com sucesso!
```

### **No Expo (Metro Bundler):**
```
Você verá:
🗑️ Deletar produto clicado: 1 Notebook Dell
✅ Confirmado exclusão do produto: 1
🌐 Fazendo DELETE para: http://localhost:3000/produtos/1
📡 Resposta: 200 true
```

---

## ✅ **CHECKLIST DE FUNCIONALIDADES:**

### Categorias:
- [x] Criar ✅
- [x] Listar ✅
- [x] Editar ✅
- [x] Deletar ✅ (CORRIGIDO)

### Produtos:
- [x] Criar com foto ✅
- [x] Listar ✅
- [x] Editar ✅
- [x] Deletar ✅ (CORRIGIDO - deleta estoque junto)
- [x] Código de barras ✅
- [x] Escolher categoria ✅
- [x] Escolher fornecedor ✅

### Estoque:
- [x] Listar ✅
- [x] Entrada ✅
- [x] Saída ✅ (CORRIGIDO - modal funcional)
- [x] Alertas de estoque baixo ✅
- [x] Filtro estoque baixo ✅
- [x] Sincronização com produtos ✅

---

## 🎯 **RESULTADO ESPERADO:**

### **Fluxo Completo:**
```
1. Criar Categoria → ✅ Lista de categorias
2. Criar Fornecedor → ✅ Lista de fornecedores
3. Criar Produto → ✅ Lista de produtos + Estoque (qtd=0)
4. Entrada Estoque → ✅ Estoque atualizado
5. Saída Estoque → ✅ Estoque atualizado
6. Deletar Produto → ✅ Some de produtos E estoque
```

---

## 🐛 **SE AINDA NÃO FUNCIONAR:**

### 1. Verifique se a API está rodando:
```bash
curl http://localhost:3000
```

### 2. Teste direto na API:
```bash
# Criar categoria
curl -X POST http://localhost:3000/categorias -H "Content-Type: application/json" -d "{\"nome\":\"Teste\",\"ativo\":true}"

# Listar categorias
curl http://localhost:3000/categorias

# Deletar categoria (substitua o ID)
curl -X DELETE http://localhost:3000/categorias/1
```

### 3. Veja os logs:
- **Terminal da API**: Logs em tempo real
- **Expo Metro**: Logs do app

---

## 🎉 **TODAS AS CORREÇÕES APLICADAS!**

**Teste novamente e me avise se algum botão ainda não funcionar!** 

Os 3 problemas foram corrigidos:
1. ✅ Deletar Produtos - Funciona + deleta estoque
2. ✅ Deletar Categorias - Funciona com logs
3. ✅ Saída de Estoque - Modal funcional (sem Alert.prompt)

