const db = require('../db/models');
const VentaDBApi = require('../db/api/venta');

module.exports = class VentaService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await VentaDBApi.create(
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
      let venta = await VentaDBApi.findBy(
        {id},
        {transaction},
      );

      if (!venta) {
        throw new ValidationError(
          'ventaNotFound',
        );
      }

      await VentaDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return venta;

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

      await VentaDBApi.remove(
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

