import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [contribuyentes, setContribuyentes] = useState(0);
  const [compras, setCompras] = useState(0);
  const [ventas, setVentas] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [setUsers,setContribuyentes,setCompras,setVentas,];

    const responseUsers = await axios.get(`/users/count`);
    const responseContribuyentes = await axios.get(`/contribuyentes/count`);
    const responseCompras = await axios.get(`/compras/count`);
    const responseVentas = await axios.get(`/ventas/count`);
      Promise.all([responseUsers,responseContribuyentes,responseCompras,responseVentas,])
          .then((res) => res.map((el) => el.data))
          .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
          <Widget title={'Users'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Users: <span className={classes.widgetTextCount}>{users}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/contribuyentes'} style={{ textDecoration: 'none' }}>
          <Widget title={'Contribuyentes'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Contribuyentes: <span className={classes.widgetTextCount}>{contribuyentes}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/compras'} style={{ textDecoration: 'none' }}>
          <Widget title={'Compras'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Compras: <span className={classes.widgetTextCount}>{compras}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/ventas'} style={{ textDecoration: 'none' }}>
          <Widget title={'Ventas'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Ventas: <span className={classes.widgetTextCount}>{ventas}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
