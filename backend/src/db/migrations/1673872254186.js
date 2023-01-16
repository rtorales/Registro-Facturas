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
      await queryInterface.dropTable('ventas', { transaction });

      await queryInterface.createTable(
        'ventas',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'contribuyenteId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contribuyentes',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'razonSocial',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'fechaEmision',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'numeroIdentificacion',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'tipoIdentificacionComprador',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'RUC',
            'CÉDULA DE IDENTIDAD',
            'PASAPORTE',
            'CÉDULA EXTRANJERO',
            'SIN NOMBRE',
            'DIPLOMÁTICO',
            'IDENTIFICACIÓN TRIBUTARIA',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'numeroComprobante',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'montoGravado5',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'montoGravado10',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'exento',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'timbrado',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'imputaIVA',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'imputaIRE',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'imputaIRPRSP',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'ventas',
        'anexo',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.removeColumn('compras', 'imputaIRPRSP', {
        transaction,
      });

      await queryInterface.removeColumn('compras', 'imputaIVA', {
        transaction,
      });

      await queryInterface.removeColumn('compras', 'imputaIRE', {
        transaction,
      });

      await queryInterface.addColumn(
        'compras',
        'imputaIRE',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'imputaIVA',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'imputaIRPRSP',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
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
      await queryInterface.removeColumn('compras', 'imputaIRPRSP', {
        transaction,
      });

      await queryInterface.removeColumn('compras', 'imputaIVA', {
        transaction,
      });

      await queryInterface.removeColumn('compras', 'imputaIRE', {
        transaction,
      });

      await queryInterface.addColumn(
        'compras',
        'imputaIRE',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'imputaIVA',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'compras',
        'imputaIRPRSP',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.removeColumn('ventas', 'anexo', { transaction });

      await queryInterface.removeColumn('ventas', 'imputaIRPRSP', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'imputaIRE', { transaction });

      await queryInterface.removeColumn('ventas', 'imputaIVA', { transaction });

      await queryInterface.removeColumn('ventas', 'timbrado', { transaction });

      await queryInterface.removeColumn('ventas', 'exento', { transaction });

      await queryInterface.removeColumn('ventas', 'montoGravado10', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'montoGravado5', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'numeroComprobante', {
        transaction,
      });

      await queryInterface.removeColumn(
        'ventas',
        'tipoIdentificacionComprador',
        { transaction },
      );

      await queryInterface.removeColumn('ventas', 'numeroIdentificacion', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'fechaEmision', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'razonSocial', {
        transaction,
      });

      await queryInterface.removeColumn('ventas', 'contribuyenteId', {
        transaction,
      });

      await queryInterface.dropTable('ventas', { transaction });

      await queryInterface.createTable(
        'ventas',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
