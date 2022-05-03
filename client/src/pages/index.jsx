import { useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MainBanner = styled.section`
    background: center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp");
    height: 50vh;
    min-height: 500px;
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

const Index = () => {
    // const [slick, setSlick] = useState({ main: "", nav: "" });
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    console.log(nav1, nav2);


    return (
        <main>
            {/* <MainBanner className="flex justify-center items-center">
                <Box className="text-center text-light relative z-10 px-3">
                    <Typography variant="h3" components="h2"> The Cloud Coffee Club Issue 2 </Typography>
                    <p> นิตยสารกาแฟฉบับที่สอง มาในธีม ‘การหมัก’ พร้อมสุ่มแถมเมล็ดกาแฟชุดใหม่ หมักโดยโปรเซสเซอร์นักหมักมือฉมัง </p>
                    <small className="mt-3 block"> เรื่องและภาพ The Cloud </small>
                </Box>
            </MainBanner> */}
            <Slider
                {...settings}
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
            // ref={slk => setSlick({ ...slick, main: slk })}
            >
                {
                    [1,2,3,4,5].map((n, i) => {
                        return (
                            <MainBanner className="flex justify-center items-center">
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
                asNavFor={nav1}
                slidesToShow={3}
                centerPadding="50px"
                centerMode={true}
                focusOnSelect={true}
                ref={(slider2) => setNav2(slider2)}
            // ref={slk => setSlick({ ...slick, nav: slk })}
            >
                {
                    [1,2,3,4,5].map((n, i) => {
                        return (
                            <MainBanner className="flex justify-center items-center">
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
        </main>
    )
}

export default Index