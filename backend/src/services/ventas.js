const db = require('../db/models');
const VentasDBApi = require('../db/api/ventas');

module.exports = class VentasService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await VentasDBApi.create(
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
      let ventas = await VentasDBApi.findBy(
        {id},
        {transaction},
      );

      if (!ventas) {
        throw new ValidationError(
          'ventasNotFound',
        );
      }

      await VentasDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return ventas;

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

      await VentasDBApi.remove(
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

