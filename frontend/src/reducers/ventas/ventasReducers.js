import list from 'reducers/ventas/ventasListReducers';
import form from 'reducers/ventas/ventasFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
