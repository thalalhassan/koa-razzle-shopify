/**
 * Shops Schema
 */

module.exports = (sequelize, DataTypes) => {
	const shops = sequelize.define(
		'shops',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},

			name: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: '',
			},
			shopifyId: {
				type: DataTypes.STRING(200),
				allowNull: true,
				defaultValue: '',
			},
			shop: {
				type: DataTypes.STRING(255),
				allowNull: true,
				unique: {
					args: true,
					msg: 'Shop already exist!',
				},
			},
			domain: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: '',
			},
			accessToken: {
				type: DataTypes.STRING(40),
				allowNull: true,
				unique: {
					args: true,
					msg: 'Access Token already exist!',
				},
			},
			zip: {
				type: DataTypes.INTEGER(30),
				allowNull: true,
				defaultValue: '0',
			},
			latitude: {
				type: DataTypes.INTEGER(30),
				allowNull: true,
				defaultValue: '0',
			},
			longitude: {
				type: DataTypes.INTEGER(30),
				allowNull: true,
				defaultValue: '0',
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: '',
			},
			status: {
				type: DataTypes.STRING(100),
				allowNull: true,
				defaultValue: 'active',
			},
			phone: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			avatar: {
				type: DataTypes.STRING(250),
				allowNull: true,
			},
			address: {
				type: DataTypes.STRING(250),
				allowNull: true,
			},
			planName: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			accessKey: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			dedicatedSchema: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			isDeleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: false,
			},
			fcmToken: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			syncStatus: {
				type: DataTypes.ENUM({
					values: ['notBegun', 'begun', 'completed', 'failed'],
				}),
				allowNull: false,
				defaultValue: 'notBegun',
			},
			shopifyStoreCreatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			reactourStatus: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: '{"home":false,"createCustomReport":false}',
			},
		},
		{
			freezeTableName: true,
			tableName: 'shops',
			timestamps: true,
		}
	);
	shops.changeSchema = (schema) => shops;
	shops.associate = (models) => {
		shops.hasMany(models.reports, {foreignKey: 'createdBy'});
	};
	return shops;
};
