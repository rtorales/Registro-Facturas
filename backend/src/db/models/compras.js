const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const compras = sequelize.define(
    'compras',
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

          'DIPOMÁTICO',

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

      numeroComprobante: {
        type: DataTypes.TEXT,
      },

      mongoGravado10: {
        type: DataTypes.DECIMAL,
      },

      mongoGravado5: {
        type: DataTypes.DECIMAL,
      },

      timbrado: {
        type: DataTypes.INTEGER,
      },

      exento: {
        type: DataTypes.DECIMAL,
      },

      imputaIRE: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      imputaIVA: {
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

  compras.associate = (db) => {
    db.compras.belongsTo(db.contribuyentes, {
      as: 'contribuyente',
      foreignKey: {
        name: 'contribuyenteId',
      },
      constraints: false,
    });

    db.compras.hasMany(db.file, {
      as: 'anexo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.compras.getTableName(),
        belongsToColumn: 'anexo',
      },
    });

    db.compras.hasMany(db.file, {
      as: 'documento',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.compras.getTableName(),
        belongsToColumn: 'documento',
      },
    });

    db.compras.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.compras.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return compras;
};
