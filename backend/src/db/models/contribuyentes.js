const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contribuyentes = sequelize.define(
    'contribuyentes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      razonSocial: {
        type: DataTypes.TEXT,
      },

      ruc: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  contribuyentes.associate = (db) => {
    db.contribuyentes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contribuyentes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contribuyentes;
};
