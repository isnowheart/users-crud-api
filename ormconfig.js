const envs = {
	development: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: false,
		logging: true,
		entities: ["src/entities/**/*.ts"],
		migrations: ["src/migration/*.ts"],
		cli: { entitiesDir: "src/entities", migrationsDir: "src/migration" },
	},
	production: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: false,
		logging: false,
		entities: ["build/entities/*/.js"],
		migrations: ["build/migration/*.js"],
		cli: { entitiesDir: "build/entities", migrationsDir: "build/migration" },
	},
	test: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: true,
		logging: false,
		dropSchema: true,
		entities: ["src/entities/**/*.ts"],
		cli: { entitiesDir: "src/entities" },
	},
};

module.exports = envs[process.env.NODE_ENV];