import React, { useState, useEffect } from 'react';
import ContribuyenteForm from 'pages/CRUD/Contribuyente/form/ContribuyenteForm';
import { push } from 'connected-react-router';
import actions from 'actions/contribuyente/contribuyenteFormActions';
import { connect } from 'react-redux';

const ContribuyenteFormPage = (props) => {

  const {
    dispatch,
    match,
    saveLoading,
    findLoading,
    record,
    currentUser
  } = props;

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!match.params.id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()))
    } else {
      dispatch(actions.doCreate(data))
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      if (isProfile()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew())
      }
    }
    setDispatched(true);
  }, [match, dispatch])

  return (
    <React.Fragment>
      {dispatched && (
        <ContribuyenteForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        currentUser={currentUser}
        record={(isEditing() || isProfile()) ? record : {}}
        isEditing={isEditing()}
        isProfile={isProfile()}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/admin/contribuyente'))}
        />
        )}
    </React.Fragment>
  );
}

function mapStateToProps(store) {
  return {
    findLoading: store.contribuyente.form.findLoading,
    saveLoading: store.contribuyente.form.saveLoading,
    record: store.contribuyente.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(ContribuyenteFormPage);
