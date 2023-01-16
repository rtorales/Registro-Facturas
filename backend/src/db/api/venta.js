
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VentaDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const venta = await db.venta.create(
  {
  id: data.id || undefined,

    numeroComprobante: data.numeroComprobante
    ||
    null
,

    fechaComprobante: data.fechaComprobante
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await venta.setContribuyente(data.contribuyente || null, {
    transaction,
    });

  return venta;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const venta = await db.venta.findByPk(id, {
      transaction,
    });

    await venta.update(
      {

        numeroComprobante: data.numeroComprobante
        ||
        null
,

        fechaComprobante: data.fechaComprobante
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await venta.setContribuyente(data.contribuyente || null, {
      transaction,
    });

    return venta;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const venta = await db.venta.findByPk(id, options);

    await venta.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await venta.destroy({
      transaction
    });

    return venta;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const venta = await db.venta.findOne(
      { where },
      { transaction },
    );

    if (!venta) {
      return venta;
    }

    const output = venta.get({plain: true});

    output.contribuyente = await venta.getContribuyente({
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
        model: db.contribuyente,
        as: 'contribuyente',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.numeroComprobante) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'venta',
            'numeroComprobante',
            filter.numeroComprobante,
          ),
        };
      }

      if (filter.fechaComprobanteRange) {
        const [start, end] = filter.fechaComprobanteRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            fechaComprobante: {
              ...where.fechaComprobante,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            fechaComprobante: {
              ...where.fechaComprobante,
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.venta.count({
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
    )} : await db.venta.findAndCountAll(
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
            'venta',
            'numeroComprobante',
            query,
          ),
        ],
      };
    }

    const records = await db.venta.findAll({
      attributes: [ 'id', 'numeroComprobante' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['numeroComprobante', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.numeroComprobante,
    }));
  }

};

