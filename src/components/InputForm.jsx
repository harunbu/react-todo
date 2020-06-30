/**
 * 入力フォームコンポーネント
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as firebase from '../firebase.jsx';

export default function InputForm(props) {
  const [state, setState] = useState({value:''});
  const user = useSelector(state => state.user);
  const handleClick = () => {
    firebase.addTask(user.uid, state.value);
    setState({value:''});
  };
  return (
    <Box mb={3}>
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box gbcolor="gray.300" flexGrow={1}>
              <TextField fullWidth id="standard-basic" label="タスクの内容を入力"
                value={state.value}
                onChange={e => setState({value:e.target.value})}
              />
            </Box>
            <Button variant="contained" onClick={handleClick}>タスク追加</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
