# 📝 Passo a Passo: Como Executar os Testes

## 🎯 Objetivo

Este guia mostra como executar os testes unitários do projeto, verificar a cobertura e entender os resultados.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que:

✅ Node.js está instalado (versão 16 ou superior)  
✅ Dependências do projeto estão instaladas  
✅ Você está na pasta raiz do projeto

### Verificando os pré-requisitos

```bash
# Verificar versão do Node.js
node --version

# Deve mostrar algo como: v16.x.x ou superior
```

### Instalando dependências (se necessário)

```bash
# Na pasta raiz do projeto
npm install
```

---

## 🚀 Passo 1: Executar Todos os Testes

### Comando

```bash
npm test
```

### O que este comando faz?

Este comando executa **todos os testes** do projeto uma única vez.

### O que você verá

```
> alunos_senai@1.0.0 test
> jest

 PASS  __tests__/services/viaCep.test.ts
 PASS  __tests__/services/codigoBarras.test.ts
 PASS  __tests__/services/utils.test.ts
 PASS  __tests__/components/ClientCard.test.tsx
 PASS  __tests__/example.test.tsx

Test Suites: 5 passed, 5 total
Tests:       68 passed, 68 total
Snapshots:   0 total
Time:        4.5 s
```

### Interpretando os resultados

#### ✅ Testes Passando (PASS)

```
 PASS  __tests__/services/viaCep.test.ts
```

- ✅ **PASS** = Todos os testes deste arquivo passaram
- ✅ Cor verde no terminal
- ✅ Tudo funcionando como esperado

#### ❌ Testes Falham (FAIL)

Se aparecer algo assim:

```
 FAIL  __tests__/services/viaCep.test.ts
  ● Serviço ViaCEP › formatarCep › deve formatar CEP

    expect(received).toBe(expected)

    Expected: "01310-100"
    Received: "01310100"
```

Isso significa:
- ❌ **FAIL** = Pelo menos um teste falhou
- ❌ Cor vermelha no terminal
- ❌ Mostra o que era esperado vs o que foi recebido
- ❌ Indica linha onde o teste falhou

### Quando usar?

- ✅ Antes de fazer commit
- ✅ Depois de modificar código
- ✅ Para verificar se tudo está funcionando
- ✅ Durante revisão de código

### Executando testes específicos

```bash
# Executar testes de um arquivo específico
npm test -- __tests__/services/viaCep.test.ts

# Executar testes de uma pasta
npm test -- __tests__/services/

# Executar testes que contêm "CEP" no nome
npm test -- -t "CEP"
```

---

## 🔄 Passo 2: Modo Watch (Desenvolvimento)

### Comando

```bash
npm run test:watch
```

### O que este comando faz?

Este comando mantém os testes **rodando continuamente** e **reexecuta automaticamente** quando você salva um arquivo.

### O que você verá

```
 PASS  __tests__/services/viaCep.test.ts
 
Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        2.5 s

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

### Opções interativas do Watch Mode

Enquanto estiver rodando, você pode pressionar:

| Tecla | Ação |
|-------|------|
| `a` | Executar **todos** os testes |
| `f` | Executar apenas testes que **falharam** |
| `p` | Filtrar por **nome de arquivo** |
| `t` | Filtrar por **nome do teste** |
| `q` | **Sair** do modo watch |
| `Enter` | **Reexecutar** os testes |

### Fluxo de trabalho com Watch Mode

1. **Abra o terminal** e execute `npm run test:watch`
2. **Abra seu editor** de código em outra janela
3. **Modifique o código** ou os testes
4. **Salve o arquivo** (Ctrl+S)
5. **Os testes reexecutam automaticamente** ✨
6. **Veja os resultados** no terminal
7. **Continue desenvolvendo** sem parar os testes

### Exemplo prático

```bash
# Terminal 1: Deixe rodando
npm run test:watch

