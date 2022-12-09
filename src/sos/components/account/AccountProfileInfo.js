import { useSelector } from "react-redux";
import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { fetchAccount, updateAccountInfo } from "../../services/AccountService";
import { showSnackbar } from "../../services/NotificationService";

export default function AccountProfileInfo() {

    const account = useSelector(state => state.account.account);

    const RegisterSchema = Yup.object().shape({
        fullname: Yup.string().required('Vui lòng nhập họ và tên.'),
        email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email.'),
    });

    const defaultValues = {
        fullname: account.fullname,
        email: account.email,
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
        updateAccountInfo(account.id, data).then(() => {
            fetchAccount().then(() => {
                showSnackbar("Cập nhật thành công.");
            });
        }).catch(error => {
            if (error.reponse && error.reponse.data) {
                showSnackbar(error.reponse.data, "error");
            } else {
                showSnackbar("Có lỗi xảy ra, hãy thử lại sau.", "error");
            }
        })
    }

    return (<>
        <Stack spacing={3}>
            <Paper elevation={3} square>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} p={3}>
                        <Typography variant="h4" textAlign={"center"} color="dimgray">
                            THÔNG TIN TÀI KHOẢN
                        </Typography>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant="body1">
                                    Điểm Tích Lũy
                                </Typography>
                            </Grid>
                            <Grid item xs={3} container justifyContent="center">
                                <Typography variant="body1">
                                    {account.point}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant="body1">
                                    Hạng Thành Viên
                                </Typography>
                            </Grid>
                            <Grid item xs={3} container justifyContent="center">
                                {
                                    account.memberOfferPolicy != null ?
                                        <Chip label={account.memberOfferPolicy.memberRank.description} color={account.memberOfferPolicy.memberRank.color} />
                                        :
                                        <Chip label="Khách hàng" color="default" />
                                }
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant="body1">
                                    Ưu Đãi Thành Viên
                                </Typography>
                            </Grid>
                            <Grid item xs={3} container justifyContent="center">
                                <Typography variant="body1">
                                    {account.memberOfferPolicy.offer}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </FormProvider >
            </Paper>
            <Paper elevation={3} square>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} p={3}>
                        <Typography variant="h4" textAlign={"center"} color="dimgray">
                            THÔNG TIN TÀI KHOẢN
                        </Typography>
                        <RHFTextField name="fullname" label="Họ và tên" />
                        <RHFTextField name="email" label="Email" />
                        <Stack direction={"row"} justifyContent="flex-end" >
                            <Box>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Cập Nhật
                                </LoadingButton>
                            </Box>
                        </Stack>
                    </Stack>
                </FormProvider >
            </Paper>
        </Stack>
    </>)
}