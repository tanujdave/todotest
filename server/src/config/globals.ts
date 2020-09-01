// Environment variables imported from .env file
export const env = {
	CACHE_TTL: 3600,

	NODE_ENV: process.env.NODE_ENV || 'development',
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,

	MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
	MYSQL_PORT: process.env.MYSQL_PORT || 3306,
	MYSQL_USER: process.env.MYSQL_USER || 'root',
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
	MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'tododb'
};