# Terminal 2 ou Editor: Modifique o código
# Salve o arquivo
# Terminal 1 mostra automaticamente os novos resultados!
```

### Quando usar?

- ✅ Durante desenvolvimento ativo
- ✅ Quando estiver escrevendo novos testes
- ✅ Para feedback instantâneo
- ✅ TDD (Test-Driven Development)

### Como parar?

Pressione `q` ou `Ctrl+C` no terminal.

---

## 📊 Passo 3: Relatório de Cobertura

### Comando

```bash
npm run test:coverage
```

### O que este comando faz?

Este comando executa todos os testes e gera um **relatório detalhado** mostrando:
- Quantas linhas de código foram testadas
- Quantas condições (if/else) foram testadas
- Quais linhas **não** estão testadas

### O que você verá no terminal

```
 PASS  __tests__/services/viaCep.test.ts
 PASS  __tests__/services/codigoBarras.test.ts
 PASS  __tests__/services/utils.test.ts
 PASS  __tests__/components/ClientCard.test.tsx
 PASS  __tests__/example.test.tsx

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   10.04 |     9.14 |    7.44 |   10.06 |
 (tabs)           |       0 |        0 |       0 |       0 |
  about.tsx       |       0 |        0 |       0 |       0 | 17-408
  categories.tsx  |       0 |        0 |       0 |       0 | 25-315
  products.tsx    |       0 |        0 |       0 |       0 | 46-617
  stock.tsx       |       0 |        0 |       0 |       0 | 32-323
 services         |     100 |    96.66 |     100 |     100 |
  codigoBarras.ts |     100 |    95.83 |     100 |     100 | 110
  viaCep.ts       |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       68 passed, 68 total
Snapshots:   0 total
Time:        5.5 s
```

### Entendendo a tabela de cobertura

#### Colunas da tabela

| Coluna | O que significa | Exemplo |
|--------|-----------------|---------|
| **File** | Nome do arquivo | `viaCep.ts` |
| **% Stmts** | % de **declarações** testadas | `100` = todas testadas |
| **% Branch** | % de **condições** (if/else) testadas | `100` = todos os caminhos testados |
| **% Funcs** | % de **funções** testadas | `100` = todas as funções testadas |
| **% Lines** | % de **linhas** testadas | `100` = todas as linhas testadas |
| **Uncovered Line #s** | Linhas **não testadas** | `17-408` = linhas 17 a 408 sem testes |

#### Interpretando porcentagens

```
100%  ✅ EXCELENTE  - Código totalmente testado
80-99% ⚠️ BOM      - Boa cobertura, poucas linhas sem testes
60-79% ⚠️ REGULAR  - Cobertura aceitável, mas pode melhorar
< 60%  ❌ RUIM     - Muitas linhas sem testes, precisa melhorar
```

### Exemplo detalhado

```
services         |     100 |    96.66 |     100 |     100 |
  viaCep.ts      |     100 |      100 |     100 |     100 |
```

Isso significa:
- ✅ **100% Stmts**: Todas as declarações foram executadas pelos testes
- ✅ **100% Branch**: Todos os if/else foram testados
- ✅ **100% Funcs**: Todas as funções foram testadas
- ✅ **100% Lines**: Todas as linhas foram executadas

### Visualizando o relatório HTML

Após executar `npm run test:coverage`, um relatório HTML é gerado automaticamente.

#### Passo 1: Localize o arquivo

```
coverage/
└── lcov-report/
    └── index.html  ← ABRA ESTE ARQUIVO
```

#### Passo 2: Abra no navegador

**Opção A - Pelo explorador de arquivos:**
1. Navegue até a pasta `coverage/lcov-report/`
2. Clique duas vezes em `index.html`
3. Abre no seu navegador padrão

**Opção B - Por linha de comando:**

```bash
# Windows
start coverage/lcov-report/index.html

# Mac
open coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html
```

#### Passo 3: Navegue pelo relatório

O relatório HTML mostra:

1. **Página inicial**: Lista de todos os arquivos e suas coberturas
   - Clique em uma pasta para ver arquivos dentro dela
   - Clique em um arquivo para ver detalhes

2. **Página do arquivo**: Código fonte com destaque de cobertura
   - 🟢 **Verde**: Linhas testadas
   - 🔴 **Vermelho**: Linhas NÃO testadas
   - 🟡 **Amarelo**: Condições parcialmente testadas

3. **Exemplo visual**:

```javascript
   1 | export function formatarCep(cep: string): string {
   2 |   const cepLimpo = cep.replace(/\D/g, '');           // 🟢 Testada
   3 |   return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2'); // 🟢 Testada
   4 | }
