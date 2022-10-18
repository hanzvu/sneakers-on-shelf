import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { login } from '../../services/AuthenticationService';
import { showSnackbar } from '../../services/NotificationService';
import { fetchAccount } from '../../services/AccountService';
import { clearCart, fetchCart } from '../../services/CartService';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email không đúng định dạng.').required('Vui lòng nhập email.'),
        password: Yup.string().required('Vui lòng nhập mật khẩu.'),
    });

    const defaultValues = {
        email: '',
        password: '',
        remember: true,
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (account) => {
        try {
            await login(account);
            await fetchAccount();
            clearCart();
            fetchCart();
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
            if (error.response) {
                showSnackbar("Tài khoản hoặc mật khẩu không chính xác.", "error")
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
            }
        }

    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="email" label="Email" />

                <RHFTextField
                    name="password"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <RHFCheckbox name="remember" label="Ghi nhớ đăng nhập" />
                <Link variant="subtitle2" underline="hover">
                    Quên mật khẩu ?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                Đăng Nhập
            </LoadingButton>
        </FormProvider>
    );
}
