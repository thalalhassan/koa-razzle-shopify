const {getDataAsJSON} = require('./_helper');

/**
 * TaxLines Schema
 */

module.exports = (sequelize, DataTypes) => {
	const taxLines = sequelize.define(
		'taxLines',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			taxTitle1: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			taxRate1: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxAmount1: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxTitle2: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			taxRate2: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxAmount2: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxTitle3: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			taxRate3: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxAmount3: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxTitle4: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			taxRate4: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxAmount4: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxTitle5: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			taxRate5: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxAmount5: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0,
			},
			taxLines: {
				type: DataTypes.JSON,
				allowNull: true,
				get() {
					return getDataAsJSON(this.getDataValue('headers'));
				},
			},
			city: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			province: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			provinceCode: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			country: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			orderShopifyId: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			freezeTableName: true,
			tableName: 'taxLines',
			timestamps: true,
		}
	);
	taxLines.changeSchema = (schema) =>
		taxLines.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return taxLines;
};
