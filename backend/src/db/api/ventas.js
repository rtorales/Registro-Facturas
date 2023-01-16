
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VentasDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const ventas = await db.ventas.create(
  {
  id: data.id || undefined,

    razonSocial: data.razonSocial
    ||
    null
,

    fechaEmision: data.fechaEmision
    ||
    null
,

    numeroIdentificacion: data.numeroIdentificacion
    ||
    null
,

    tipoIdentificacionComprador: data.tipoIdentificacionComprador
    ||
    null
,

    numeroComprobante: data.numeroComprobante
    ||
    null
,

    montoGravado5: data.montoGravado5
    ||
    null
,

    montoGravado10: data.montoGravado10
    ||
    null
,

    exento: data.exento
    ||
    null
,

    timbrado: data.timbrado
    ||
    null
,

    imputaIVA: data.imputaIVA
    ||
    false

,

    imputaIRE: data.imputaIRE
    ||
    false

,

    imputaIRPRSP: data.imputaIRPRSP
    ||
    false

,

    anexo: data.anexo
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await ventas.setContribuyente(data.contribuyente || null, {
    transaction,
    });

    await FileDBApi.replaceRelationFiles(
    {
    belongsTo: db.ventas.getTableName(),
    belongsToColumn: 'documento',
    belongsToId: ventas.id,
    },
    data.documento,
    options,
    );

  return ventas;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const ventas = await db.ventas.findByPk(id, {
      transaction,
    });

    await ventas.update(
      {

        razonSocial: data.razonSocial
        ||
        null
,

        fechaEmision: data.fechaEmision
        ||
        null
,

        numeroIdentificacion: data.numeroIdentificacion
        ||
        null
,

        tipoIdentificacionComprador: data.tipoIdentificacionComprador
        ||
        null
,

        numeroComprobante: data.numeroComprobante
        ||
        null
,

        montoGravado5: data.montoGravado5
        ||
        null
,

        montoGravado10: data.montoGravado10
        ||
        null
,

        exento: data.exento
        ||
        null
,

        timbrado: data.timbrado
        ||
        null
,

        imputaIVA: data.imputaIVA
        ||
        false

,

        imputaIRE: data.imputaIRE
        ||
        false

,

        imputaIRPRSP: data.imputaIRPRSP
        ||
        false

,

        anexo: data.anexo
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await ventas.setContribuyente(data.contribuyente || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.ventas.getTableName(),
        belongsToColumn: 'documento',
        belongsToId: ventas.id,
      },
      data.documento,
      options,
    );

    return ventas;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const ventas = await db.ventas.findByPk(id, options);

    await ventas.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await ventas.destroy({
      transaction
    });

    return ventas;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const ventas = await db.ventas.findOne(
      { where },
      { transaction },
    );

    if (!ventas) {
      return ventas;
    }

    const output = ventas.get({plain: true});

    output.contribuyente = await ventas.getContribuyente({
      transaction
    });

    output.documento = await ventas.getDocumento({
      transaction
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

      {
        model: db.contribuyentes,
        as: 'contribuyente',
      },

      {
        model: db.file,
        as: 'documento',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.razonSocial) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ventas',
            'razonSocial',
            filter.razonSocial,
          ),
        };
      }

      if (filter.numeroIdentificacion) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ventas',
            'numeroIdentificacion',
            filter.numeroIdentificacion,
          ),
        };
      }

      if (filter.numeroComprobante) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ventas',
            'numeroComprobante',
            filter.numeroComprobante,
          ),
        };
      }

      if (filter.anexo) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'ventas',
            'anexo',
            filter.anexo,
          ),
        };
      }

      if (filter.fechaEmisionRange) {
        const [start, end] = filter.fechaEmisionRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fechaEmision: {
              ...where.fechaEmision,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fechaEmision: {
              ...where.fechaEmision,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.montoGravado5Range) {
        const [start, end] = filter.montoGravado5Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            montoGravado5: {
              ...where.montoGravado5,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            montoGravado5: {
              ...where.montoGravado5,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.montoGravado10Range) {
        const [start, end] = filter.montoGravado10Range;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            montoGravado10: {
              ...where.montoGravado10,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            montoGravado10: {
              ...where.montoGravado10,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.exentoRange) {
        const [start, end] = filter.exentoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            exento: {
              ...where.exento,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            exento: {
              ...where.exento,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.timbradoRange) {
        const [start, end] = filter.timbradoRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            timbrado: {
              ...where.timbrado,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            timbrado: {
              ...where.timbrado,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.tipoIdentificacionComprador) {
        where = {
          ...where,
          tipoIdentificacionComprador: filter.tipoIdentificacionComprador,
        };
      }

      if (filter.imputaIVA) {
        where = {
          ...where,
          imputaIVA: filter.imputaIVA,
        };
      }

      if (filter.imputaIRE) {
        where = {
          ...where,
          imputaIRE: filter.imputaIRE,
        };
      }

      if (filter.imputaIRPRSP) {
        where = {
          ...where,
          imputaIRPRSP: filter.imputaIRPRSP,
        };
      }

      if (filter.contribuyente) {
        var listItems = filter.contribuyente.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          contribuyenteId: {[Op.or]: listItems}
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.ventas.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: (filter.field && filter.sort)
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
        },
    )} : await db.ventas.findAndCountAll(
        {
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order: (filter.field && filter.sort)
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
        },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'ventas',
            'id',
            query,
          ),
        ],
      };
    }

    const records = await db.ventas.findAll({
      attributes: [ 'id', 'id' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }

};

