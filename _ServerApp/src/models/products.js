/**
 * Shop Schema
 */

module.exports = (sequelize, DataTypes) => {
	const products = sequelize.define(
		'products',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			shopifyId: {
				type: DataTypes.STRING(200),
				allowNull: false,
				unique: true,
			},
			shopId: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			sku: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			totalInventory: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			totalVariants: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			vendor: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			productType: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
			},
			handle: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: '',
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
			publishedAt: {
				type: DataTypes.DATE,
				allowNull: true,
				defaultValue: null,
			},
			images: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: null,
				get() {
					const value = this.getDataValue('images');
					return (value && value.split(';')) || [];
				},
				set(val) {
					this.setDataValue('images', val.join(';'));
				},
			},
			image: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			freezeTableName: true,
			tableName: 'products',
			timestamps: true,
		}
	);
	products.changeSchema = (schema) =>
		products.schema(schema, {
			schemaDelimiter: '`.`',
		});
	return products;
};
