import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography, Grid, Container, Tab, Tabs } from "@mui/material";
import ArticleCard from "../../components/webpage/ArticleCard";
import axios from "axios";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

const MainTitle = styled(Typography)`
    font-size: 2rem;
    text-align: center;
    display: block;
    // color: #023047;
    margin: 1.5rem auto;
`

const TabsCenter = styled(Tabs)`
    & .MuiTabs-flexContainer {
        justify-content: center
    }
`


const TabPanel = ({ value, index, children }) => {
    return (
        <Box className="py-8" hidden={value !== index}>
            {children}
        </Box>
    )
}

const Index = () => {
    const [mainSlick, setMainSlick] = useState();
    const [navSlick, setNavSlick] = useState();
    const [tabValue, setTabValue] = useState(0);
    const [allArticle, setAllArticle] = useState([]);
    const [randomArticle, setRandomArticle] = useState([]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        speed: 1000,
    };

    const responsiveNavSlick = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                infinite: true,
                centerMode: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                centerMode: true
            }
        }
    ];

    const randomBgStyle = (p, bg) => {
        return({
            paddingTop: `${p}%`, 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${bg ? `${process.env.REACT_APP_BASE_API}/upload/${bg.banner}` : "http://via.placeholder.com/500"}")`,
            backgroundSize: "cover"
        })
    }
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API}/api/article`)
            .then(resp => setAllArticle(resp.data.data))
            .catch(console.log)

        axios.get(`${process.env.REACT_APP_BASE_API}/api/article/random`)
            .then(resp => {                
                setRandomArticle(resp.data.data)
            })
            .catch(console.log)            
    }, [])

    const handleTabChange = (e, newValue) => setTabValue(newValue);
    const category_list = ["All", "Art", "Business", "Interview", "Travel"];

    return (
        <main className="overflow-hidden">
            <Slider
                {...settings}
                asNavFor={navSlick}
                ref={setMainSlick}
            >
                {
                    allArticle.map((article, i) => {
                        return (
                            <MainBanner key={i} className="flex justify-center items-center text-right" bg={article.banner} height={"70vh"}>
                                <Box className="text-center text-light relative z-10 px-3" style={{ maxWidth: "600px" }}>
                                    <Link to={`/article/${article.category}/${article.url}`}>
                                        <Typography
                                            className="line-clamp-1"
                                            variant="h3"
                                            components="h2"
                                        >
                                            {article.title}
                                        </Typography>
                                    </Link>
                                    <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: article.desc }} />
                                    <small className="mt-3 block"> เรื่องและภาพ The Cloud </small>
                                </Box>
                            </MainBanner>
                        )
                    })
                }
            </Slider>
            <Slider
                {...settings}
                asNavFor={mainSlick}
                slidesToShow={3}
                centerMode={true}
                responsive={responsiveNavSlick}
                ref={setNavSlick}
            // ref={slk => setSlick({ ...slick, nav: slk })}
            >
                {
                    allArticle.map((article, i) => {
                        return (
                            <MainBanner key={i} className="flex justify-center items-center" bg={article.banner} height={"30vh"}>
                                <Box className="text-center text-light relative z-10 px-3">
                                    <p className="line-clamp-2"> {article.title} </p>
                                    <small className="mt-3 block"> เรื่องและภาพ The Cloud </small>
                                </Box>
                            </MainBanner>
                        )
                    })
                }
            </Slider>

            <section>
                <Grid container spacing={1} className="p-2 pb-0">
                    <Grid item xs={6}>
                        <div style={randomBgStyle(30, randomArticle[0])} >
                
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={randomBgStyle(30, randomArticle[1])} >

                        </div>
                    </Grid>
                </Grid>
                <div className="p-2 w-full">
                    <div style={randomBgStyle(20, randomArticle[2])} >

                    </div>
                </div>
            </section>

            <section>
                <Container maxwith="lg">
                    <MainTitle component="span"> Lastest </MainTitle>
                    <TabsCenter value={tabValue} onChange={handleTabChange} scrollButtons="auto" variant="scrollable">
                        {
                            category_list.map((category, i) => {
                                return (<Tab key={i} label={category} ></Tab>)
                            })
                        }
                    </TabsCenter>
                    {
                        category_list.map((category, i) => {
                            return (
                                <TabPanel value={tabValue} index={i} key={i}>
                                    <Grid container spacing={3}>
                                        {
                                            allArticle.map((article, i) => {
                                                return category === "All" || article.category === category ?
                                                 (
                                                    <Grid key={i} item xs={12} sm={6} md={4}>
                                                        <ArticleCard article={article} />
                                                    </Grid>
                                                ) : ""
                                            })
                                        }
                                    </Grid>
                                </TabPanel>
                            )
                        })
                    }
                </Container>
            </section>
        </main>
    )
}

export default Index
