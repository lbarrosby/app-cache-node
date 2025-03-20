# Changelog

Todas as mudanças importantes para este projeto serão documentadas neste arquivo.

## [v1.0.0] - 2025-03-20

### Adicionado
- **Servidor Express**: Criação de um servidor Express para manipulação de rotas e métricas.
- **Integração com Redis**: Implementação do cache utilizando Redis. O cache é aplicado nas rotas `/texto_fixo` e `/hora`.
- **Métricas com Prometheus**: Integração com a biblioteca `prom-client` para expor métricas de desempenho da aplicação, como o número total de requisições HTTP.
- **Middleware de cache**: Implementação de middleware para lidar com cache Redis nas rotas da aplicação.
  - **Rota `/texto_fixo`**: Retorna um texto fixo com cache configurado para 10 segundos.
  - **Rota `/hora`**: Retorna o horário atual formatado com cache configurado para 10 segundos.
- **Exposição de métricas**: Criação do endpoint `/metrics` para expor métricas de desempenho no formato Prometheus.
  
### Melhorias
- **Cache eficiente**: Uso de Redis para garantir que as respostas de rotas sejam rápidas e reduzam a carga no servidor.
- **Prometheus**: Implementação de métricas de requisições HTTP (contagem por método e rota), além de métricas de uso de CPU e memória.
  
### Correções
- Nenhuma correção de bugs nesta versão, pois é a versão inicial do projeto.

## [v0.1.0] - 2025-03-10

### Inicial
- Criação do repositório e configuração inicial.
- Preparação do ambiente de desenvolvimento.
