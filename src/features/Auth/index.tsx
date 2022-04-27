import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, Card, TextField, Theme, Typography } from '@mui/material';
import { useDispatch } from '@store';
import { login } from './authSlice';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => (theme as Theme)?.palette.secondary.main};
  height: 100vh;
`;

const Auth: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const obj = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    try {
      await dispatch(login(obj)).unwrap();
      navigate('/sample', { replace: true });
    } catch (error) {
      throw error;
    }
  };

  // const handleGetProducts = async () => {
  //   const response = await axiosInstance.post('/test-csrf');
  //   console.log(response);
  // };

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '300px',
          height: '400px',
          padding: '8px',
        }}
      >
        <Typography variant="h4" width="100%" textAlign="center">
          Login
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="standard"
          sx={{
            margin: 1,
          }}
        />
        <TextField
          id="password"
          name="password"
          label="password"
          type="password"
          variant="standard"
          sx={{ margin: 1 }}
        />
        <Button sx={{ margin: 1 }} type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Card>
      {/* <Button onClick={handleGetProducts}>Get Products</Button> */}
    </Form>
  );
};

export default Auth;
