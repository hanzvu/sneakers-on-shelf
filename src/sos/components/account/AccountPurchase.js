import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link as RouterLink } from 'react-router-dom';
import { Chip, Link, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getPurchaseByAccountId } from "../../services/PurchaseService";
import { fCurrency } from "../../../utils/formatNumber";

export default function AccountPurchase() {

    const [purchases, setPurchases] = useState();

    const account = useSelector(state => state.account.account)

    useEffect(() => {
        const fetchPurchases = async () => {
            if (!account) {
                return;
            }
            const data = await getPurchaseByAccountId(account.id);
            setPurchases(data);
        }

        fetchPurchases();
    }, [])

    return (<>
        <Paper elevation={3} square>
            {purchases &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">MÃ ĐƠN HÀNG</StyledTableCell>
                                <StyledTableCell align="center">TRẠNG THÁI</StyledTableCell>
                                <StyledTableCell align="center">TỔNG SỐ SẢN PHẨM</StyledTableCell>
                                <StyledTableCell align="center">TỔNG SỐ TIỀN</StyledTableCell>
                                <StyledTableCell align="center">NGÀY TẠO</StyledTableCell>
                                <StyledTableCell align="center">THAO TÁC</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                purchases.content.map(purchase => (
                                    <StyledTableRow key={purchase.id}>
                                        <StyledTableCell align="center">
                                            {purchase.id}
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row" align="center">
                                            <Chip label={purchase.orderStatus.description} color={purchase.orderStatus.color} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {purchase.productCount}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {fCurrency(purchase.total)}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {new Date(purchase.createDate).toLocaleString()}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Link to={`/purchase/${purchase.id}`} color="inherit" underline="hover" component={RouterLink}>
                                                <Typography variant="subtitle1">
                                                    Chi tiết
                                                </Typography>
                                            </Link>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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