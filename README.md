# Upload Widget

Um widget completo para upload de arquivos, com foco em performance, usabilidade e extensibilidade.

## Estrutura do Projeto

- **server/** – Backend com Fastify, integração com banco de dados e lógica de uploads  
- **web/** – Frontend (React + Zustand + Tailwind)  
- **web-vuejs/** – Frontend com Vue.js (versão alternativa ou SPA)

## Funcionalidades

- Upload de arquivos com streams para performance (backend)
- Documentação automática com Fastify + Swagger
- Integração direta com S3 / Cloudflare
- Uso de Cursor em PostgreSQL para leitura eficiente de dados grandes
- Testes automatizados com Vitest
- Pipeline de CI que roda testes em pull requests
- UI moderna com:
  - Upload via interface rica
  - Barra de progresso
  - Cancelamento e retomada de uploads
  - Compressão de imagens antes do envio
- Alternativa em Vue.js com Vuetify + Pinia para estado

## Tecnologias Usadas

| Área        | Tecnologias                                                                 |
|-------------|-----------------------------------------------------------------------------|
| Backend     | Fastify, TypeScript, Drizzle ORM, PostgreSQL, Swagger, Vitest, CI/CD       |
| Frontend    | React (+ Zustand) e/ou Vue.js (+ Pinia, Vuetify)                           |
| Deploy      | Docker (para desenvolvimento local), AWS S3 / Cloudflare                    |

## ​ Pré-requisitos

- Node.js 22+  
- Docker Compose (para rodar banco de dados localmente, se aplicável)

## ​ Como Rodar Localmente

### Backend

```bash
cd server
docker compose up -d          # Sobe PostgreSQL via Docker
pnpm install                   # Instala dependências
pnpm run db:generate           # Gera artefatos do Drizzle ORM
pnpm run db:migrate            # Executa migrations
pnpm run dev                   # Inicia servidor de desenvolvimento
