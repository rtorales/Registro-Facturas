const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const compra = sequelize.define(
    'compra',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

numeroComprobante: {
        type: DataTypes.TEXT,

      },

fechaComprobante: {
        type: DataTypes.DATEONLY,

        get: function() {
          return this.getDataValue('fechaComprobante')
            ? moment
                .utc(this.getDataValue('fechaComprobante'))
                .format('YYYY-MM-DD')
            : null;
        },

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

  compra.associate = (db) => {

    db.compra.belongsTo(db.contribuyente, {
      as: 'contribuyente',
      foreignKey: {
        name: 'contribuyenteId',
      },
      constraints: false,
    });

    db.compra.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.compra.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return compra;
};

