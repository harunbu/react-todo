import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as firebase from '../firebase.jsx';
import * as auth from '../auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function logout() {
  firebase.unsubscribe();
  auth.signOut();
}

function AuthButton(props) {
  if (props.user) {
    return <Button color="inherit" onClick={logout}>ログアウト</Button>
  }

  return (
    <Button color="inherit" component={Link} to="/login">ログイン</Button>
  );
}

function MenuBar(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Container maxWidth="sm">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Todo リスト
            </Typography>
            <AuthButton user={props.user} logout={props.logout} />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
  })
)(MenuBar);
