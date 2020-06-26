import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

function AuthButton(props) {
  if (props.user) {
    return <Button color="inherit" onClick={props.logout}>ログアウト</Button>
  }

  return <Button color="inherit" onClick={props.login}>ログイン</Button>
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
            <AuthButton user={props.user} login={props.login} logout={props.logout} />
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
