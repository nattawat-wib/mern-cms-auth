import { Table, TableHead, TableBody, TableRow, TableCell, Button, Container, Typography } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";

const rowList = [
    { id: "1", firstname: "tset", lastname: "er", age: 19 },
    { id: "2", firstname: "nutella", lastname: "tester", age: 24 },
    { id: "3", firstname: "tset", lastname: "er", age: 24 },
    { id: "4", firstname: "tset", lastname: "er", age: 24 },
]

const ArticleAll = () => {
    return (
        <>
            <Container maxWidth="lg">
                <Typography> All Article </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            <TableCell align="right"> Title </TableCell>
                            <TableCell align="right"> Post Date </TableCell>
                            <TableCell align="right"> Category </TableCell>
                            <TableCell align="right" sx={{ width: 300 }}> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rowList.map((row, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell> {row.id} </TableCell>
                                        <TableCell align="right"> {row.firstname} </TableCell>
                                        <TableCell align="right"> {row.lastname} </TableCell>
                                        <TableCell align="right"> {row.age} </TableCell>
                                        <TableCell align="right">
                                            <Button startIcon={<ModeEditOutlineIcon />} variant="contained" className="bg-secondary" color="secondary" size="small" sx={{mr: 2}}> Edit </Button>
                                            <Button startIcon={<DeleteIcon />} variant="contained" className="bg-error" color="error" size="small"> Delete </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}

export default ArticleAll;