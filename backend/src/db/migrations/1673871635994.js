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
                      'fechaEmision',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'numeroComprobante',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'mongoGravado10',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'mongoGravado5',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'timbrado',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'exento',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'imputaIVA',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'imputaIRE',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compras',
                      'imputaIRPRSP',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
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

                    await queryInterface.removeColumn(
                        'compras',
                        'imputaIRPRSP',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'imputaIRE',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'imputaIVA',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'exento',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'timbrado',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'mongoGravado5',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'mongoGravado10',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'numeroComprobante',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compras',
                        'fechaEmision',
                        { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
