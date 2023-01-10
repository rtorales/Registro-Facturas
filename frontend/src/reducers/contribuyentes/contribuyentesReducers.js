import list from 'reducers/contribuyentes/contribuyentesListReducers';
import form from 'reducers/contribuyentes/contribuyentesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
