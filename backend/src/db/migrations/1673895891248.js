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
                      'compra',
                      'contribuyenteId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'contribuyente',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'venta',
                      'contribuyenteId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'contribuyente',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'venta',
                      'numeroComprobante',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compra',
                      'numeroComprobante',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'venta',
                      'fechaComprobante',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'compra',
                      'fechaComprobante',
                      {
                          type: Sequelize.DataTypes.DATEONLY,

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
                        'compra',
                        'fechaComprobante',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'venta',
                        'fechaComprobante',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compra',
                        'numeroComprobante',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'venta',
                        'numeroComprobante',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'venta',
                        'contribuyenteId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'compra',
                        'contribuyenteId',
                        { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
