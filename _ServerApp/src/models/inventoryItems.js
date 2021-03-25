/**
 * InventoryItems Schema
 */

module.exports = (sequelize, DataTypes) => {
	const inventoryItems = sequelize.define(
		'inventoryItems',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			shopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
				unique: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			variantShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			countryCodeOfOrigin: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			duplicateSkuCount: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			harmonizedSystemCode: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: 0,
			},
			inventoryHistoryUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			legacyResourceId: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			locationsCount: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			tracked: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			unitCost: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			inventoryCost: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			inventoryValue: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			inventoryQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			provinceCodeOfOrigin: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
			tableName: 'inventoryItems',
		}
	);
	inventoryItems.changeSchema = (schema) =>
		inventoryItems.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return inventoryItems;
};
