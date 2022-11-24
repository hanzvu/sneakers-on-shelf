import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Stack } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { showSnackbar } from "../../services/NotificationService";
import { forgotPassword } from '../../services/AccountService';

export default function ForgotPassword() {

    const RegisterSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng nhập tên tài khoản.'),
        email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email.'),
    });

    const defaultValues = {
        username: '',
        email: '',
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        forgotPassword(data).then(response => {
            console.log(response);
            showSnackbar("Thành công, hãy kiểm tra email của bạn.");
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                showSnackbar(error.response.data, "error")
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error")
            }
        })

    }

    return (<>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} p={3}>
                <RHFTextField name="username" label="Tên tài khoản" />
                <RHFTextField name="email" label="Email" />
                <Stack direction={"row"} justifyContent="flex-end" >
                    <Box>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Xác Nhận
                        </LoadingButton>
                    </Box>
                </Stack>
            </Stack>
        </FormProvider >
    </>)
}