const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const ventas = sequelize.define(
    'ventas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      tipoIdentificacionComprador: {
        type: DataTypes.ENUM,

        values: [
          'RUC',

          'CÉDULA DE IDENTIDAD',

          'PASAPORTE',

          'CÉDULA EXTRANJERO',

          'SIN NOMBRE',

          'DIPLOMÁTICO',

          'IDENTIFICACIÓN TRIBUTARIA',
        ],
      },

      numeroIdentificacion: {
        type: DataTypes.TEXT,
      },

      razonSocial: {
        type: DataTypes.TEXT,
      },

      fechaEmision: {
        type: DataTypes.DATEONLY,

        get: function () {
          return this.getDataValue('fechaEmision')
            ? moment.utc(this.getDataValue('fechaEmision')).format('YYYY-MM-DD')
            : null;
        },
      },

      timbrado: {
        type: DataTypes.TEXT,
      },

      numeroComprobante: {
        type: DataTypes.TEXT,
      },

      mongoGravado10: {
        type: DataTypes.DECIMAL,
      },

      mongoGravado5: {
        type: DataTypes.DECIMAL,
      },

      exento: {
        type: DataTypes.DECIMAL,
      },

      imputaIVA: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      imputaIRE: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      imputaIRPRSP: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  ventas.associate = (db) => {
    db.ventas.belongsTo(db.contribuyentes, {
      as: 'contribuyente',
      constraints: false,
    });

    db.ventas.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ventas.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ventas;
};
