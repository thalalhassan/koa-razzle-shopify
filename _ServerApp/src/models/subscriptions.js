const config = require('config');
/**
 * subscriptions Schema
 */

module.exports = (sequelize, DataTypes) => {
	const subscriptions = sequelize.define(
		'subscriptions',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			chargeId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			planId: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			currentPeriodEnd: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			shopifyId: {
				type: DataTypes.STRING(100),
				allowNull: true,
				unique: true,
			},
			test: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			trialDays: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			freezeTableName: true,
			tableName: 'subscriptions',
			timestamps: true,
		}
	);
	subscriptions.changeSchema = (schema) => subscriptions;
	subscriptions.associate = (models) => {
		subscriptions.belongsTo(models.shops, {foreignKey: 'shopId'});
		subscriptions.belongsTo(models.plans, {
			foreignKey: 'planId',
			targetKey: 'id',
			as: 'plans',
		});
	};
	return subscriptions;
};

// SUBSCRIPTION SHOPIFY STATUS

// ACCEPTED
// The app subscription has been approved by the merchant and is ready to be activated by the app. App subscriptions created through the GraphQL Admin API are activated upon approval.

// ACTIVE
// The app subscription has been activated by the app. Active app subscriptions are charged to the store and partners recieve payouts for active app subscriptions.

// CANCELLED
// The app subscription was cancelled by the app.

// DECLINED
// The app subscription was declined by the merchant.

// EXPIRED
// The app subscription was not accepted within 2 days of being created.

// FROZEN
// The app subscription is on hold due to a store subscription non-payment. The charge will re-activate once subscription payments resume.

// PENDING
// The app subscription is pending approval by the merchant.
