/**
 * InventoryLevels Schema
 */

module.exports = (sequelize, DataTypes) => {
	const inventoryLevels = sequelize.define(
		'inventoryLevels',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			shopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			inventoryItemShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			available: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			canDeactivate: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			location: {
				type: DataTypes.JSON,
				allowNull: true,
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
		},
		{
			timestamps: true,
			freezeTableName: true,
			tableName: 'inventoryLevels',
		}
	);
	inventoryLevels.changeSchema = (schema) =>
		inventoryLevels.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return inventoryLevels;
};
