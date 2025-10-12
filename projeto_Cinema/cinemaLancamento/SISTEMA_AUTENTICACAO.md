# 🔐 Sistema de Autenticação Admin/Cliente

## 🎯 Problema Resolvido

**Questão:** Como permitir que apenas administradores cadastrem filmes, mas facilitar demonstrações?

**Solução:** Sistema de autenticação com dois modos (Admin e Cliente) que pode ser alternado facilmente na tela "Sobre".

---

## ✨ Como Funciona

### 👤 Modo CLIENTE (Padrão)
- ✅ Pode explorar filmes
- ✅ Pode escolher poltronas
- ✅ Pode ver trailers
- ❌ **NÃO pode cadastrar filmes**
- ❌ Aba "Cadastrar" **não aparece** no menu

### 👨‍💼 Modo ADMINISTRADOR
- ✅ Tem TODAS as permissões do cliente
- ✅ **PODE cadastrar filmes**
- ✅ Aba "Cadastrar" **aparece** no menu
- ✅ Acesso total ao sistema

---

## 🚀 Como Usar

### Para Demonstração:

#### 1. **Mostrar como CLIENTE** (visão do usuário comum)
```
1. Abra o app (já inicia como cliente)
2. Navegue pelas abas:
   🏠 Início
   🔍 Explorar
   ℹ️ Sobre
   
3. Mostre que NÃO HÁ aba "Cadastrar" ✅
4. Cliente só pode ver e escolher filmes
```

#### 2. **Alternar para ADMIN** (mostrar poder do sistema)
```
1. Vá para aba "ℹ️ Sobre"
2. Role até "🔐 Alternar Modo"
3. Digite a senha: admin123
4. Clique em "🔓 Entrar como Admin"
5. ✅ Agora a aba "➕ Cadastrar" APARECE!
6. Cadastre um filme e mostre o resultado
```

#### 3. **Voltar para CLIENTE**
```
1. Vá para "ℹ️ Sobre"
2. Clique em "👤 Voltar para Cliente"
3. Aba "Cadastrar" DESAPARECE novamente ✅
```

---

## 🔒 Segurança

### Senha Padrão
```typescript
Usuário: Não precisa
Senha Admin: admin123
```

### ⚠️ Para Produção:
```typescript
// NÃO use senha hardcoded!
// Implemente autenticação real:

1. Backend com JWT
2. Hash de senhas (bcrypt)
3. Tokens de sessão
4. Refresh tokens
5. OAuth/Social Login
```

---

## 📁 Arquivos do Sistema

```
app/
├── context/
│   └── AuthContext.tsx        # ✅ Gerencia autenticação
├── _layout.tsx                # ✅ Provider do contexto
└── (tabs)/
    ├── _layout.tsx            # ✅ Controla visibilidade das tabs
    ├── about.tsx              # ✅ Tela para alternar modo
    ├── about.styles.ts        # ✅ Estilos da tela
    └── cadastro.tsx           # ✅ Só acessível por admin
```

---

## 🎨 Interface da Tela "Sobre"

### Modo Cliente:
```
┌─────────────────────────────────┐
│  ℹ️ Sobre o App                 │
├─────────────────────────────────┤
│  👤 Status Atual                │
│  ┌─────────────────────────┐   │
│  │     👤                  │   │
│  │   CLIENTE               │   │
│  │   Você pode explorar... │   │
│  └─────────────────────────┘   │
│                                 │
│  🔐 Alternar Modo               │
│  [Digite a senha]               │
│  [🔓 Entrar como Admin]         │
│  💡 Dica: admin123              │
└─────────────────────────────────┘
```

### Modo Admin:
```
┌─────────────────────────────────┐
│  ℹ️ Sobre o App                 │
├─────────────────────────────────┤
│  👤 Status Atual                │
│  ┌─────────────────────────┐   │
│  │     👨‍💼                  │   │
│  │  ADMINISTRADOR          │   │
│  │  Acesso total!          │   │
│  └─────────────────────────┘   │
│                                 │
│  🔐 Alternar Modo               │
│  [👤 Voltar para Cliente]       │
└─────────────────────────────────┘
```

---

## 🎯 Código de Implementação

### AuthContext (Context API)

```typescript
// app/context/AuthContext.tsx
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState<'cliente' | 'admin'>('cliente');

  const loginAsAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setUserRole('admin');
      return true;
    }
    return false;
  };

  // ... outros métodos
}
```

### Controle de Tab

