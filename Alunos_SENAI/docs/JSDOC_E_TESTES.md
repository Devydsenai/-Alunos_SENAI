# Documentação JSDoc e Testes Unitários

## 📚 Índice

1. [Introdução ao JSDoc](#introdução-ao-jsdoc)
2. [Como Usar JSDoc no Projeto](#como-usar-jsdoc-no-projeto)
3. [Testes Unitários com Jest](#testes-unitários-com-jest)
4. [Executando os Testes](#executando-os-testes)
5. [Cobertura de Testes](#cobertura-de-testes)
6. [Boas Práticas](#boas-práticas)

---

## Introdução ao JSDoc

JSDoc é um padrão de documentação para código JavaScript/TypeScript que permite gerar documentação automaticamente a partir de comentários especiais no código.

### Por que usar JSDoc?

- ✅ **Documentação automática**: Gera documentação HTML a partir do código
- ✅ **IntelliSense melhorado**: IDEs mostram descrições e tipos ao usar funções
- ✅ **Manutenibilidade**: Facilita entender o código meses/anos depois
- ✅ **Padrão da indústria**: Amplamente usado em projetos JavaScript

---

## Como Usar JSDoc no Projeto

### Estrutura Básica

Comentários JSDoc começam com `/**` e terminam com `*/`:

\`\`\`javascript
/**
 * Descrição breve da função
 * @param {tipo} nome - Descrição do parâmetro
 * @returns {tipo} Descrição do retorno
 */
function minhaFuncao(nome) {
  return \`Olá, \${nome}\`;
}
\`\`\`

### Exemplos do Projeto

#### 1. Documentando Interfaces

\`\`\`typescript
/**
 * Interface representando um cliente/fornecedor no sistema
 * @interface Cliente
 * @property {number} codigo - Código único identificador do cliente
 * @property {string} nome - Nome completo do cliente
 * @property {string} email - Endereço de email do cliente
 * @property {string} telefone - Número de telefone do cliente
 * @property {boolean} ativo - Status de atividade do cliente
 * @property {string} [foto] - URI da foto do cliente (opcional)
 */
interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  foto?: string;
}
\`\`\`

#### 2. Documentando Funções Simples

\`\`\`typescript
/**
 * Formata CEP para o padrão brasileiro 00000-000
 * @function formatarCep
 * @param {string} cep - CEP com ou sem formatação
 * @returns {string} CEP formatado no padrão 00000-000
 * @example
 * formatarCep('01310100'); // Retorna: "01310-100"
 * formatarCep('01310-100'); // Retorna: "01310-100"
 */
export function formatarCep(cep: string): string {
  const cepLimpo = cep.replace(/\\D/g, '');
  return cepLimpo.replace(/(\\d{5})(\\d{3})/, '$1-$2');
}
\`\`\`

#### 3. Documentando Funções Assíncronas

\`\`\`typescript
/**
 * Busca informações de endereço através do CEP na API ViaCEP
 * @async
 * @function buscarCep
 * @param {string} cep - CEP no formato 00000-000 ou 00000000
 * @returns {Promise<EnderecoViaCep | null>} Dados do endereço ou null em caso de erro
 * @throws {Error} Lança erro se o CEP for inválido
 * @example
 * // Buscando CEP com hífen
 * const endereco = await buscarCep('01310-100');
 * if (endereco) {
 *   console.log(endereco.logradouro); // "Avenida Paulista"
 * }
 */
export async function buscarCep(cep: string): Promise<EnderecoViaCep | null> {
  // implementação...
}
\`\`\`

#### 4. Documentando Componentes React

\`\`\`typescript
/**
 * @fileoverview Tela principal do sistema de gerenciamento de fornecedores
 * Permite visualizar, cadastrar, editar e excluir fornecedores/clientes
 * @module app/(tabs)/index
 */

/**
 * Componente principal da tela Home - Sistema de Fornecedores
 * Gerencia o CRUD completo de clientes/fornecedores
 * @component
 * @returns {JSX.Element} Tela principal do sistema
 */
export default function HomeScreen() {
  // implementação...
}
\`\`\`

### Tags JSDoc Principais

| Tag | Descrição | Exemplo |
|-----|-----------|---------|
| `@param` | Descreve um parâmetro | `@param {string} nome - Nome do usuário` |
| `@returns` | Descreve o retorno | `@returns {boolean} True se válido` |
| `@async` | Marca função assíncrona | `@async` |
| `@throws` | Documenta erros | `@throws {Error} Quando CEP é inválido` |
| `@example` | Mostra exemplo de uso | `@example minhaFuncao('teste')` |
| `@interface` | Documenta interface | `@interface Cliente` |
| `@property` | Propriedade de interface | `@property {string} nome - Nome` |
| `@component` | Marca componente React | `@component` |
| `@module` | Identifica módulo | `@module services/viaCep` |

---

## Testes Unitários com Jest

### O que são Testes Unitários?

Testes unitários verificam se pequenas partes isoladas do código (funções, métodos) funcionam corretamente.

### Benefícios

- 🐛 **Detecta bugs cedo**: Encontra problemas antes de chegarem à produção
- 🔄 **Facilita refatoração**: Permite alterar código com confiança
- 📖 **Serve como documentação**: Mostra como o código deve funcionar
- ⚡ **Agiliza desenvolvimento**: Evita testes manuais repetitivos

### Estrutura de um Teste

\`\`\`typescript
describe('Nome do grupo de testes', () => {
  it('deve descrever o comportamento esperado', () => {
    // Arrange (Preparar)
    const entrada = 'valor';
    
    // Act (Agir)
    const resultado = minhaFuncao(entrada);
    
    // Assert (Afirmar)
    expect(resultado).toBe('valor esperado');
  });
});
\`\`\`

### Exemplos de Testes do Projeto

#### 1. Teste de Função Simples

\`\`\`typescript
describe('formatarCep', () => {
  it('deve formatar CEP sem hífen', () => {
    expect(formatarCep('01310100')).toBe('01310-100');
  });

  it('deve manter CEP já formatado', () => {
    expect(formatarCep('01310-100')).toBe('01310-100');
  });

  it('deve invalidar CEP vazio', () => {
    expect(formatarCep('')).toBe('');
  });
});
\`\`\`

#### 2. Teste com Mock de API

\`\`\`typescript
// Mock do fetch global
global.fetch = jest.fn();

describe('buscarCep', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar endereço com CEP válido', async () => {
    const enderecoMock = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => enderecoMock,
    });

    const resultado = await buscarCep('01310-100');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/01310100/json/'
    );
    expect(resultado).toEqual(enderecoMock);
  });

  it('deve retornar null quando API retornar erro', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const resultado = await buscarCep('01310100');

    expect(resultado).toBeNull();
  });
});
\`\`\`

#### 3. Teste de Componente React

\`\`\`typescript
import { render, fireEvent } from '@testing-library/react-native';

describe('ClientCard', () => {
  const mockClient = {
    codigo: 1,
    nome: 'João Silva',
    email: 'joao@test.com',
    telefone: '11999999999',
    ativo: true,
  };

  it('deve renderizar informações do cliente', () => {
    const { getByText } = render(
      <ClientCard client={mockClient} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(getByText('João Silva')).toBeTruthy();
    expect(getByText('joao@test.com')).toBeTruthy();
  });

  it('deve chamar onEdit quando botão for clicado', () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(
      <ClientCard client={mockClient} onEdit={onEditMock} onDelete={() => {}} />
    );

    fireEvent.press(getByTestId('edit-button'));
    expect(onEditMock).toHaveBeenCalledWith(1);
  });
});
\`\`\`

### Matchers do Jest

| Matcher | Descrição | Exemplo |
|---------|-----------|---------|
| `toBe()` | Igualdade estrita (===) | `expect(2+2).toBe(4)` |
| `toEqual()` | Igualdade de valor | `expect({a:1}).toEqual({a:1})` |
| `toBeTruthy()` | Valor é verdadeiro | `expect(true).toBeTruthy()` |
| `toBeFalsy()` | Valor é falso | `expect(false).toBeFalsy()` |
| `toBeNull()` | Valor é null | `expect(null).toBeNull()` |
| `toBeUndefined()` | Valor é undefined | `expect(undefined).toBeUndefined()` |
| `toContain()` | Array contém item | `expect([1,2,3]).toContain(2)` |
| `toMatch()` | String corresponde regex | `expect('hello').toMatch(/ell/)` |
| `toThrow()` | Função lança erro | `expect(fn).toThrow('erro')` |
| `toHaveBeenCalled()` | Mock foi chamado | `expect(mock).toHaveBeenCalled()` |
| `toHaveBeenCalledWith()` | Mock foi chamado com args | `expect(mock).toHaveBeenCalledWith('arg')` |

---

## Executando os Testes

### Comandos Disponíveis

\`\`\`bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta ao salvar)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage

# Executar testes de um arquivo específico
npm test -- __tests__/services/viaCep.test.ts

# Executar testes de uma pasta específica
npm test -- __tests__/services/
\`\`\`

### Estrutura de Pastas

\`\`\`
__tests__/
├── services/           # Testes dos serviços
│   ├── viaCep.test.ts
│   ├── codigoBarras.test.ts
│   └── utils.test.ts
├── components/         # Testes dos componentes
│   └── ClientCard.test.tsx
└── example.test.tsx    # Testes de exemplo
\`\`\`

---

## Cobertura de Testes

### O que é Cobertura?

A cobertura de testes mostra qual porcentagem do código está sendo testada.

### Métricas de Cobertura

- **Statements**: Porcentagem de declarações executadas
- **Branches**: Porcentagem de ramificações (if/else) testadas
- **Functions**: Porcentagem de funções executadas
- **Lines**: Porcentagem de linhas executadas

### Visualizando o Relatório

Após executar `npm run test:coverage`, abra o arquivo:

\`\`\`
coverage/lcov-report/index.html
\`\`\`

### Interpretando os Resultados

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |
 services         |     100 |      100 |     100 |     100 |
  viaCep.ts       |     100 |      100 |     100 |     100 |
  codigoBarras.ts |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------
```

✅ **100%**: Código totalmente testado  
⚠️ **80-99%**: Boa cobertura  
❌ **< 80%**: Precisa de mais testes  

---

## Boas Práticas

### JSDoc

1. ✅ **Seja descritivo**: Explique o "porquê", não apenas o "o quê"
2. ✅ **Use exemplos**: Inclua `@example` para funções complexas
3. ✅ **Documente exceções**: Use `@throws` para erros possíveis
4. ✅ **Mantenha atualizado**: Atualize JSDoc ao mudar código
5. ✅ **Use tipos corretos**: Aproveite TypeScript para tipos precisos

### Testes

1. ✅ **Nomes descritivos**: Use "deve..." para descrever comportamento
2. ✅ **Um assert por teste**: Cada teste verifica uma coisa
3. ✅ **Arrange-Act-Assert**: Organize código em 3 etapas
4. ✅ **Isole testes**: Cada teste deve ser independente
5. ✅ **Mock dependências externas**: Use mocks para APIs, banco, etc
6. ✅ **Teste casos extremos**: Valores vazios, nulos, limites
7. ✅ **Mantenha testes rápidos**: Testes lentos não são executados
8. ✅ **Limpe após testes**: Use `beforeEach` e `afterEach`

### Exemplos de Bons e Maus Testes

#### ❌ Teste Ruim

\`\`\`typescript
it('teste', () => {
  expect(formatarCep('01310100')).toBe('01310-100');
  expect(validarCep('01310100')).toBe(true);
  expect(buscarCep('01310100')).resolves.toBeDefined();
});
\`\`\`

**Problemas:**
- Nome não descritivo
- Testa múltiplas coisas
- Difícil debugar quando falha

#### ✅ Teste Bom

\`\`\`typescript
describe('formatarCep', () => {
  it('deve formatar CEP de 8 dígitos no padrão 00000-000', () => {
    // Arrange
    const cepSemFormatacao = '01310100';
    
    // Act
    const resultado = formatarCep(cepSemFormatacao);
    
    // Assert
    expect(resultado).toBe('01310-100');
  });
});
\`\`\`

**Qualidades:**
- Nome claro e descritivo
- Testa apenas uma coisa
- Organizado (AAA pattern)
- Fácil entender e debugar

---

## Recursos Adicionais

### Documentação Oficial

- [JSDoc Official](https://jsdoc.app/)
- [Jest Documentation](https://jestjs.io/)
- [Testing Library React Native](https://testing-library.com/docs/react-native-testing-library/intro/)

### Arquivos de Referência no Projeto

- `app/services/viaCep.ts` - Exemplo de JSDoc em serviços
- `app/services/codigoBarras.ts` - Exemplo de JSDoc em serviços
- `app/(tabs)/index.tsx` - Exemplo de JSDoc em componentes
- `__tests__/services/viaCep.test.ts` - Exemplo de testes de serviço
- `__tests__/services/codigoBarras.test.ts` - Exemplo de testes de serviço
- `__tests__/services/utils.test.ts` - Exemplos de boas práticas
- `__tests__/components/ClientCard.test.tsx` - Exemplo de teste de componente

---

## 🎯 Conclusão

A combinação de JSDoc e testes unitários cria um código:

- 📖 **Documentado**: Fácil de entender
- 🐛 **Confiável**: Menos bugs
- 🔄 **Manutenível**: Fácil de modificar
- ⚡ **Profissional**: Padrão da indústria

**Continue praticando e mantenha sempre seu código documentado e testado!** 🚀

