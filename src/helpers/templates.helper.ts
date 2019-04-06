export const serverTSFile = `
import express from 'express';
import http from 'http';
import { App } from './app';

const PORT = process.env.PORT || 3000;

const appInstance: App = new App();

const app: express.Application = appInstance.app;

http.createServer(app).listen(PORT, () => {
	console.log('Server is listening at localhost:' + PORT);
});`;

export const appTSFile = `
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { MainRoute } from './routes/main.route';

dotenv.config({ path: '.env' });

export class App {
	public app: express.Application;
	public route: MainRoute;

	constructor() {
		this.app = express();
		this.config();
		this.routeSetup();
	}

	// Initialize the express application
	private config() {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	// Set up and register API routes
	private routeSetup() {
		this.route = new MainRoute();
		MainRoute.register(this.app);
	}
}

`;

export const packageFile = `
	{
		"name": "swagger-to-node",
		"version": "0.0.0",
		"description": "<description>",
		"main": "./dist/server.js",
		"scripts": {
			"build": "tsc",
			"build:watch": "tsc -w",
			"serve": "node ./dist/src/server.js",
			"serve:watch": "nodemon ./dist/src/server.js",
			"start": "npm run serve",
			"prod": "npm run build && npm run start"
		},
		"dependencies": {
			"body-parser": "^1.18.3",
			"concurrently": "^4.1.0",
			"cors": "^2.8.5",
			"dotenv": "^6.2.0",
			"express": "^4.16.4",
			"winston": "^3.2.1"
		},
		"devDependencies": {
			"@types/chai": "^4.1.7",
			"@types/cors": "^2.8.4",
			"@types/dotenv": "^6.1.0",
			"@types/expect": "^1.20.4",
			"@types/express": "^4.16.1",
			"@types/jest": "^24.0.9",
			"@types/lodash": "^4.14.121",
			"@types/supertest": "^2.0.7",
			"chai": "^4.2.0",
			"jest": "^24.1.0",
			"supertest": "^3.4.2",
			"ts-jest": "^24.0.0",
			"tslint": "^5.13.1",
			"tslint-no-unused-expression-chai": "^0.1.4",
			"typescript": "^3.3.3333",
			"yargs": "^13.2.1"
		}
	}`;
