
import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import contribuyente from 'reducers/contribuyente/contribuyenteReducers';

import compra from 'reducers/compra/compraReducers';

import venta from 'reducers/venta/ventaReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    contribuyente,

    compra,

    venta,

  });

