/**
 * refunds Schema
 */

module.exports = (sequelize, DataTypes) => {
	const refunds = sequelize.define(
		'refunds',
		{
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			duties: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			legacyResourceId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			note: {
				type: DataTypes.STRING(500),
				allowNull: true,
				defaultValue: null,
			},
			totalRefundedSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			updatedAt: {
				type: DataTypes.DATE,
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
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
				unique: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			orderShopifyId: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			freezeTableName: true,
			tableName: 'refunds',
			timestamps: true,
		}
	);
	refunds.changeSchema = (schema) =>
		refunds.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return refunds;
};
