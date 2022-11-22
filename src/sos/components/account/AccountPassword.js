import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useState } from "react";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import { updateAccountPassword } from '../../services/AccountService';
import { showSnackbar } from '../../services/NotificationService';

export default function AccountPassword() {

    const account = useSelector(state => state.account.account);

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({
        password: Yup.string().required('Vui lòng nhập mật khẩu hiện tại.').min(6, 'Mật khẩu phải có ít nhất 6 kí tự.'),
        newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới.').min(6, 'Mật khẩu phải có ít nhất 6 kí tự.'),
        confirmPassword: Yup.string().required('Vui lòng xác nhận mật khẩu mới.').oneOf([Yup.ref('newPassword'), null], 'Xác nhận mật khẩu mới không chính xác.'),
    });

    const defaultValues = {
        password: '',
        newPassword: '',
        confirmPassword: ''
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        updateAccountPassword(account.id, data).then(() => {
            showSnackbar("Cập nhật thành công.");
            reset();
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                showSnackbar(error.response.data, "error");
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error");
            }
        })
    }

    return (<>
        <Paper elevation={3} square>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} p={3}>
                    <Typography variant="h4" textAlign={"center"}>
                        ĐỔI MẬT KHẨU
                    </Typography>
                    <RHFTextField
                        name="password"
                        label="Mật khẩu hiện tại"
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
                        name="newPassword"
                        label="Mật khẩu mới"
                        type={showNewPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowNewPassword(!showNewPassword)}>
                                        <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <RHFTextField
                        name="confirmPassword"
                        label="Xác nhận mật khẩu mới"
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction={"row"} justifyContent="flex-end" >
                        <Box>
                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                Cập Nhật
                            </LoadingButton>
                        </Box>
                    </Stack>
                </Stack>
            </FormProvider >
        </Paper>
    </>)
}