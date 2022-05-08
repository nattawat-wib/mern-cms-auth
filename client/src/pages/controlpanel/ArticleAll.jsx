import { Table, TableHead, TableBody, TableRow, TableCell, Button, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ArticleAll = () => {
    const [articleList, setArticleList] = useState([]);
    const [deleteArticleUrl, setDeleteArticleUrl] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        getArticle()
    }, [])

    const getArticle = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/article`)
            .then(resp => setArticleList(resp.data.data))
            .catch(console.log)
    }

    const handleDeleteArticle = () => {
        axios.delete(`${process.env.REACT_APP_BASE_API}/article/${deleteArticleUrl.trim()}`)
            .then(resp => {
                getArticle()
                setIsDialogOpen(false)
                setDeleteArticleUrl("")
                toast.success(resp.data.msg)
            })
            .catch(resp => toast.error(resp.response.data.msg));
    }

    return (
        <>
            <Container maxWidth="lg">
                <Typography> All Article </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> # </TableCell>
                            <TableCell align="right"> Title </TableCell>
                            <TableCell align="right"> Category </TableCell>
                            <TableCell align="right"> Post Date </TableCell>
                            <TableCell align="right" sx={{ width: 300 }}> Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            articleList.map((article, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell> {i + 1} </TableCell>
                                        <TableCell align="right"> {article.title} </TableCell>
                                        <TableCell align="right"> {article.category} </TableCell>
                                        <TableCell align="right"> {article.createdAtDateTime} </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                startIcon={<ModeEditOutlineIcon />}
                                                variant="contained"
                                                className="bg-secondary"
                                                color="secondary"
                                                size="small"
                                                sx={{ mr: 2 }}
                                                component={Link}
                                                to={`/cp/article/edit/${article.url}`}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    setIsDialogOpen(true)
                                                    setDeleteArticleUrl(article.url)
                                                }}
                                                variant="contained"
                                                className="bg-error"
                                                color="error"
                                                size="small"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Container>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>
                    Delete this article ?
                </DialogTitle>
                <DialogContent>
                    Are you sure ?
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className="bg-primary" color="primary" onClick={() => setIsDialogOpen(false)}> CANCEL </Button>
                    <Button variant="contained" className="bg-error" color="error" onClick={handleDeleteArticle}>  DELETE  </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ArticleAll;