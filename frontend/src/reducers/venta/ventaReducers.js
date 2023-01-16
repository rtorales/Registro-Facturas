import list from 'reducers/venta/ventaListReducers';
import form from 'reducers/venta/ventaFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
