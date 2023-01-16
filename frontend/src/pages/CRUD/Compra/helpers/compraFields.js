
const compraFields = {
	id: { type: 'id', label: 'ID' },

    contribuyente: { type: 'relation_one', label: 'Contribuyente',

    options: [

    { value: 'value', label: 'value' },

]

    },

    numeroComprobante: { type: 'string', label: 'Numero Comprobante',

    options: [

    { value: 'value', label: 'value' },

]

    },

    fechaComprobante: { type: 'date', label: 'Fecha Comprobante',

    options: [

    { value: 'value', label: 'value' },

]

    },

}

export default compraFields;
