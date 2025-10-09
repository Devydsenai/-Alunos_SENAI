# API de Filmes - Cinema Lançamento

API REST para gerenciamento de filmes em cartaz e lançamentos, construída com Node.js, Express, Sequelize e SQLite.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

## 🚀 Instalação

1. Navegue até a pasta da API:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

3. (Opcional) Popule o banco de dados com filmes iniciais:
```bash
npm run seed
```

## ▶️ Executando a API

```bash
npm start
```

A API estará rodando em `http://localhost:3000`

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## 📡 Endpoints da API

### Health Check
- **GET** `/` - Verifica se a API está rodando
  ```json
  {
    "status": "ok",
    "message": "API de Filmes rodando!"
  }
  ```

### Listar Filmes
- **GET** `/filmes` - Lista todos os filmes
  - Query params opcionais:
    - `limit` - Limite de resultados (padrão: 100, máx: 1000)
    - `offset` - Offset para paginação (padrão: 0)
    - `title` - Filtrar por título (busca parcial)
    - `genre` - Filtrar por gênero (busca parcial)
    - `type` - Filtrar por tipo (`movie` ou `series`)
    - `year` - Filtrar por ano
    - `comingSoon` - Filtrar por lançamento (`true` ou `false`)

  Exemplos:
  ```
  GET /filmes?limit=10&offset=0
  GET /filmes?title=Avatar
  GET /filmes?genre=Action
  GET /filmes?type=movie
  GET /filmes?comingSoon=true
  ```

### Filmes em Cartaz
- **GET** `/filmes/em-cartaz` - Lista filmes em cartaz (não são lançamentos)
  - Query params: `limit`, `offset`

### Filmes em Lançamento
- **GET** `/filmes/lancamentos` - Lista filmes em lançamento (ComingSoon = true)
  - Query params: `limit`, `offset`

### Buscar Filme Específico
- **GET** `/filmes/:codigo` - Busca um filme pelo código
  - Exemplo: `GET /filmes/1`

### Criar Filme
- **POST** `/filmes` - Cria um novo filme
  - Body (JSON):
    ```json
    {
      "Title": "Novo Filme",
      "Year": "2024",
      "Rated": "PG-13",
      "Released": "01 Jan 2024",
      "Runtime": "120 min",
      "Genre": "Action, Adventure",
      "Director": "Nome do Diretor",
      "Writer": "Nome do Roteirista",
      "Actors": "Ator 1, Ator 2",
      "Plot": "Descrição do filme",
      "Language": "Portuguese, English",
      "Country": "Brazil",
      "Awards": "N/A",
      "Poster": "https://exemplo.com/poster.jpg",
      "Metascore": "N/A",
      "imdbRating": "N/A",
      "imdbVotes": "N/A",
      "imdbID": "tt1234567",
      "Type": "movie",
      "Response": "True",
      "Images": ["https://exemplo.com/img1.jpg"],
      "ComingSoon": true
    }
    ```

### Atualizar Filme
- **PUT** `/filmes/:codigo` - Atualiza um filme (substituição parcial)
  - Body (JSON): Campos que deseja atualizar
  
- **PATCH** `/filmes/:codigo` - Atualiza campos específicos
  - Body (JSON): Campos que deseja atualizar

### Deletar Filme
- **DELETE** `/filmes/:codigo` - Remove um filme

## 📊 Estrutura do Banco de Dados

### Tabela: filmes

| Campo | Tipo | Descrição |
|-------|------|-----------|
| codigo | INTEGER | Chave primária, autoincrement |
| Title | STRING | Título do filme (obrigatório) |
| Year | STRING | Ano de lançamento |
| Rated | STRING | Classificação etária |
| Released | STRING | Data de lançamento |
| Runtime | STRING | Duração |
| Genre | STRING | Gêneros |
| Director | STRING | Diretor |
| Writer | STRING | Roteirista |
| Actors | STRING | Atores principais |
| Plot | TEXT | Sinopse |
| Language | STRING | Idiomas |
| Country | STRING | Países |
| Awards | STRING | Prêmios |
| Poster | STRING | URL do poster |
| Metascore | STRING | Nota Metascore |
| imdbRating | STRING | Nota IMDB |
| imdbVotes | STRING | Votos IMDB |
| imdbID | STRING | ID IMDB (único) |
| Type | STRING | Tipo (movie/series) |
| Response | STRING | Response |
| Images | TEXT | Array de URLs (JSON) |
| ComingSoon | BOOLEAN | É lançamento? |
| totalSeasons | STRING | Total de temporadas (séries) |
| createdAt | DATETIME | Data de criação |
| updatedAt | DATETIME | Data de atualização |

## 🔧 Tecnologias Utilizadas

- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **SQLite3** - Banco de dados
- **CORS** - Middleware para CORS
- **Nodemon** - Auto-reload em desenvolvimento (dev dependency)

## 📝 Exemplos de Uso

### Usando cURL

```bash
# Listar todos os filmes
curl http://localhost:3000/filmes

# Buscar filmes em cartaz
curl http://localhost:3000/filmes/em-cartaz

# Buscar lançamentos
curl http://localhost:3000/filmes/lancamentos

# Buscar filme específico
curl http://localhost:3000/filmes/1

# Criar novo filme
curl -X POST http://localhost:3000/filmes \
  -H "Content-Type: application/json" \
  -d '{"Title":"Teste","Year":"2024","Type":"movie","ComingSoon":false}'

# Atualizar filme
curl -X PUT http://localhost:3000/filmes/1 \
  -H "Content-Type: application/json" \
  -d '{"Title":"Título Atualizado"}'

# Deletar filme
curl -X DELETE http://localhost:3000/filmes/1
```

### Usando JavaScript (fetch)

```javascript
// Listar filmes
fetch('http://localhost:3000/filmes')
  .then(res => res.json())
  .then(data => console.log(data));

// Criar filme
fetch('http://localhost:3000/filmes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    Title: 'Novo Filme',
    Year: '2024',
    Type: 'movie',
    ComingSoon: true
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente no arquivo `database.sqlite` na pasta da API.

Para resetar o banco:
1. Pare a API
2. Delete o arquivo `database.sqlite`
3. Reinicie a API
4. Execute `npm run seed` para repopular

## 📄 Licença

ISC

## 👨‍💻 Autor

Desenvolvido para o projeto Cinema Lançamento - SENAI

