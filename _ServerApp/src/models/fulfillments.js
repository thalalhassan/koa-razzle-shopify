/**
 * fulfillments Schema
 */

module.exports = (sequelize, DataTypes) => {
	const fulfillments = sequelize.define(
		'fulfillments',
		{
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			deliveredAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			displayStatus: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			estimatedDeliveryAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			inTransitAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			legacyResourceId: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			service: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			totalQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
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
				unique: true,
			},
			orderShopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
		},
		{
			freezeTableName: true,
			tableName: 'fulfillments',
			timestamps: true,
		}
	);
	fulfillments.changeSchema = (schema) =>
		fulfillments.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return fulfillments;
};
