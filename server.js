// SEM FASTIFY
// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Oi Server aqui!!');

//     return response.end();
// });

// server.listen(3333);


// COM FASTIFY
import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
//const database = new DatabaseMemory();
const database = new DatabasePostgres();

//ROTAS
server.post('/videos', async (request, response) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    return response.status(201).send();
})

server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);

    return videos;

})

server.put('/videos/:id', async (request, response) => {
    const id = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(id, {
        title,
        description,
        duration,
    });

    return response.status(204).send();

})

server.delete('/videos/:id', async (request, response) => {
    const id = request.params.id;

    await database.delete(id);

    return response.status(204).send();
})

server.listen({ port: process.env.PORT ?? 3333 });