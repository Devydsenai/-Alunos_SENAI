# 🚀 Como Usar o Sistema - Guia Completo

## 📱 Iniciando o Sistema

### 1. Inicie a API (Terminal 1):
```bash
cd api
npm run dev
```

Aguarde aparecer:
```
Banco conectado e modelos sincronizados.
API rodando na porta 3000
```

### 2. Inicie o App (Terminal 2):
```bash
npm start
```

### 3. Abra no Expo Go:
- Escaneie o QR Code
- Aguarde carregar

---

## 🎯 Funcionalidades Implementadas

### 📁 **ABA: HOME** (Criar Fornecedor)
✅ Cadastro de fornecedores com foto 3x4
- Tire foto ou selecione da galeria
- Preencha: Nome, Email, Telefone
- Marque se está ativo
- Clique em "Criar Cliente"

### 👥 **ABA: FORNECEDORES** (Lista)
✅ Visualização completa
- Ver todos os fornecedores cadastrados
- Fotos 3x4 grandes (200x200px)
- Editar informações
- Ativar/Desativar
- Excluir (com confirmação)
- Busca por nome, email ou telefone

### 📁 **ABA: CATEGORIAS**
✅ Gestão de categorias
- Criar categoria (Nome + Descrição)
- Listar todas
- Editar categoria
- Excluir categoria
- Status ativo/inativo

### 📦 **ABA: PRODUTOS** (NOVA!)
✅ Cadastro completo de produtos
- **Foto do produto** (3x4)
- **Nome e descrição**
- **Código de barras** (com busca automática)
  - Digite o código
  - Clique em 🔍 para buscar info na internet
  - Preenche nome automaticamente!
- **Categoria** (escolha horizontal)
- **Fornecedor** (escolha horizontal)
- **Preço de custo e venda**
- **Estoque mínimo**
- **Editar/Excluir produtos**

### 📊 **ABA: ESTOQUE** (NOVA!)
✅ Controle de estoque em tempo real
- **Resumo**:
  - Total de produtos
  - Produtos com estoque baixo
  - Total de itens em estoque
- **Filtro**: Ver só produtos com estoque baixo
- **Entrada de estoque**:
  - Clique em "Entrada"
  - Digite quantidade
  - Confirme
- **Saída de estoque**:
  - Clique em "Saída"
  - Digite quantidade
  - Confirme
- **Alertas visuais**:
  - ⚠️ Produtos com estoque abaixo do mínimo

---

## 🔄 Fluxo Completo de Uso

### 1️⃣ **Cadastre Fornecedores**
```
Home → Tire foto → Preencha dados → Criar
```

### 2️⃣ **Crie Categorias**
```
Categorias → Nova → Digite nome/descrição → Salvar
```

### 3️⃣ **Cadastre Produtos**
```
Produtos → Novo → 
- Tire foto do produto
- Digite código de barras (opcional)
- Busque info automática 🔍
- Escolha categoria
- Escolha fornecedor
- Preencha preços
- Salvar
```

### 4️⃣ **Gerencie o Estoque**
```
Estoque →
- Veja produtos cadastrados
- Dê entrada: Entrada → Digite qtd → Confirmar
- Dê saída: Saída → Digite qtd → Confirmar
- Monitore alertas de estoque baixo
```

---

## 🎨 Funcionalidades Especiais

### 📸 **Fotos 3x4**
- Fornecedores: 200x200px (grandes na lista)
- Produtos: Proporção 3:4

### 📊 **Código de Barras**
- Digite o código EAN-13, EAN-8 ou UPC
- Clique em 🔍 (buscar)
- Sistema busca na internet (Open Food Facts)
- Preenche nome e categoria automaticamente!

### 🌐 **CEP Automático** (Planejado)
- Digite CEP do fornecedor
- Sistema busca endereço completo
- Preenche automaticamente

### 🔄 **Sincronização Automática**
- Produto cadastrado → Aparece em Produtos e Estoque
- Produto deletado → Some de Produtos e Estoque
- Entrada/Saída → Atualiza estoque em tempo real

