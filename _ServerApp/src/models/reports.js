const {getDataAsJSON} = require('./_helper');
const config = require('config');
const dbConfig = config.get('db');
/**
 * Reports Schema
 */

module.exports = (sequelize, DataTypes) => {
	const reports = sequelize.define(
		'reports',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			baseTable: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: '',
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: '',
			},
			reportKey: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: '',
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: '',
			},
			categoryId: {
				type: DataTypes.BIGINT,
				allowNull: false,
				defaultValue: 1,
			},
			headers: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('headers'));
				},
			},
			filters: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('filters'));
				},
			},
			extraFilters: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('filters'));
				},
			},
			config: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('config'));
				},
			},
			createdBy: {
				type: DataTypes.BIGINT,
				defaultValue: 1,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM({
					values: ['builtin', 'custom'],
				}),
				allowNull: false,
				defaultValue: 'custom',
			},
			slug: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: {
					args: true,
					msg: 'URL already exist!',
				},
				defaultValue: '',
			},
		},
		{
			freezeTableName: true,
			tableName: 'reports',
			timestamps: true,
		}
	);
	reports.changeSchema = (schema) => {
		if (schema === dbConfig.DB) {
			return reports;
		} else {
			return reports.schema(schema, {
				schemaDelimiter: '`.`',
			});
		}
	};
	reports.associate = (models) => {
		reports.belongsTo(models.shops, {foreignKey: 'createdBy'});
		reports.belongsTo(models.category, {foreignKey: 'categoryId', as: 'reports'});
		reports.belongsTo(models.category, {foreignKey: 'categoryId', as: 'shopReports'});
	};
	return reports;
};
