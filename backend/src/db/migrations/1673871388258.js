module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'compras',
        'tipoIdentificacionComprador',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'RUC',
            'CÉDULA DE IDENTIDAD',
            'PASAPORTE',
            'CÉDULA EXTRANJERO',
            'SIN NOMBRE',
            'DIPOMÁTICO',
            'IDENTIFICACIÓN TRIBUTARIA',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'numeroIdentificacion',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'razonSocial',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('compras', 'razonSocial', {
        transaction,
      });

      await queryInterface.removeColumn('compras', 'numeroIdentificacion', {
        transaction,
      });

      await queryInterface.removeColumn(
        'compras',
        'tipoIdentificacionComprador',
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
