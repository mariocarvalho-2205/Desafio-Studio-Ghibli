# Studio Ghibli Collection

Uma aplicação web para explorar e gerenciar sua coleção de filmes do Studio Ghibli. Desenvolvida com React e Tailwind CSS, oferece uma experiência interativa para os fãs dos filmes do Studio Ghibli.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS para estilização
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados no navegador
- **GitHub Pages** - Hospedagem da aplicação

## 📋 Requisitos Implementados

### Funcionalidades Principais
- [x] Listagem de filmes do Studio Ghibli
- [x] Sistema de busca por título e sinopse
- [x] Filtros por:
  - [x] Favoritos
  - [x] Assistidos
  - [x] Notas
  - [x] Avaliações (estrelas)
- [x] Ordenação por:
  - [x] Título
  - [x] Data de lançamento
  - [x] Duração
  - [x] Pontuação RT
  - [x] Avaliação pessoal

### Recursos de Usuário
- [x] Marcar filmes como favoritos
- [x] Marcar filmes como assistidos
- [x] Adicionar notas pessoais
- [x] Sistema de avaliação com estrelas
- [x] Notificações toast para feedback de ações

### Interface
- [x] Design responsivo (4 breakpoints)
- [x] Animações suaves
- [x] Cards interativos
- [x] Modal para notas
- [x] Sistema de notificações toast
- [x] Destaque de termos na busca

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/studio-ghibli-collection.git
cd studio-ghibli-collection
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação:
```
http://localhost:5173
```

### Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
yarn build
```

## 📱 Responsividade

A aplicação é totalmente responsiva com 4 breakpoints:
- Mobile: 1 card por linha
- SM (640px+): 2 cards por linha
- LG (1024px+): 3 cards por linha
- XL (1280px+): 4 cards por linha

## 🎨 Recursos Visuais

- Cards com efeito hover
- Animações de entrada e saída
- Notificações toast coloridas por tipo de ação
- Gradiente de fundo suave
- Ícones intuitivos para ações

## 💾 Persistência de Dados

Os dados do usuário são salvos localmente:
- Favoritos
- Status de assistidos
- Notas pessoais
- Avaliações com estrelas

## 🔍 Busca e Filtros

- Busca em tempo real
- Filtros combinados
- Destaque visual dos termos buscados
- Opção de incluir/excluir sinopse na busca

## ⭐ Avaliação

- Sistema de 5 estrelas
- Visualização clara da avaliação atual
- Possibilidade de remover avaliação
- Integração com sistema de filtros
