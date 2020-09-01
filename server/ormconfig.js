module.exports = {
	type: 'mysql',
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	migrations: ['src/migrations/*.ts'],
	entities: ['src/api/components/**/model.ts'],
	cli: {
		migrationsDir: 'src/migrations'
	},
	migrationsRun: true,
	logging: false,
	synchronize: true
};
