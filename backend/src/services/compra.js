const db = require('../db/models');
const CompraDBApi = require('../db/api/compra');

module.exports = class CompraService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CompraDBApi.create(
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
      let compra = await CompraDBApi.findBy(
        {id},
        {transaction},
      );

      if (!compra) {
        throw new ValidationError(
          'compraNotFound',
        );
      }

      await CompraDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return compra;

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

      await CompraDBApi.remove(
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