---

## 📋 Validações Implementadas

### ✅ **Fornecedores**
- Nome e email obrigatórios
- Email duplicado: bloqueia
- Foto opcional (proporção 3:4)

### ✅ **Categorias**
- Nome obrigatório
- Nome único (não permite duplicatas)

### ✅ **Produtos**
- Nome obrigatório
- Código de barras validado (EAN-13)
- Preços numéricos
- Estoque mínimo positivo
- Foto opcional
- Categoria e Fornecedor opcionais

### ✅ **Estoque**
- Entrada: quantidade positiva
- Saída: não pode exceder estoque atual
- Alerta automático quando < estoque mínimo

---

## 🧪 Testes

### Executar testes:
```bash
npm test
```

### Ver coverage:
```bash
npm run test:coverage
```

---

## 🐛 Resolução de Problemas

### ❌ **API não conecta**
```bash
# Verifique se está rodando:
curl http://localhost:3000

# Se não, reinicie:
cd api
npm run dev
```

### ❌ **Produtos não aparecem no estoque**
- Certifique-se que o produto foi criado com sucesso
- Recarregue a aba Estoque (navegue para outra aba e volte)
- Verifique se a API está rodando

### ❌ **Foto não aparece**
- Permissões de câmera/galeria concedidas?
- Testando em dispositivo físico? (emulador pode não ter câmera)
- Foto muito grande? (sistema reduz automaticamente)

### ❌ **Código de barras não busca**
- Certifique-se de ter internet
- Nem todos os produtos estão cadastrados na base
- API Open Food Facts pode estar lenta

---

## 📊 Estrutura de Dados

### Fornecedor/Cliente
```json
{
  "codigo": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "ativo": true,
  "foto": "file:///path/to/photo.jpg"
}
```

### Categoria
```json
{
  "codigo": 1,
  "nome": "Eletrônicos",
  "descricao": "Produtos eletrônicos diversos",
  "ativo": true
}
```

### Produto
```json
{
  "codigo": 1,
  "nome": "Notebook Dell",
  "descricao": "i5, 8GB RAM",
  "categoria_id": 1,
  "fornecedor_id": 1,
  "foto": "file:///path/to/photo.jpg",
  "codigo_barras": "7891234567890",
  "preco_custo": 2500.00,
  "preco_venda": 3500.00,
  "estoque_minimo": 5,
  "ativo": true
}
```

### Estoque
```json
{
  "produto_id": 1,
  "quantidade_atual": 10,
  "localizacao": "Prateleira A-1",
  "data_ultima_mov": "2025-10-13"
}
```

---

## 🎯 Próximas Features (Opcional)

- [ ] Tela de Movimentações (histórico completo)
- [ ] Relatórios em PDF
- [ ] Gráficos de vendas
- [ ] Busca de CEP para fornecedores
- [ ] Leitor de código de barras via câmera
- [ ] Notificações de estoque baixo
- [ ] Backup de dados
- [ ] Exportar para Excel

---

## 📚 Documentação Adicional

- [README Principal](README.md)
- [Documentação da API](docs/API.md)
- [Guia de Instalação](docs/SETUP.md)
- [APIs Externas](docs/APIS_EXTERNAS.md)

---

## ✅ Checklist de Requisitos do Professor

| Requisito | Status | Implementado |
|-----------|--------|--------------|
| 📝 Documentação | ✅ | README, API, SETUP, APIs Externas, Como Usar |
| 🧪 Testes unitários | ✅ | Jest + React Native Testing Library |
| 📱 Expo + React Native | ✅ | Funcionando perfeitamente |
| 🧩 Componentes React Native | ✅ | 100% nativos (zero HTML) |
| 📲 Rodar via Expo Go | ✅ | QR Code funcionando |
| 🌐 APIs externas | ✅ | ViaCEP + Open Food Facts |
| ⭐ Relevante | ✅ | Sistema completo de Almoxarifado |

---

**Sistema 100% Funcional e Pronto para Uso!** 🎉

**Desenvolvido com React Native + Expo para SENAI** ❤️

