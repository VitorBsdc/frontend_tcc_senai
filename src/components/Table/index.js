import PropTypes from 'prop-types';
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useEffect, useState } from 'react';
import TableSearchBar from './TableSearchBar';
import OptionsDialog from "./OptionsDialog";
import UserInfoContext from '../../utils/Contexts/UserInfoContext';
import Service from '../../services';

const srv = new Service();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: "#7a7a7a",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(idUsuario, name, cpf, email, accountType, birthdayDate) {
    return { idUsuario, name, cpf, email, accountType, birthdayDate };
}

export default function CustomTable({ rowsNumber }) {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [rows, setRows] = useState([]);
    var filterCount = 0

    useEffect(() => {
        axios.get(`${srv.getBaseURL()}/user-list`)
        .then((response) => {
            for(const x in response.data.users){
                setRows((arr) => [
                    ...arr,
                    createData(
                    response.data.users[x].idUsuario,
                    response.data.users[x].nome,
                    response.data.users[x].CPF,
                    response.data.users[x].email,
                    response.data.users[x].ADM ? "Administrador":"Comum",
                    response.data.users[x].DATANASC.split("T")[0])
                ])
            }
        })
    }, [])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsNumber - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer elevation={6} component={Paper}>

            <Table sx={{ minWidth: 580 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={8} style={{ backgroundColor: "#E8EAED", padding: 2 }}>
                            <TableSearchBar setSearchTerm={setSearchTerm} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>NOME</StyledTableCell>
                        <StyledTableCell align="center">CPF</StyledTableCell>
                        <StyledTableCell align="center">EMAIL</StyledTableCell>
                        <StyledTableCell align="center">CONTA</StyledTableCell>
                        <StyledTableCell align="center"> </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (searchTerm.trim() === "" ?
                            (rowsNumber > 0 ? rows.slice(page * rowsNumber, page * rowsNumber + rowsNumber) : rows)
                            :
                            rows.filter((row) => {
                                if (row.name.toLowerCase().startsWith(searchTerm.trimStart().trimEnd().toLowerCase())) {
                                    filterCount += 1;
                                    return row;
                                }
                            }).slice(page * rowsNumber, page * rowsNumber + rowsNumber))
                            .map((row) => (
                                <StyledTableRow key={row.idUsuario}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.cpf}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.email}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.accountType}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <UserInfoContext.Provider value={row}>
                                            <OptionsDialog />
                                        </UserInfoContext.Provider>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 58 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            sx={{ display: "flex", justifyContent: "flex-start", minWidth: 300 }}
                            rowsPerPageOptions={[]}
                            colSpan={6}
                            count={filterCount > 0 ? filterCount : rows.length}
                            rowsPerPage={rowsNumber}
                            page={page}
                            labelDisplayedRows={
                                ({ from, to, count }) => {
                                    if (searchTerm !== "") {
                                        return (page + 1) + ' de ' + Math.max(0, Math.ceil(filterCount / rowsNumber))
                                    }
                                    return (page + 1) + ' de ' + Math.max(0, Math.ceil(count / rowsNumber))
                                }
                            }
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}