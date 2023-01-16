import list from 'reducers/compras/comprasListReducers';
import form from 'reducers/compras/comprasFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
