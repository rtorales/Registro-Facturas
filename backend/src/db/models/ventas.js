const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const ventas = sequelize.define(
    'ventas',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

razonSocial: {
        type: DataTypes.TEXT,

      },

fechaEmision: {
        type: DataTypes.DATEONLY,

        get: function() {
          return this.getDataValue('fechaEmision')
            ? moment
                .utc(this.getDataValue('fechaEmision'))
                .format('YYYY-MM-DD')
            : null;
        },

      },

numeroIdentificacion: {
        type: DataTypes.TEXT,

      },

tipoIdentificacionComprador: {
        type: DataTypes.ENUM,

        values: [

"RUC",

"CÉDULA DE IDENTIDAD",

"PASAPORTE",

"CÉDULA EXTRANJERO",

"SIN NOMBRE",

"DIPLOMÁTICO",

"IDENTIFICACIÓN TRIBUTARIA"

        ],

      },

numeroComprobante: {
        type: DataTypes.TEXT,

      },

montoGravado5: {
        type: DataTypes.DECIMAL,

      },

montoGravado10: {
        type: DataTypes.DECIMAL,

      },

exento: {
        type: DataTypes.DECIMAL,

      },

timbrado: {
        type: DataTypes.INTEGER,

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

anexo: {
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

  ventas.associate = (db) => {

    db.ventas.belongsTo(db.contribuyentes, {
      as: 'contribuyente',
      foreignKey: {
        name: 'contribuyenteId',
      },
      constraints: false,
    });

    db.ventas.hasMany(db.file, {
      as: 'documento',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.ventas.getTableName(),
        belongsToColumn: 'documento',
      },
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

