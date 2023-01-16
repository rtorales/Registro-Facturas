const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const contribuyente = sequelize.define(
    'contribuyente',
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

  contribuyente.associate = (db) => {

    db.contribuyente.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contribuyente.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contribuyente;
};

