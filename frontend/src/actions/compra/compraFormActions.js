import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'COMPRA_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPRA_FORM_FIND_STARTED',
      });

      axios.get(`/compra/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'COMPRA_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRA_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/compra'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'COMPRA_FORM_CREATE_STARTED',
      });

      axios.post('/compra', { data: values }).then(res => {
        dispatch({
          type: 'COMPRA_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Compra created' });
        dispatch(push('/admin/compra'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRA_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'COMPRA_FORM_UPDATE_STARTED',
      });

      await axios.put(`/compra/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'COMPRA_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Compra updated' });
        dispatch(push('/admin/compra'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'COMPRA_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
