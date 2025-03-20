# Application Node.js com Redis e Prometheus

Este projeto é uma aplicação Node.js que utiliza o Redis para caching e Prometheus para monitoramento de métricas.

## Tecnologias

- **Node.js**: Plataforma para desenvolvimento da aplicação.
- **Express**: Framework para criar o servidor HTTP e definir rotas.
- **ioredis**: Cliente Redis para comunicação com o servidor Redis.
- **Prom-client**: Biblioteca para expor métricas de performance para o Prometheus.
- **Moment.js**: Manipulação e formatação de data e hora.
- **Redis**: Banco de dados em memória para caching.
- **Docker**: Containerização da aplicação e do Redis.
- **Docker Compose**: Orquestração para rodar os containers de forma fácil.

## Funcionalidades

1. **Cache com Redis**:
   - A aplicação utiliza o Redis para cache de respostas, minimizando o tempo de resposta e sobrecarga no servidor.
   - As rotas `/texto_fixo` e `/hora` possuem cache de 10 segundos.

2. **Métricas para Prometheus**:
   - O servidor expõe métricas sobre o número total de requisições HTTP recebidas e outras métricas padrão do sistema (memória, CPU, etc.) através da rota `/metrics`.

3. **Docker Compose**:
   - O projeto utiliza **Docker Compose** para orquestrar a aplicação Node.js e o Redis, facilitando a configuração e o gerenciamento dos containers.

## Instalação

### Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado na sua máquina. Caso não tenha, instale-o a partir de [nodejs.org](https://nodejs.org/).
2. **Docker**: A aplicação utiliza o Docker para rodar o Redis e a aplicação em containers. Caso não tenha o Docker, instale-o a partir de [docker.com](https://www.docker.com/get-started).
3. **Docker Compose**: A aplicação utiliza o Docker Compose para orquestrar os containers. Se ainda não tem, siga a documentação em [docker.com](https://docs.docker.com/compose/install/) para instalar.





## Endpoints

### `/texto_fixo`
- **Método**: `GET`
- **Descrição**: Retorna um texto fixo ("Texto fixo! Node JS") com cache de 10 segundos.
- **Cache**: Redis (TTL: 10 segundos)

### `/hora`
- **Método**: `GET`
- **Descrição**: Retorna o horário atual formatado com o Moment.js ("Horário atual: ...") com cache de 10 segundos.
- **Cache**: Redis (TTL: 10 segundos)

### `/metrics`
- **Método**: `GET`
- **Descrição**: Exibe as métricas de performance do servidor, como número de requisições HTTP, uso de memória e CPU.
- **Formato**: Prometheus

## Docker Compose

Este projeto utiliza **Docker Compose** para orquestrar os containers do Redis e da aplicação Node.js. O arquivo `docker-compose.yml` cria dois serviços:

1. **redis**: O serviço do Redis, que é baseado na imagem oficial do Redis (Alpine), e está configurado para rodar na porta `6379`.
2. **node-app-cache**: O serviço da aplicação Node.js que depende do Redis e roda na porta `8081`.
