import { useState, useEffect } from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";

import ArticleCard from "../../components/webpage/ArticleCard";

const MainBanner = styled.section`
    background: center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp");
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
    const [ searchParams ] = useSearchParams();
    const search = searchParams.get("search");

    // console.log("category", category);
    // console.log("searchParams", searchParams.get("test"));

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

            <Box component="section">
                <Container className="my-12">
                    <Grid container spacing={3}>
                        {
                            Array(10).fill(0).map((card, i) => {
                                return (
                                    <Grid key={i} item xs={12} sm={6} md={4}>
                                        <ArticleCard />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default Result