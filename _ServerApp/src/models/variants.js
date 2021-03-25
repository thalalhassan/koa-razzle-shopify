/**
 * Shop Schema
 */

module.exports = (sequelize, DataTypes) => {
	const variants = sequelize.define(
		'variants',
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
			productShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: 0,
			},
			compareAtPrice: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: 0,
			},
			inventoryQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			position: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			availableForSale: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			cost: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			barcode: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			freezeTableName: true,
			tableName: 'variants',
		}
	);
	variants.changeSchema = (schema) =>
		variants.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return variants;
};
