import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link, Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Chip, Pagination, PaginationItem, Paper, Stack, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getPurchaseByAccountId } from "../../services/PurchaseService";
import { fCurrency } from "../../../utils/formatNumber";

export default function AccountPurchase() {

    const navigate = useNavigate();

    const account = useSelector(state => state.account.account)

    const [searchParams, setSearchParams] = useSearchParams();

    const [purchases, setPurchases] = useState();

    useEffect(() => {
        const fetchPurchases = async () => {
            if (!account) {
                return;
            }
            const data = await getPurchaseByAccountId(account.id, Object.fromEntries(searchParams.entries()));
            setPurchases(data);
        }

        fetchPurchases();
    }, [searchParams])

    const handleShowOrderDetail = id => {
        navigate(`/purchase/${id}`);
    }


    return (<>
        <Paper elevation={3} square>
            {
                purchases &&
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Mã đơn hàng</StyledTableCell>
                                    <StyledTableCell align="center">Trạng thái</StyledTableCell>
                                    <StyledTableCell align="center">Loại đơn hàng</StyledTableCell>
                                    <StyledTableCell align="center" width={"9%"}>Số sản phẩm</StyledTableCell>
                                    <StyledTableCell align="center" width={"15%"}>Tổng tiền</StyledTableCell>
                                    <StyledTableCell align="center" width={"15%"}>Ngày đặt</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    purchases.content.map(purchase => (
                                        <StyledTableRow key={purchase.id}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "#D5D5D5 !important"
                                                }
                                            }}
                                            onClick={() => { handleShowOrderDetail(purchase.id) }}>
                                            <StyledTableCell align="center">
                                                <Typography variant="subtitle2">
                                                    {purchase.id}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                <Chip label={purchase.orderStatus.description} color={purchase.orderStatus.color} />
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                <Chip label={purchase.saleMethod.description} color={purchase.saleMethod.color} />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography variant="body2">
                                                    {purchase.productCount}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography variant="body2" color={"crimson"}>
                                                    {fCurrency(purchase.total)}
                                                </Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Typography variant="body2">
                                                    {new Date(purchase.createDate).toLocaleString()}
                                                </Typography>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }

                                {
                                    purchases.totalElements === 0 &&
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Typography gutterBottom align="center" variant="subtitle1">
                                                chưa có đơn hàng
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        purchases.totalElements > 0 &&
                        <Stack alignItems={"center"} spacing={3} py={2}>

                            <Pagination
                                page={purchases.number + 1}
                                count={purchases.totalPages}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/account/purchase${item.page === purchases.number + 1 ? '' : `?page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    }
                </>
            }
        </Paper>
    </>)
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));