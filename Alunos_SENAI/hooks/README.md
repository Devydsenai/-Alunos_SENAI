# 🎣 Pasta Hooks

Esta pasta deve conter **hooks personalizados** que encapsulam lógica reutilizável da aplicação.

## 🎯 O que são Hooks?

Hooks são funções que permitem usar state e outros recursos do React em componentes funcionais.

## 📦 O que colocar aqui?

### ✅ Deve ir para hooks/
- Lógica de formulários
- Chamadas de API
- Gerenciamento de estado local
- Manipulação de dados
- Debounce/Throttle
- Validações
- Listeners de eventos

### ❌ Não deve ir para hooks/
- Componentes visuais (vão em `components/`)
- Estilos (vão em `.styles.tsx`)
- Configurações (vão em `constants/`)
- Integração com APIs externas específicas (vão em `app/services/`)

## 📁 Estrutura Recomendada

```
hooks/
├── useApi.ts              # Hook para chamadas de API
├── useForm.ts             # Hook para gerenciamento de formulários
├── useDebounce.ts         # Hook para debounce
└── useLocalStorage.ts     # Hook para storage local
```

## 💡 Exemplos de Hooks

### useApi.ts - Hook para Chamadas de API
```typescript
import { useState, useCallback } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData };
}

// Uso:
// const { data, loading, error, fetchData } = useApi<Cliente[]>('http://localhost:3000/clientes');
```

### useForm.ts - Hook para Formulários
```typescript
import { useState } from 'react';

interface FormValidation {
  [key: string]: (value: any) => string | null;
}

export function useForm<T extends object>(
  initialValues: T,
  validations?: FormValidation
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar campo se houver validação
    if (validations && validations[name as string]) {
      const error = validations[name as string](value);
      setErrors(prev => ({ ...prev, [name]: error || undefined }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    isValid,
  };
}

// Uso:
// const { values, errors, handleChange, isValid } = useForm({
//   nome: '',
//   email: '',
// }, {
//   email: (value) => !value.includes('@') ? 'Email inválido' : null
// });
```

### useDebounce.ts - Hook para Debounce
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Uso em pesquisa:
// const [pesquisa, setPesquisa] = useState('');
// const debouncedPesquisa = useDebounce(pesquisa, 500);
//
// useEffect(() => {
//   // Buscar apenas quando o usuário parar de digitar
//   if (debouncedPesquisa) {
//     buscarClientes(debouncedPesquisa);
//   }
// }, [debouncedPesquisa]);
```

## 🚀 Hooks Sugeridos para Este Projeto

### 1. useClientes
Encapsular toda lógica de gerenciamento de clientes:
```typescript
export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarClientes = async () => { /* ... */ };
  const adicionarCliente = async (cliente: Cliente) => { /* ... */ };
  const atualizarCliente = async (id: number, dados: Partial<Cliente>) => { /* ... */ };
  const deletarCliente = async (id: number) => { /* ... */ };

  return {
    clientes,
    loading,
    buscarClientes,
    adicionarCliente,
    atualizarCliente,
    deletarCliente,
  };
}
```

### 2. useCategorias
Similar ao useClientes, mas para categorias.

### 3. useProdutos
Similar ao useClientes, mas para produtos.

### 4. useEstoque
Gerenciar movimentações de estoque.

## 📚 Boas Práticas

1. **Nomeação**: Sempre comece com "use" (ex: `useForm`, `useApi`)
2. **Single Responsibility**: Cada hook tem uma responsabilidade
3. **Reutilização**: Hooks devem ser genéricos
4. **TypeScript**: Sempre use tipos
5. **Documentação**: Documente parâmetros e retorno
6. **Testes**: Hooks devem ser testáveis
7. **Dependencies**: Sempre declare dependencies corretamente no useEffect

## ⚠️ Regras dos Hooks

1. Apenas chame hooks no **topo** do componente
2. Não chame hooks dentro de **loops**, **condições** ou **funções aninhadas**
3. Apenas chame hooks em **componentes React** ou **outros hooks**

## 🎓 Exercício para Alunos

**Desafio 1**: Criar um hook `useClientes` que encapsule toda a lógica de gerenciamento de clientes das telas.

**Desafio 2**: Criar um hook `useDebounce` e aplicá-lo nas barras de pesquisa.

**Desafio 3**: Criar um hook `useForm` genérico que pode ser usado em todos os formulários do app.

## 📖 Recursos

- [React Hooks Documentation](https://react.dev/reference/react)
- [Building Your Own Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

📖 **Documentação completa**: Veja `ORGANIZACAO_CODIGO.md` na raiz do projeto

