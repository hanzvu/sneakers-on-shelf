import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Grid, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { fetchAccount } from '../../services/AccountService';
import { register } from '../../services/AuthenticationService';
import { clearCart, fetchCart } from '../../services/CartService';
import { showSnackbar } from '../../services/NotificationService';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên tài khoản.').min(4, 'Tên tài khoản quá ngắn.'),
    fullname: Yup.string().required('Vui lòng nhập họ và tên.'),
    email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email.'),
    password: Yup.string().required('Vui lòng nhập mật khẩu.').min(6, 'Mật khẩu phải có ít nhất 6 kí tự.'),
    repassword: Yup.string().required('Vui lòng nhập mật khẩu.').oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không chính xác.'),
  });

  const defaultValues = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    repassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (account) => {
    try {
      await register(account);
      await fetchAccount();
      clearCart();
      fetchCart();
      navigate('/', { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showSnackbar(error.response.data, "error")
      } else {
        showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
      }
    }
  }

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Stack spacing={3}>
            <RHFTextField name="username" label="Tên tài khoản" />
            <RHFTextField
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="repassword"
              label="Xác nhận mật khẩu"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={3}>
            <RHFTextField name="fullname" label="Họ và tên" />
            <RHFTextField name="email" label="Email" />
          </Stack>
        </Grid>
        <Grid container item>
          <Box>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Đăng Ký
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider >
  );
}
