# Sistema de Gestão de Inventário

Sistema fullstack para gerenciamento de produtos com operações de criar, listar, editar e excluir (CRUD).

## Tecnologias

**Backend**
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod 

**Frontend**
- React + TypeScript
- Vite
- TanStack Query
- Tailwind CSS

## Como rodar o projeto

### Com Docker 


```bash
docker-compose up
```

Acesse o frontend em: http://localhost:5173

### Sem Docker

**Backend**

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```


## Decisões Técnicas

- **Prisma** foi o ORM escolhido por ter uma sintaxe simples e próxima do TypeScript, o que facilitou bastante o aprendizado durante o desenvolvimento.
- **Express** foi escolhido para o backend por ser um framework consolidado no ecossistema Node.js, possuindo uma grande comunidade, ampla documentação e muitos conteúdos disponíveis na internet.
- **TanStack Query** foi adicionado para simplificar as chamadas à API no frontend.
- **Zod** foi escolhido para validação por ter uma API simples e intuitiva. Definir regras como "campo obrigatório" ou "número positivo" fica muito legível, o que ajuda na compreensão do código.
- **Tailwind CSS** foi escolhido para estilização por permitir criar interfaces diretamente no HTML sem precisar alternar entre arquivos CSS
- **Docker Compose** — facilita a execução do projeto em qualquer ambiente sem configuração manual.