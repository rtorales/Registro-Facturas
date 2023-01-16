import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CONTRIBUYENTE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTE_FORM_FIND_STARTED',
      });

      axios.get(`/contribuyente/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'CONTRIBUYENTE_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/contribuyente'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTE_FORM_CREATE_STARTED',
      });

      axios.post('/contribuyente', { data: values }).then(res => {
        dispatch({
          type: 'CONTRIBUYENTE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Contribuyente created' });
        dispatch(push('/admin/contribuyente'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/contribuyente/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'CONTRIBUYENTE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Contribuyente updated' });
        dispatch(push('/admin/contribuyente'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
