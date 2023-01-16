import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import comprasFields from 'pages/CRUD/Compras/helpers/comprasFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

import ContribuyentesSelectItem from 'pages/CRUD/Contribuyentes/helpers/ContribuyentesSelectItem';

const ComprasForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(comprasFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(comprasFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(comprasFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Compras'
  : 'Add Compras';
  };

  const renderForm = () => (
  <Widget title={<h4>{title()}</h4>} collapse close>
  <Formik
          onSubmit={handleSubmit}
  initialValues={iniValues()}
  validationSchema={formValidations()}
  >
  {(form) => (
  <form onSubmit={form.handleSubmit}>
    <Grid container spacing={3} direction="column">

      <Grid item>
        <ContribuyentesSelectItem
        name={'contribuyente'}
        schema={comprasFields}
        showCreate={!modal}
        form={form}
        />
      </Grid>

      <Grid item>
        <RadioFormItem
          name={'tipoIdentificacionComprador'}
          schema={comprasFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'numeroIdentificacion'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'razonSocial'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <DatePickerFormItem
          name={'fechaEmision'}
          schema={comprasFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'numeroComprobante'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'mongoGravado10'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'mongoGravado5'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'timbrado'}
          schema={comprasFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'exento'}
          schema={comprasFields}

        />
      </Grid>

      <Grid item>
        <ImagesFormItem
          name={'anexo'}
          schema={comprasFields}
          path={'compras/anexo'}
          fileProps={{
          size: undefined,
          formats: undefined,
          }}
          max={undefined}
        />
      </Grid>

      <Grid item>
        <FilesFormItem
          name={'documento'}
          schema={comprasFields}
          path={'compras/documento'}
          fileProps={{
          size: undefined,
          formats: undefined,
          }}
          max={undefined}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'imputaIRE'}
          schema={comprasFields}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'imputaIVA'}
          schema={comprasFields}
        />
      </Grid>

      <Grid item>
        <SwitchFormItem
          name={'imputaIRPRSP'}
          schema={comprasFields}
        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
    </Formik>
  </Widget>
  );
  if (findLoading) {
  return <Loader />;
  }
  if (isEditing && !record) {
  return <Loader />;
  }
  return renderForm();
  }
  export default ComprasForm;
