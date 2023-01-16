import list from 'reducers/contribuyente/contribuyenteListReducers';
import form from 'reducers/contribuyente/contribuyenteFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
