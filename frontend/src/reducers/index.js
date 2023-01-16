import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import contribuyentes from 'reducers/contribuyentes/contribuyentesReducers';

import compras from 'reducers/compras/comprasReducers';

import ventas from 'reducers/ventas/ventasReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    contribuyentes,

    compras,

    ventas,
  });
