import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Container>
      <Box display="flex" justifyContent='center'>
        <Typography variant='h1'>Register Form</Typography>
      </Box>
      <RegisterForm></RegisterForm>
    </Container>
  );
}
export default App;
