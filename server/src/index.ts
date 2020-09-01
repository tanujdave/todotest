// import "reflect-metadata";

// import "source-map-support/register";

// import "module-alias/register";

// Set env variables from .env file
import { config } from 'dotenv';
config();

import express from 'express';

import { createServer, Server as HttpServer } from 'http';
import { createConnection, Connection } from 'typeorm';

import { env } from '@config/globals';

import { Server } from './api/server';

// Startup
(async function main() {
	try {
		const connection: Connection = await createConnection();

		// Init express server
		const app: express.Application = new Server().app;
		const server: HttpServer = createServer(app);

		// Start express server
		server.listen(env.NODE_PORT);

		server.on('listening', () => {
			console.log(`server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
		});

		server.on('close', () => {
			connection.close();
			console.log('Server closed');
		});
	} catch (err) {
		console.error(err.stack);
	}
})();
