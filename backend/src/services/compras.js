const db = require('../db/models');
const ComprasDBApi = require('../db/api/compras');

module.exports = class ComprasService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ComprasDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let compras = await ComprasDBApi.findBy(
        {id},
        {transaction},
      );

      if (!compras) {
        throw new ValidationError(
          'comprasNotFound',
        );
      }

      await ComprasDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return compras;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await ComprasDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

