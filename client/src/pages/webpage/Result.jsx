import { useState, useEffect } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";

import ArticleCard from "../../components/webpage/ArticleCard";
import axios from "axios";

const MainBanner = styled.section`
    background: center no-repeat url("/images/waterfall.jpg");
    height: ${(({ height }) => height)};
    position: relative;
    background-size: cover;

    ::before {
        content: "";
        position: absolute;
        background-color: rgba(0, 0, 0, .3);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
    }
`

const Result = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const [allArticle, setAllArticle] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API}/article?${category ? `category=${category}` : ""}${search ? `search=${search}` : ""}`)
            .then(resp => setAllArticle(resp.data.data))
            .catch(console.log)
    }, [category, search])

    return (
        <Box component="main">
            <MainBanner height="40vh" className="flex items-center justify-center">
                <Box className="text-center text-light relative z-10 px-3">
                    <Typography align="center" className="text-4xl" component="h2" color="light.main">
                        {
                            category ? `All of "${category}"` :
                                search ? `Result for "${search}"` :
                                    "All Article"
                        }
                    </Typography>
                </Box>
            </MainBanner>

            <Box component="section" className="flex justify-center items-center" style={{ minHeight: "416px" }}>
                <Container className="my-12 m-auto">
                    {
                        allArticle.length
                            ?
                            <Grid container spacing={3}>
                                {
                                    allArticle.map((article, i) => {
                                        return (
                                            <Grid key={i} item xs={12} sm={6} md={4}>
                                                <ArticleCard article={article} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            :
                        <Typography className="text-xl" align="center">
                            "No Article For This Result"
                        </Typography>
                    }
                </Container>
            </Box>
        </Box>
    )
}

export default Result