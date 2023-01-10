import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'CONTRIBUYENTES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTES_FORM_FIND_STARTED',
      });

      axios.get(`/contribuyentes/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'CONTRIBUYENTES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/contribuyentes'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTES_FORM_CREATE_STARTED',
      });

      axios.post('/contribuyentes', { data: values }).then((res) => {
        dispatch({
          type: 'CONTRIBUYENTES_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Contribuyentes created' });
        dispatch(push('/admin/contribuyentes'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CONTRIBUYENTES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/contribuyentes/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'CONTRIBUYENTES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Contribuyentes updated' });
        dispatch(push('/admin/contribuyentes'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'CONTRIBUYENTES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
