const db = require('../db/models');
const ContribuyentesDBApi = require('../db/api/contribuyentes');

module.exports = class ContribuyentesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ContribuyentesDBApi.create(
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
      let contribuyentes = await ContribuyentesDBApi.findBy(
        {id},
        {transaction},
      );

      if (!contribuyentes) {
        throw new ValidationError(
          'contribuyentesNotFound',
        );
      }

      await ContribuyentesDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return contribuyentes;

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

      await ContribuyentesDBApi.remove(
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

