# 🚀 Guia Rápido - JSDoc e Testes

## 📋 Comandos Essenciais

```bash
# Executar todos os testes
npm test

# Testes em modo watch (reexecuta automaticamente)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## 📊 Status Atual do Projeto

### ✅ Testes Implementados

- **68 testes passando** em 5 suítes de teste
- **100% de cobertura** nos serviços (`viaCep.ts` e `codigoBarras.ts`)
- Testes de exemplo e boas práticas incluídos

### 📁 Arquivos com JSDoc Completo

- ✅ `app/services/viaCep.ts` - Serviço de busca de CEP
- ✅ `app/services/codigoBarras.ts` - Serviço de código de barras
- ✅ `app/(tabs)/index.tsx` - Componente principal (parcial)

### 🧪 Arquivos de Teste

- `__tests__/services/viaCep.test.ts` - 20 testes
- `__tests__/services/codigoBarras.test.ts` - 23 testes
- `__tests__/services/utils.test.ts` - 20 testes (exemplos)
- `__tests__/components/ClientCard.test.tsx` - 3 testes
- `__tests__/example.test.tsx` - 2 testes

## 📖 Como Adicionar JSDoc

### Função Simples

```typescript
/**
 * Descrição clara do que a função faz
 * @param {tipo} nome - Descrição do parâmetro
 * @returns {tipo} Descrição do retorno
 */
function minhaFuncao(nome: tipo): tipo {
  // código
}
```

### Função Assíncrona

```typescript
/**
 * Descrição da função
 * @async
 * @param {string} id - ID do recurso
 * @returns {Promise<Dados | null>} Dados ou null se não encontrado
 * @throws {Error} Quando ID é inválido
 */
async function buscarDados(id: string): Promise<Dados | null> {
  // código
}
```

### Interface

```typescript
/**
 * Descrição da interface
 * @interface NomeDaInterface
 * @property {tipo} propriedade - Descrição
 */
interface NomeDaInterface {
  propriedade: tipo;
}
```

## 🧪 Como Criar Testes

### Estrutura Básica

```typescript
describe('Nome da Função/Componente', () => {
  it('deve descrever o comportamento esperado', () => {
    // Arrange: Preparar dados
    const entrada = 'valor';
    
    // Act: Executar função
    const resultado = minhaFuncao(entrada);
    
    // Assert: Verificar resultado
    expect(resultado).toBe('esperado');
  });
});
```

### Teste Assíncrono

```typescript
it('deve buscar dados da API', async () => {
  const resultado = await buscarDados('123');
  expect(resultado).toBeDefined();
});
```

### Teste com Mock

```typescript
it('deve chamar API com parâmetros corretos', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'mock' }),
  });
  
  await minhaFuncao();
  
  expect(global.fetch).toHaveBeenCalledWith('url-esperada');
});
```

## 🎯 Matchers Mais Usados

```typescript
// Igualdade
expect(valor).toBe(4)              // Igualdade estrita (===)
expect(obj).toEqual({a: 1})        // Igualdade de valor

// Booleanos
expect(valor).toBeTruthy()         // Valor verdadeiro
expect(valor).toBeFalsy()          // Valor falso

// Null/Undefined
expect(valor).toBeNull()           // É null
expect(valor).toBeUndefined()      // É undefined
expect(valor).toBeDefined()        // Não é undefined

// Arrays/Strings
expect(array).toContain(item)      // Array contém item
expect(string).toMatch(/regex/)    // String corresponde regex

// Números
expect(num).toBeGreaterThan(5)     // Maior que
expect(num).toBeLessThan(10)       // Menor que
expect(0.1 + 0.2).toBeCloseTo(0.3) // Aproximadamente igual

// Funções
expect(fn).toThrow()               // Lança erro
expect(mock).toHaveBeenCalled()    // Foi chamado
expect(mock).toHaveBeenCalledWith('arg') // Chamado com argumento
```

## 📊 Visualizar Relatório de Cobertura

1. Execute: `npm run test:coverage`
2. Abra: `coverage/lcov-report/index.html`
3. Navegue pelos arquivos para ver linhas não testadas

## 📚 Documentação Completa

Para mais detalhes, consulte: **`docs/JSDOC_E_TESTES.md`**

---

## ✨ Dicas Rápidas

### Para Documentar Código (JSDoc)

1. Sempre documente funções exportadas
2. Use `@example` para funções complexas
3. Documente `@throws` para exceções possíveis
4. Mantenha JSDoc atualizado ao modificar código

### Para Escrever Testes

1. Nomes descritivos: "deve fazer X quando Y"
2. Um teste = uma verificação
3. Use `describe` para agrupar testes relacionados
4. Mock dependências externas (APIs, banco de dados)
5. Teste casos de sucesso E erro

### Meta de Cobertura

- ✅ **Serviços**: 100% (funções críticas)
- ✅ **Componentes**: 80%+ (lógica principal)
- ⚠️ **Arquivos de configuração**: Opcional

---

## 🆘 Problemas Comuns

### "Test suite failed to run"
- Verifique se o jest-setup.js está configurado
- Execute: `npm test -- --no-cache`

### "Cannot find module"
- Verifique os imports nos arquivos de teste
- Caminho relativo deve estar correto

### Testes muito lentos
- Use mocks para APIs externas
- Evite operações I/O reais em testes

---

**Pronto para começar! 🚀**

Execute `npm test` e veja a mágica acontecer! ✨

