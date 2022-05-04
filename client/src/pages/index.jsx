import { useState } from "react";
import styled from "styled-components";
import { Box, Typography, Grid, Container, Tab, Tabs } from "@mui/material";
import ArticleCard from "../components/ArticleCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

const MainTitle = styled(Typography)`
    font-size: 2rem;
    text-align: center;
    display: block;
    color: #023047;
    margin: 1.5rem auto;
`

const TabPanel = ({ value, index, children }) => {
    return (
        <Box className="py-8"
            hidden={value !== index}
        >
            {children}
        </Box>
    )
}

const Index = () => {
    // const [slick, setSlick] = useState({ main: "", nav: "" });
    const [mainSlick, setMainSlick] = useState();
    const [navSlick, setNavSlick] = useState();
    const [tabValue, setTabValue] = useState(0);

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
                    Array(5).fill(0).map((n, i) => {
                        return (
                            <MainBanner key={i} className="flex justify-center items-center text-right" height={"70vh"}>
                                <Box className="text-center text-light relative z-10 px-3">
                                    <Typography variant="h3" components="h2"> {i} The Cloud Coffee Club Issue 2 </Typography>
                                    <p> นิตยสารกาแฟฉบับที่สอง มาในธีม ‘การหมัก’ พร้อมสุ่มแถมเมล็ดกาแฟชุดใหม่ หมักโดยโปรเซสเซอร์นักหมักมือฉมัง </p>
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
                    Array(5).fill(0).map((n, i) => {
                        return (
                            <MainBanner key={i} className="flex justify-center items-center" height={"30vh"}>
                                <Box className="text-center text-light relative z-10 px-3">
                                    <p> {i}  นิตยสารกาแฟฉบับที่สอง มาในธีม ‘การหมัก’ พร้อมสุ่มแถมเมล็ดกาแฟชุดใหม่ หมักโดยโปรเซสเซอร์นักหมักมือฉมัง </p>
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
                        <div style={{ paddingTop: "30%", background: 'center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp")' }} >

                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ paddingTop: "30%", background: 'center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp")' }} >

                        </div>
                    </Grid>
                </Grid>
                <div className="p-2 w-full">
                    <div style={{ paddingTop: "20%", background: 'center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp")', backgroundSize: "cover   " }} >

                    </div>
                </div>
            </section>

            <section>
                <Container maxwith="lg">
                    <MainTitle component="span"> Lastest </MainTitle>
                    <Tabs value={tabValue} onChange={handleTabChange} scrollButtons="auto" variant="scrollable">
                        {
                            category_list.map((category, i) => {
                                return (<Tab key={i} label={category} ></Tab>)
                            })
                        }
                    </Tabs>
                    {
                        category_list.map((category, i) => {
                            return (
                                <TabPanel value={tabValue} index={i}>
                                    <Grid container spacing={3}>
                                        {
                                            Array(10).fill(0).map((card, i) => {
                                                return (
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <ArticleCard />
                                                    </Grid>)
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
