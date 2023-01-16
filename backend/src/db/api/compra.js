
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CompraDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const compra = await db.compra.create(
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

    await compra.setContribuyente(data.contribuyente || null, {
    transaction,
    });

  return compra;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const compra = await db.compra.findByPk(id, {
      transaction,
    });

    await compra.update(
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

    await compra.setContribuyente(data.contribuyente || null, {
      transaction,
    });

    return compra;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const compra = await db.compra.findByPk(id, options);

    await compra.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await compra.destroy({
      transaction
    });

    return compra;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const compra = await db.compra.findOne(
      { where },
      { transaction },
    );

    if (!compra) {
      return compra;
    }

    const output = compra.get({plain: true});

    output.contribuyente = await compra.getContribuyente({
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
            'compra',
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.compra.count({
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
    )} : await db.compra.findAndCountAll(
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
            'compra',
            'numeroComprobante',
            query,
          ),
        ],
      };
    }

    const records = await db.compra.findAll({
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

