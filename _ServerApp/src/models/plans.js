const {getDataAsJSON} = require('./_helper');
const config = require('config');
const dbConfig = config.get('db');
/**
 * plans Schema
 */

module.exports = (sequelize, DataTypes) => {
	const plans = sequelize.define(
		'plans',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			createdBy: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			updatedBy: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			tagData: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('tagData'));
				},
			},
			listData: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: '',
				get() {
					return getDataAsJSON(this.getDataValue('listData'));
				},
			},
			shopifyCreateData: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: '',
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			subTitle: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			trialDays: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			currencyCode: {
				type: DataTypes.STRING(10),
				allowNull: true,
				defaultValue: '',
			},
			type: {
				type: DataTypes.ENUM({
					values: ['trial', 'affiliate', 'basic', 'professional', 'unlimited', 'enterprise', 'custom', 'singtel_basic', 'singtel_unlimited', 'dormant'],
				}),
				allowNull: false,
				defaultValue: 'basic',
			},
			expiryDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			isPublished: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			freezeTableName: true,
			tableName: 'plans',
			timestamps: true,
		}
	);
	plans.changeSchema = (schema) => {
		if (schema === dbConfig.DB) {
			return plans;
		} else {
			return plans.schema(schema, {
				schemaDelimiter: '`.`',
			});
		}
	};
	plans.associate = (models) => {};
	return plans;
};
