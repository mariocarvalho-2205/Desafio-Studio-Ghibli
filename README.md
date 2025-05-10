# Studio Ghibli Collection

Uma aplicação web moderna para explorar e gerenciar sua coleção de filmes do Studio Ghibli.

## 🚀 Tecnologias Utilizadas

- React
- Vite
- Tailwind CSS
- Axios
- Context API
- LocalStorage

## ✨ Funcionalidades

- Visualização de filmes do Studio Ghibli
- Sistema de busca com suporte a sinopse
- Filtros por:
  - Favoritos
  - Assistidos
  - Notas
  - Avaliações (1-5 estrelas)
- Sistema de avaliação com estrelas
- Notas personalizadas para cada filme
- Animações suaves e responsivas
- Notificações toast para feedback de ações
- Persistência de dados no localStorage
- Design responsivo e moderno

## 🛠️ Implementações Recentes

### Gerenciamento de Estado e API
- Implementação do Axios para requisições HTTP
- Melhor gerenciamento de estado assíncrono
- Tratamento de erros robusto
- Loading states e feedback visual
- Interceptors para tratamento global de erros

### Animações e UI
- Animações personalizadas via Tailwind CSS
- Transições suaves para todos os elementos
- Toast notifications com animações
- Loading spinner durante carregamentos
- Mensagens de erro amigáveis

### Arquitetura e Organização
- Separação em microserviços
- Serviços dedicados para:
  - API (Axios)
  - Filmes
  - Notificações
- Clean Code e boas práticas
- Melhor organização do projeto

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute o projeto:
```bash
npm run dev
```

## 📦 Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── contexts/       # Contextos (MovieContext)
├── services/       # Serviços (API, Filmes, Notificações)
├── pages/         # Páginas da aplicação
├── styles/        # Estilos globais
└── utils/         # Utilitários
```

## 🎨 Design e UX

- Interface moderna e intuitiva
- Animações suaves e responsivas
- Feedback visual para todas as ações
- Design responsivo para todos os dispositivos
- Cores e estilos consistentes

## 🔄 Fluxo de Dados

1. Carregamento inicial:
   - Verifica localStorage
   - Busca dados da API se necessário
   - Exibe loading state durante carregamento

2. Interações do usuário:
   - Feedback imediato via toast notifications
   - Persistência automática no localStorage
   - Tratamento de erros com mensagens amigáveis

## 🛠️ Melhorias Futuras

- [ ] Implementar testes unitários
- [ ] Adicionar mais filtros e ordenações
- [ ] Melhorar acessibilidade
- [ ] Implementar temas (claro/escuro)
- [ ] Adicionar mais animações e transições
