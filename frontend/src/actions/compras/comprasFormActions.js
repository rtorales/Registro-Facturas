import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'COMPRAS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPRAS_FORM_FIND_STARTED',
      });

      axios.get(`/compras/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'COMPRAS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRAS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/compras'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPRAS_FORM_CREATE_STARTED',
      });

      axios.post('/compras', { data: values }).then((res) => {
        dispatch({
          type: 'COMPRAS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Compras created' });
        dispatch(push('/admin/compras'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRAS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'COMPRAS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/compras/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'COMPRAS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Compras updated' });
        dispatch(push('/admin/compras'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRAS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
