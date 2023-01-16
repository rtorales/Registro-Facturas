const db = require('../db/models');
const ContribuyenteDBApi = require('../db/api/contribuyente');

module.exports = class ContribuyenteService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ContribuyenteDBApi.create(
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
      let contribuyente = await ContribuyenteDBApi.findBy(
        {id},
        {transaction},
      );

      if (!contribuyente) {
        throw new ValidationError(
          'contribuyenteNotFound',
        );
      }

      await ContribuyenteDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return contribuyente;

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

      await ContribuyenteDBApi.remove(
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

