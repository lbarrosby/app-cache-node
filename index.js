const express = require('express');
const Redis = require('ioredis');
const moment = require('moment');
const client = require('prom-client'); // Importa o prom-client
const http = require('http');

// Configura o cliente Redis
const redis = new Redis({
  host: 'redis',  // Redis rodando localmente
  port: 6379,         // Porta padrão do Redis
});

// Configura o servidor HTTP para expor métricas
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Coleta as métricas padrão como memória, CPU, etc.

// Registra uma métrica personalizada para as requisições HTTP
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route'],
});

// Cria o servidor Express
const app = express();
const port = 8081;

// Middleware para contar as requisições
app.use((req, res, next) => {
  const route = req.originalUrl;
  const method = req.method.toLowerCase();
  httpRequestsTotal.inc({ method, route }); // Incrementa a métrica
  next();
});

// Middleware de cache
const cacheMiddleware = (cacheKey, ttl) => async (req, res, next) => {
  try {
    const fullCacheKey = `application-nodejs-globo:${cacheKey}`;
    const cachedData = await redis.get(fullCacheKey);

    if (cachedData) {
      return res.send(cachedData);
    }

    res.cacheKey = fullCacheKey;
    res.ttl = ttl;
    next();
  } catch (err) {
    console.error('Erro ao acessar o Redis:', err);
    next();
  }
};

// Rota que retorna um texto fixo, cacheado por 10 segundos
app.get('/texto_fixo', cacheMiddleware('cache:texto_fixo', 10), (req, res) => {
  const responseData = "Texto fixo!";
  redis.setex(res.cacheKey, res.ttl, responseData);
  res.send(responseData);
});

// Rota que retorna o horário atual, cacheado por 10 segundos
app.get('/hora', cacheMiddleware('cache:hora', 10), (req, res) => {
  const currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  const responseData = `Horário atual: ${currentTime}`;
  redis.setex(res.cacheKey, res.ttl, responseData);
  res.send(responseData);
});

// Expor as métricas na rota /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics()); // Retorna as métricas registradas
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

