/**
 * orderTransactions Schema
 */

module.exports = (sequelize, DataTypes) => {
	const orderTransactions = sequelize.define(
		'orderTransactions',
		{
			accountNumber: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			amountSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			authorizationCode: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			errorCode: {
				type: DataTypes.STRING(20),
				allowNull: true,
				defaultValue: null,
			},
			formattedGateway: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			gateway: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			kind: {
				type: DataTypes.STRING(20),
				allowNull: true,
				defaultValue: null,
			},
			manuallyCapturable: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			maximumRefundableV2: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			processedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			status: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			totalUnsettledSet: {
				type: DataTypes.DECIMAL(10, 2),
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
			tableName: 'orderTransactions',
			timestamps: true,
		}
	);
	orderTransactions.changeSchema = (schema) =>
		orderTransactions.schema(schema, {
			schemaDelimiter: '`.`',
		});
	// orderTransactions.associate = (models) => {
	// 	orderTransactions.belongsTo(models.shops, {foreignKey: 'shop_id'});
	// };
	return orderTransactions;
};
