import { Profiler, useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const MainBanner = styled.section`
    background: center no-repeat url("${({ bg }) => bg ? `${process.env.REACT_APP_BASE_API}/upload/${bg}` : "https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp"}");
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

const ArticleDetail = () => {
    const { articleUrl } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API}/api/article/${articleUrl}`)
            .then(resp => setArticle(resp.data.data))
            .catch(console.log)
    }, [])

    return (
        <main>
            <MainBanner className="flex justify-center items-center" height="40vh" bg={article.banner}>
                <Box className="text-center text-light relative z-10 px-3" style={{ maxWidth: "600px" }}>
                    <Typography
                        className="line-clamp-1"
                        variant="h3"
                        components="h2"
                    >
                        {article.title}
                    </Typography>
                    <small className="mt-3 block"> {article.createdBy && `Post By : ${article.createdBy.username}`} </small>
                </Box>

            </MainBanner>
            <article>
                <Container className="p-5">
                    <Typography className="line-clamp-1" color="text.light"> Home / {article.category} / {article.title} </Typography>
                    <Typography color="text.light"> Created at : {article.createdAtDateTime} </Typography>
                    <Typography color="text.light"> Post By : {article.createdBy ? article.createdBy.username : "-"} </Typography>
                    <p className="mt-5" dangerouslySetInnerHTML={{ __html: article.desc }} />
                </Container>
            </article>
        </main>
    )
}

export default ArticleDetail