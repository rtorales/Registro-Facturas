import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'VENTA_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'VENTA_FORM_FIND_STARTED',
      });

      axios.get(`/venta/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'VENTA_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTA_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/venta'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'VENTA_FORM_CREATE_STARTED',
      });

      axios.post('/venta', { data: values }).then(res => {
        dispatch({
          type: 'VENTA_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Venta created' });
        dispatch(push('/admin/venta'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTA_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'VENTA_FORM_UPDATE_STARTED',
      });

      await axios.put(`/venta/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'VENTA_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Venta updated' });
        dispatch(push('/admin/venta'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'VENTA_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
