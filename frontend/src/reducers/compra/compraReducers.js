import list from 'reducers/compra/compraListReducers';
import form from 'reducers/compra/compraFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
