const ventasFields = {
  id: { type: 'id', label: 'ID' },

  contribuyente: {
    type: 'relation_one',
    label: 'Contribuyente',

    options: [{ value: 'value', label: 'value' }],
  },

  tipoIdentificacionComprador: {
    type: 'enum',
    label: 'Tipo Identificación Comprador',

    options: [
      { value: 'RUC', label: 'RUC' },

      { value: 'CÉDULA DE IDENTIDAD', label: 'CÉDULA DE IDENTIDAD' },

      { value: 'PASAPORTE', label: 'PASAPORTE' },

      { value: 'CÉDULA EXTRANJERO', label: 'CÉDULA EXTRANJERO' },

      { value: 'SIN NOMBRE', label: 'SIN NOMBRE' },

      { value: 'DIPLOMÁTICO', label: 'DIPLOMÁTICO' },

      {
        value: 'IDENTIFICACIÓN TRIBUTARIA',
        label: 'IDENTIFICACIÓN TRIBUTARIA',
      },
    ],
  },

  numeroIdentificacion: {
    type: 'string',
    label: 'Numero Identificacion',

    options: [{ value: 'value', label: 'value' }],
  },

  razonSocial: {
    type: 'string',
    label: 'Razon Social',

    options: [{ value: 'value', label: 'value' }],
  },

  fechaEmision: {
    type: 'date',
    label: 'Fecha Emision',

    options: [{ value: 'value', label: 'value' }],
  },

  timbrado: {
    type: 'string',
    label: 'Timbrado',

    options: [{ value: 'value', label: 'value' }],
  },

  numeroComprobante: {
    type: 'string',
    label: 'Numero Comprobante',

    options: [{ value: 'value', label: 'value' }],
  },

  mongoGravado10: {
    type: 'decimal',
    label: 'Mongo Gravado 10 (IVA incluido)',

    options: [{ value: 'value', label: 'value' }],
  },

  mongoGravado5: {
    type: 'decimal',
    label: 'Mongo Gravado 5 (IVA incluido)',

    options: [{ value: 'value', label: 'value' }],
  },

  exento: {
    type: 'decimal',
    label: 'Exento',

    options: [{ value: 'value', label: 'value' }],
  },

  imputaIVA: {
    type: 'boolean',
    label: 'Imputa IVA',

    options: [{ value: 'value', label: 'value' }],
  },

  imputaIRE: {
    type: 'boolean',
    label: 'Imputa IRE',

    options: [{ value: 'value', label: 'value' }],
  },

  imputaIRPRSP: {
    type: 'boolean',
    label: 'Imputa IRP-RSP',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default ventasFields;