```

### Melhorando a cobertura

Se encontrar linhas vermelhas (não testadas):

1. **Identifique** quais linhas não têm testes
2. **Crie testes** para essas linhas
3. **Execute** `npm run test:coverage` novamente
4. **Verifique** se as linhas ficaram verdes

### Quando usar?

- ✅ Antes de fazer um Pull Request
- ✅ Para identificar código sem testes
- ✅ Para garantir qualidade do código
- ✅ Ao final de uma sprint/tarefa

---

## 🎓 Resumo dos Comandos

| Comando | Quando Usar | Resultado |
|---------|-------------|-----------|
| `npm test` | Antes de commit, verificação rápida | Executa todos os testes uma vez |
| `npm run test:watch` | Durante desenvolvimento | Reexecuta automaticamente ao salvar |
| `npm run test:coverage` | Antes de PR, verificar qualidade | Mostra cobertura detalhada |

---

## 💡 Dicas Práticas

### Fluxo de trabalho recomendado

#### 1️⃣ Iniciando o desenvolvimento

```bash
# Terminal 1
npm run test:watch

# Continue programando e salvando
# Testes rodam automaticamente!
```

#### 2️⃣ Antes de fazer commit

```bash
# Parar o watch mode (Ctrl+C)
# Executar todos os testes
npm test

# Se tudo passou, fazer commit!
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

#### 3️⃣ Antes de criar Pull Request

```bash
# Verificar cobertura
npm run test:coverage

# Abrir relatório HTML
start coverage/lcov-report/index.html

# Verificar se cobertura está boa (>80%)
# Se sim, criar PR!
```

### Atalhos úteis

```bash
# Executar apenas testes que falharam
npm test -- --onlyFailures

# Executar testes de um arquivo específico
npm test viaCep

# Executar com mais detalhes (verbose)
npm test -- --verbose

# Limpar cache do Jest
npm test -- --clearCache
```

---

## 🐛 Resolvendo Problemas Comuns

### Problema 1: "Test suite failed to run"

**Erro:**
```
Test suite failed to run
Cannot find module...
```

**Solução:**
```bash
# Reinstalar dependências
npm install

# Limpar cache do Jest
npm test -- --clearCache --no-cache

# Executar novamente
npm test
```

### Problema 2: Testes muito lentos

**Solução:**
```bash
# Executar apenas arquivos modificados
npm test -- --onlyChanged

# Executar em paralelo (mais rápido)
npm test -- --maxWorkers=4
```

### Problema 3: "Out of memory"

**Solução:**
```bash
# Aumentar memória disponível
NODE_OPTIONS=--max_old_space_size=4096 npm test
```

### Problema 4: Testes passam localmente mas falham no CI

**Causas comuns:**
- Dependências de tempo (setTimeout)
- Testes dependentes da ordem de execução
- Diferenças de timezone

**Solução:**
```bash
# Executar testes em ordem aleatória
npm test -- --randomize

# Executar múltiplas vezes
npm test -- --testSequencer=@jest/test-sequencer
```

---

## 📚 Recursos Adicionais

### Documentação do projeto

- 📖 [Guia Completo de JSDoc e Testes](./JSDOC_E_TESTES.md)
- ⚡ [Guia Rápido](./GUIA_RAPIDO_TESTES.md)
- 📊 [Resumo da Implementação](./RESUMO_IMPLEMENTACAO.md)

### Documentação oficial

- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Jest - CLI Options](https://jestjs.io/docs/cli)
- [Testing Library](https://testing-library.com/docs/react-native-testing-library/intro)

### Exemplos no projeto

- `__tests__/services/viaCep.test.ts` - Testes de serviço
- `__tests__/services/utils.test.ts` - Exemplos de boas práticas
- `__tests__/components/ClientCard.test.tsx` - Testes de componente

---

## ✅ Checklist: Antes de Fazer Commit

Use este checklist para garantir qualidade:

```
□ Executei npm test e todos passaram
□ Executei npm run test:coverage
□ Cobertura está acima de 80% (ou manteve a mesma)
□ Não há linhas críticas sem testes
□ Testes são descritivos e claros
□ JSDoc está atualizado
□ Código está formatado
```

---

## 🎯 Conclusão

Agora você sabe:

✅ Como executar todos os testes com `npm test`  
✅ Como usar modo watch durante desenvolvimento  
✅ Como gerar e interpretar relatório de cobertura  
✅ Como identificar e resolver problemas  
✅ Boas práticas de fluxo de trabalho  

**Continue testando e mantendo seu código com alta qualidade!** 🚀

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas não listados aqui:

1. Verifique a documentação oficial do Jest
2. Veja os exemplos nos arquivos de teste do projeto
3. Execute `npm test -- --help` para ver todas as opções
4. Consulte `docs/JSDOC_E_TESTES.md` para mais detalhes

**Bons testes! 🧪✨**

