
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ContribuyenteDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const contribuyente = await db.contribuyente.create(
  {
  id: data.id || undefined,

    razonSocial: data.razonSocial
    ||
    null
,

    ruc: data.ruc
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return contribuyente;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const contribuyente = await db.contribuyente.findByPk(id, {
      transaction,
    });

    await contribuyente.update(
      {

        razonSocial: data.razonSocial
        ||
        null
,

        ruc: data.ruc
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return contribuyente;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const contribuyente = await db.contribuyente.findByPk(id, options);

    await contribuyente.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await contribuyente.destroy({
      transaction
    });

    return contribuyente;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const contribuyente = await db.contribuyente.findOne(
      { where },
      { transaction },
    );

    if (!contribuyente) {
      return contribuyente;
    }

    const output = contribuyente.get({plain: true});

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
            'contribuyente',
            'razonSocial',
            filter.razonSocial,
          ),
        };
      }

      if (filter.ruc) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'contribuyente',
            'ruc',
            filter.ruc,
          ),
        };
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

    let { rows, count } = options?.countOnly ? {rows: [], count: await db.contribuyente.count({
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
    )} : await db.contribuyente.findAndCountAll(
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
            'contribuyente',
            'razonSocial',
            query,
          ),
        ],
      };
    }

    const records = await db.contribuyente.findAll({
      attributes: [ 'id', 'razonSocial' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['razonSocial', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.razonSocial,
    }));
  }

};

