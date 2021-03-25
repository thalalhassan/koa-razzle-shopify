/**
 * lineItems Schema
 */

module.exports = (sequelize, DataTypes) => {
	const lineItems = sequelize.define(
		'lineItems',
		{
			customAttributes: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			discountedTotalSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			discountedUnitPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			duties: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			fulfillableQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			// fulfillmentService: {},
			fulfillmentStatus: {
				type: DataTypes.STRING(20),
				allowNull: true,
				defaultValue: null,
			},
			name: {
				type: DataTypes.STRING(500),
				allowNull: true,
				defaultValue: null,
			},
			nonFulfillableQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			originalTotalSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			originalUnitPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			refundableQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			restockable: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			sku: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			taxable: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			totalDiscountSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			unfulfilledDiscountedTotalSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			unfulfilledOriginalTotalSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			unfulfilledQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			productShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			variantShopifyId: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			variantTitle: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			vendor: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
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
			orderShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: null,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			freezeTableName: true,
			tableName: 'lineItems',
			timeStamp: true,
		}
	);
	lineItems.changeSchema = (schema) =>
		lineItems.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return lineItems;
};
