/**
 * Category Schema
 */

module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define(
		'category',
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			key: {
				type: DataTypes.STRING(50),
				allowNull: false,
				defaultValue: '',
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: '',
			},
			icon: {
				type: DataTypes.STRING(100),
				allowNull: false,
				defaultValue: '',
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: '',
			},
		},
		{
			freezeTableName: true,
			tableName: 'category',
			timestamps: true,
		}
	);
	category.changeSchema = (schema) => category;
	category.associate = (models) => {
		category.hasMany(models.reports, {
			foreignKey: 'categoryId',
		});
	};
	return category;
};
