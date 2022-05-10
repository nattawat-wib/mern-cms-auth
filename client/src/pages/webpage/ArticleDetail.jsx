import { Profiler, useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const MainBanner = styled.section`
    background: center no-repeat url("${({bg}) => bg ? `${process.env.REACT_APP_BASE_API}/upload/${bg}` : "https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp"}");
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

    // console.log(articleUrl);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API}/article/${articleUrl}`)
            .then(resp => setArticle(resp.data.data))
            .catch(console.log)
    }, [])

    return (
        <main>
            { console.log("article", article) }
            {/* <div style={{ height: "64px", backgroundColor: "#343a40" }}></div> */}
            <MainBanner height="40vh" bg={article.banner} />
            <article>
                <Container className="p-5">
                    <Typography color="text.light"> Home / {article.category} / {article.title} </Typography>
                    <Typography color="text.light"> 20 มกราคม 2565 </Typography>
                    <p className="mt-5" dangerouslySetInnerHTML={{__html: article.desc}} />
                </Container>
            </article>
        </main>
    )
}

export default ArticleDetail