const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const venta = sequelize.define(
    'venta',
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

  venta.associate = (db) => {

    db.venta.belongsTo(db.contribuyente, {
      as: 'contribuyente',
      foreignKey: {
        name: 'contribuyenteId',
      },
      constraints: false,
    });

    db.venta.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.venta.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return venta;
};

