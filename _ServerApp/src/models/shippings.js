/**
 * shippings Schema
 */

module.exports = (sequelize, DataTypes) => {
	const shippings = sequelize.define(
		'shippings',
		{
			carrierIdentifier: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			code: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			custom: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			deliveryCategory: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			// discountAllocations: {},
			discountedPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			originalPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			phone: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			// requestedFulfillmentService: {},
			shippingRateHandle: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			source: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			// taxLines: {},
			title: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			id: {
				type: DataTypes.BIGINT,
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
				allowNull: false,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			freezeTableName: true,
			tableName: 'shippings',
			timestamps: true,
		}
	);
	shippings.changeSchema = (schema) =>
		shippings.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return shippings;
};
