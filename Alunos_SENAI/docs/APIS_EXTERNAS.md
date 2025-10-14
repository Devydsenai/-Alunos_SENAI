# 🌐 APIs Externas Utilizadas

Este documento descreve todas as APIs externas integradas no projeto.

---

## 1. 📮 ViaCEP

### Descrição
API gratuita para consulta de CEP (Código de Endereçamento Postal) brasileiro.

### Uso no Projeto
- Busca automática de endereços ao cadastrar fornecedores/clientes
- Preenchimento automático de logradouro, bairro, cidade e UF

### Endpoint
```
GET https://viacep.com.br/ws/{cep}/json/
```

### Exemplo de Requisição
```bash
curl https://viacep.com.br/ws/01001000/json/
```

### Exemplo de Resposta
```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Tratamento de Erros
- CEP não encontrado: Retorna `{"erro": true}`
- CEP inválido: Retorna erro HTTP
- Sem conexão: Tratado localmente com try/catch

### Implementação
- **Arquivo:** `app/services/viaCep.ts`
- **Funções:**
  - `buscarCep(cep: string)` - Busca endereço por CEP
  - `formatarCep(cep: string)` - Formata CEP para padrão 00000-000
  - `validarCep(cep: string)` - Valida formato do CEP

### Limitações
- Apenas CEPs brasileiros
- Sem autenticação necessária
- Rate limit: Não especificado (uso responsável)

### Documentação Oficial
🔗 https://viacep.com.br/

---

## 2. 📊 Open Food Facts

### Descrição
Base de dados colaborativa, livre e aberta de produtos alimentícios de todo o mundo.

### Uso no Projeto
- Validação de código de barras de produtos
- Busca automática de informações do produto
- Preenchimento automático de nome, marca e imagem

### Endpoint
```
GET https://world.openfoodfacts.org/api/v0/product/{barcode}.json
```

### Exemplo de Requisição
```bash
curl https://world.openfoodfacts.org/api/v0/product/7891000100103.json
```

### Exemplo de Resposta
```json
{
  "code": "7891000100103",
  "status": 1,
  "product": {
    "product_name": "Leite Condensado",
    "brands": "Nestlé",
    "categories": "Laticínios, Leite condensado",
    "image_url": "https://...",
    "quantity": "395g"
  }
}
```

### Tratamento de Erros
- Produto não encontrado: `{"status": 0}`
- Código inválido: Retorna erro HTTP
- Sem conexão: Tratado localmente

### Implementação
- **Arquivo:** `app/services/codigoBarras.ts`
- **Funções:**
  - `buscarProdutoPorCodigoBarras(codigo: string)` - Busca produto
  - `validarCodigoBarras(codigo: string)` - Valida código de barras (EAN-13, EAN-8, UPC)
  - `formatarCodigoBarras(codigo: string)` - Formata para exibição

### Tipos de Código de Barras Suportados
- **EAN-13** (13 dígitos) - Padrão europeu/brasileiro
- **EAN-8** (8 dígitos) - Versão curta
- **UPC-A** (12 dígitos) - Padrão norte-americano

### Validação de Dígito Verificador
A função `validarCodigoBarras` implementa o algoritmo de verificação EAN-13:
```
1. Soma dos dígitos em posições ímpares
2. Soma dos dígitos em posições pares × 3
3. Dígito verificador = (10 - (soma % 10)) % 10
```

### Limitações
- Focado em produtos alimentícios
- Base de dados colaborativa (pode ter falhas)
- Nem todos os produtos estão cadastrados
- Sem autenticação necessária
- Rate limit: 100 req/min (uso normal)

### Documentação Oficial
🔗 https://world.openfoodfacts.org/data

---

## 3. 🔧 API Local (Backend)

### Descrição
API REST própria do projeto para gerenciamento de dados.

### Base URL
```
http://localhost:3000
```

### Módulos
1. **Clientes/Fornecedores** - `/clientes`
2. **Categorias** - `/categorias`
3. **Produtos** - `/produtos`
4. **Estoque** - `/estoque`
5. **Movimentações** - `/movimentacoes`

### Tecnologias
- Node.js + Express
- Sequelize ORM
- SQLite Database

### Documentação Completa
📖 Ver [API.md](API.md)

---

## 📊 Comparação de APIs

| API | Tipo | Autenticação | Rate Limit | Dados Retornados |
|-----|------|--------------|------------|------------------|
| ViaCEP | Gratuita | Não | Ilimitado* | Endereços BR |
| Open Food Facts | Gratuita | Não | 100/min | Produtos alimentícios |
| API Local | Própria | Não | Ilimitado | Dados do sistema |

*Uso responsável recomendado

---

## 🔐 Segurança e Privacidade

### ViaCEP
- ✅ HTTPS obrigatório
- ✅ Sem dados pessoais
- ✅ Apenas consulta de endereços públicos
- ✅ Não armazena logs de requisições

### Open Food Facts
- ✅ HTTPS disponível
- ✅ Dados públicos e colaborativos
- ✅ Sem informações sensíveis
- ✅ Open Source

### API Local
- ⚠️ HTTP local (desenvolvimento)
- 🔒 Produção: Usar HTTPS
- 🔒 Implementar autenticação JWT (futuro)
- 🔒 Validar todas as entradas

---

## 🧪 Testes com APIs Externas

### ViaCEP
```typescript
// Teste básico
import { buscarCep } from '@/services/viaCep';

test('deve buscar CEP válido', async () => {
  const resultado = await buscarCep('01001000');
  expect(resultado).not.toBeNull();
  expect(resultado?.localidade).toBe('São Paulo');
});

test('deve retornar null para CEP inválido', async () => {
  const resultado = await buscarCep('00000000');
  expect(resultado).toBeNull();
});
```

### Open Food Facts
```typescript
// Teste básico
import { buscarProdutoPorCodigoBarras } from '@/services/codigoBarras';

test('deve buscar produto válido', async () => {
  const resultado = await buscarProdutoPorCodigoBarras('7891000100103');
  expect(resultado).not.toBeNull();
  expect(resultado?.product_name).toBeTruthy();
});

test('deve validar código de barras EAN-13', () => {
  expect(validarCodigoBarras('7891000100103')).toBe(true);
  expect(validarCodigoBarras('1234567890123')).toBe(false);
});
```

---

## 📈 Monitoramento

### Métricas Importantes
- Tempo de resposta das APIs
- Taxa de sucesso/erro
- Fallback quando API externa falha

### Logging
```typescript
// Exemplo de log
console.log('🌐 Buscando CEP:', cep);
console.log('✅ CEP encontrado:', endereco);
console.log('❌ Erro ao buscar CEP:', error);
```

---

## 🚀 Melhorias Futuras

### ViaCEP
- [ ] Cache de CEPs consultados
- [ ] Retry automático em caso de erro
- [ ] Fallback para API alternativa

### Open Food Facts
- [ ] Cache de produtos consultados
- [ ] Busca em múltiplas bases (internacionais)
- [ ] Contribuir com dados locais

### Geral
- [ ] Implementar circuit breaker
- [ ] Métricas de uso das APIs
- [ ] Testes de integração automatizados

---

## 📚 Recursos Adicionais

- [Guia de CEPs no Brasil](https://buscacepinter.correios.com.br/)
- [Padrões de Código de Barras](https://www.gs1.org/standards/barcodes)
- [REST API Best Practices](https://restfulapi.net/)

---

**Última atualização:** Outubro 2025
**Mantido por:** Equipe de Desenvolvimento SENAI


