/**
 * customers Schema
 */

module.exports = (sequelize, DataTypes) => {
	const customers = sequelize.define(
		'customers',
		{
			addresses: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			averageOrderAmountV2: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			canDelete: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			defaultAddress: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			address1: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			address2: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			city: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			province: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			zip: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			country: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			displayName: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			firstName: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: null,
			},
			hasNote: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			hasTimelineComment: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			lastName: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			lastOrder: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: null,
			},
			legacyResourceId: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			lifetimeDuration: {
				type: DataTypes.STRING(50),
				allowNull: true,
				defaultValue: null,
			},
			locale: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			image: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null,
			},
			note: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			ordersCount: {
				type: DataTypes.BIGINT,
				allowNull: true,
				defaultValue: null,
			},
			phone: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			state: {
				type: DataTypes.STRING(30),
				allowNull: true,
				defaultValue: null,
			},
			tags: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
				get() {
					const value = this.getDataValue('tags');
					return (value && value.split(';')) || [];
				},
				set(val) {
					this.setDataValue('tags', val.join(';'));
				},
			},
			taxExempt: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			taxExemptions: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
				get() {
					const value = this.getDataValue('taxExemptions');
					return (value && value.split(';')) || [];
				},
				set(val) {
					this.setDataValue('taxExemptions', val.join(';'));
				},
			},
			totalSpent: {
				type: DataTypes.FLOAT,
				allowNull: true,
				defaultValue: null,
			},
			totalSpentV2: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			validEmailAddress: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: null,
			},
			verifiedEmail: {
				type: DataTypes.BOOLEAN,
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
		},
		{
			freezeTableName: true,
			tableName: 'customers',
			timestamps: true,
		}
	);
	customers.changeSchema = (schema) =>
		customers.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return customers;
};
