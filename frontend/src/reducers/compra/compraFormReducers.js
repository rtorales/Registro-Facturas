const initialData = {
  findLoading: false,
  saveLoading: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === 'COMPRA_FORM_RESET') {
    return {
      ...initialData,
    };
  }

  if (type === 'COMPRA_FORM_FIND_STARTED') {
    return {
      ...state,
      record: null,
      findLoading: true,
    };
  }

  if (type === 'COMPRA_FORM_FIND_SUCCESS') {
    return {
      ...state,
      record: payload,
      findLoading: false,
    };
  }

  if (type === 'COMPRA_FORM_FIND_ERROR') {
    return {
      ...state,
      record: null,
      findLoading: false,
    };
  }

  if (type === 'COMPRA_FORM_CREATE_STARTED') {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === 'COMPRA_FORM_CREATE_SUCCESS') {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === 'COMPRA_FORM_CREATE_ERROR') {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === 'COMPRA_FORM_UPDATE_STARTED') {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === 'COMPRA_FORM_UPDATE_SUCCESS') {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === 'COMPRA_FORM_UPDATE_ERROR') {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
