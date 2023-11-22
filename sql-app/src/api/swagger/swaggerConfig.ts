import swaggerJsdoc from 'swagger-jsdoc';
import { sw } from '../../infrastructure/config/config';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: sw.title,
        version: sw.version,
        description: 'Esta es la documentación de mi API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de Desarrollo',
        },
        {
            url: 'http//123.123.123:3000',
            description: 'Servidor de QA',
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/api/controllers/*.ts', './src/api/swagger/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;