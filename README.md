# 📈 home-broker

## 📌 Descrição

Este projeto foi desenvolvido durante a Imersão Full Cycle da empresa Full Cycle. O objetivo foi criar um HomeBroker para negociação de ações, permitindo a compra e venda de ativos em tempo real.

A aplicação conta com:

- Frontend desenvolvido com Next.js
- API desenvolvida com NestJS
- Matching Engine (mecanismo de casamentos de ordens) desenvolvido em Go
- Comunicação em tempo real via WebSocket entre o frontend e o backend
- Integração entre a API e o código em Go através do Apache Kafka

## 🛠️ Tecnologias Utilizadas

📡 Backend:
  - NestJS
  - KafkaJS
  - Docker
  - MongoDB (via extensão do VSCode)

🎨 Frontend:
  - Next.js
  - React
  - WebSockets
    
⚡ Matching Engine:
  - Go
  - Kafka
  - Docker Compose

## ⚙️ Arquitetura

 projeto utiliza Apache Kafka para processar as ordens de compra e venda. Existem dois canais principais:

 - `orders`: recebe novas ordens
 - `processed_orders`: retorna as ordens processadas

O frontend consome os dados em tempo real via WebSockets.

🔽 Diagrama Entidade-Relacionamento (DER):

![der](https://github.com/user-attachments/assets/3fe11793-a464-4397-b700-3de0896b7514)

## 🚀 Como Rodar o Projeto

Antes de começar, certifique-se de ter instalado:

- Node.js
- Go
- Docker e Docker Compose

### 1️⃣ Iniciar o Matching Engine (Go)

```bash
  cd go
  docker compose up -d
  go run cmd/trade/main.go
```
### 2️⃣ Iniciar a API (NestJS)

```bash
  cd nestjs-api
  npm install
  docker compose up -d
  npm run start:dev
```
### 3️⃣ Iniciar o Frontend (Next.js)

```bash
 cd next-frontend
 npm install
 PORT=3001 npm run dev
```

## 🏆 Créditos

Este projeto foi desenvolvido durante a Imersão Full Cycle, uma iniciativa da empresa Full Cycle para capacitação em tecnologias modernas.
mais detalhes em: https://github.com/devfullcycle/imersao21
