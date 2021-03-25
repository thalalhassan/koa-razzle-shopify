const {getDataAsJSON, getDataAsArray} = require('./_helper');
/**
 * orders Schema
 */

module.exports = (sequelize, DataTypes) => {
	const orders = sequelize.define(
		'orders',
		{
			canMarkAsPaid: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			canNotifyCustomer: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			cancelReason: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			cancelledAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			capturable: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			clientIp: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			closed: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			closedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			confirmed: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			currencyCode: {
				type: DataTypes.STRING(10),
				allowNull: true,
				defaultValue: null,
			},
			customAttributes: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			customer: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			discountCode: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			displayFinancialStatus: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			displayFulfillmentStatus: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			edited: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			fulfillable: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			fullyPaid: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			hasTimelineComment: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			netPaymentSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			note: {
				type: DataTypes.STRING(500),
				allowNull: true,
				defaultValue: null,
			},
			originalTotalDutiesSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			originalTotalPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			paymentCollectionDetails: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			paymentGatewayNames: {
				type: DataTypes.STRING(50),
				allowNull: true,
				set(val) {
					this.setDataValue('paymentGatewayNames', val.join(';'));
				},
				defaultValue: null,
			},
			phone: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			processedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			refundDiscrepancySet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			refundable: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			risks: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			subtotalLineItemsQuantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: null,
			},
			subtotalPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: true,
				set(val) {
					this.setDataValue('tags', val.join(';'));
				},
			},
			taxesIncluded: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			totalCapturableSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalDiscountsSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalOutstandingSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalReceivedSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalRefundedSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalRefundedShippingSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalShippingPriceSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalTaxSet: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				defaultValue: null,
			},
			totalTipReceived: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			transactions: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			unpaid: {
				type: DataTypes.BOOLEAN,
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
				primaryKey: true,
				allowNull: true,
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
			customerShopifyId: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			source: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: 'unknown',
			},
			customerJourneySummary: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			physicalLocation: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
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
			freezeTableName: true,
			tableName: 'orders',
			timestamps: true,
		}
	);
	orders.changeSchema = (schema) =>
		orders.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return orders;
};