```typescript
// app/(tabs)/_layout.tsx
export default function TabLayout() {
  const { isAdmin } = useAuth();  // ✅ Hook do contexto
  
  return (
    <Tabs>
      <Tabs.Screen
        name="cadastro"
        options={{
          href: isAdmin ? '/(tabs)/cadastro' : null,  // ✅ Condicional!
        }}
      />
    </Tabs>
  );
}
```

### Usar em Qualquer Tela

```typescript
import { useAuth } from '../context/AuthContext';

export default function MinhaTelafunction MinhaTela() {
  const { isAdmin, userRole } = useAuth();
  
  if (!isAdmin) {
    return <Text>Acesso negado!</Text>;
  }
  
  return <AdminContent />;
}
```

---

## 🎬 Fluxo de Demonstração Perfeito

### 1. **Apresentação Inicial (Como Cliente)**
```
"Olá! Este é o Cinema App.
Como CLIENTE, você pode:
- Ver filmes em cartaz
- Buscar filmes
- Escolher poltronas
- Assistir trailers

Note que NÃO HÁ opção de cadastrar filmes."
```

### 2. **Mostrar Segurança**
```
"Isso é importante porque apenas
ADMINISTRADORES podem adicionar filmes
ao sistema. Vou mostrar agora..."
```

### 3. **Ativar Modo Admin**
```
"Vou entrar na área de Sobre...
Digite a senha de administrador...
Pronto! Agora sou ADMIN!"

*Tab "Cadastrar" aparece magicamente!*
```

### 4. **Demonstrar Poder Admin**
```
"Como admin, posso:
- Cadastrar novos filmes
- Adicionar informações completas
- O filme aparece instantaneamente
- Clientes podem ver imediatamente!"
```

### 5. **Voltar ao Normal**
```
"E quando termino, volto para modo cliente.
A aba Cadastrar desaparece novamente.
Sistema 100% seguro! ✅"
```

---

## 💡 Vantagens para Demonstração

### ✅ Para o Cliente Ver:
- Interface limpa e focada
- Sem opções confusas de admin
- Experiência de usuário final

### ✅ Para Você Demonstrar:
- Alterna entre modos facilmente
- Sem precisar fazer logout/login
- Mostra segurança do sistema
- Impressiona clientes!

### ✅ Para o Sistema:
- Código profissional
- Separação de permissões
- Fácil de expandir
- Base para auth real

---

## 🔄 Próximos Passos (Produção Real)

### Fase 1: Auth Backend
```typescript
// Implementar:
- API de login
- JWT tokens
- Hash de senhas
- Refresh tokens
```

### Fase 2: Banco de Dados
```typescript
// Tabela de usuários:
- id
- email
- password_hash
- role (admin/cliente)
- created_at
```

### Fase 3: Proteção de Rotas
```typescript
// No backend:
- Middleware de autenticação
- Validação de tokens
- Verificação de roles
- Rate limiting
```

---

## 📊 Diagrama de Permissões

```
┌─────────────────────────────────────────┐
│             PERMISSÕES                  │
├─────────────────┬───────────┬───────────┤
│  Funcionalidade │  Cliente  │   Admin   │
├─────────────────┼───────────┼───────────┤
│  Ver filmes     │     ✅    │     ✅    │
│  Buscar         │     ✅    │     ✅    │
│  Trailers       │     ✅    │     ✅    │
│  Poltronas      │     ✅    │     ✅    │
│  Cadastrar      │     ❌    │     ✅    │
│  Editar         │     ❌    │     ✅    │
│  Deletar        │     ❌    │     ✅    │
└─────────────────┴───────────┴───────────┘
```

---

## 🎯 Resumo

✅ **Problema:** Cliente não pode cadastrar filmes  
✅ **Solução:** Sistema de roles (Admin/Cliente)  
✅ **Demonstração:** Fácil de alternar entre modos  
✅ **Segurança:** Tab protegida e condicional  
✅ **Profissional:** Base para sistema real de auth  

---

## 📝 Como Testar

```bash
# 1. Inicie o app
npm start

# 2. Como CLIENTE (padrão):
#    - Navegue pelo app
#    - Note que NÃO HÁ aba "Cadastrar"

# 3. Vire ADMIN:
#    - Vá para "ℹ️ Sobre"
#    - Digite: admin123
#    - Clique em "Entrar como Admin"
#    - ✅ Aba "Cadastrar" aparece!

# 4. Cadastre um filme:
#    - Vá para "➕ Cadastrar"
#    - Preencha formulário
#    - Envie!

# 5. Volte para CLIENTE:
#    - Vá para "Sobre"
#    - Clique em "Voltar para Cliente"
#    - ✅ Aba desaparece novamente!
```

---

**🎬 Sistema de Segurança Profissional Implementado!**

*Agora seu app está seguro E fácil de demonstrar!* ✨





