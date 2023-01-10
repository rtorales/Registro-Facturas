import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'VENTAS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'VENTAS_FORM_FIND_STARTED',
      });

      axios.get(`/ventas/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'VENTAS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTAS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/ventas'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'VENTAS_FORM_CREATE_STARTED',
      });

      axios.post('/ventas', { data: values }).then((res) => {
        dispatch({
          type: 'VENTAS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Ventas created' });
        dispatch(push('/admin/ventas'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTAS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'VENTAS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/ventas/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'VENTAS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Ventas updated' });
        dispatch(push('/admin/ventas'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTAS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
