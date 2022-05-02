import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const MainBanner = styled.section`
    background: center no-repeat url("https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp");
    height: 100vh;
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
    return(
        <main>
            <MainBanner className="flex justify-center items-center">
                <Box className="text-center text-light relative z-10 px-3">
                    <Typography variant="h3" components="h2"> The Cloud Coffee Club Issue 2 </Typography>
                    <p> นิตยสารกาแฟฉบับที่สอง มาในธีม ‘การหมัก’ พร้อมสุ่มแถมเมล็ดกาแฟชุดใหม่ หมักโดยโปรเซสเซอร์นักหมักมือฉมัง </p>
                    <small className="mt-3 block"> เรื่องและภาพ The Cloud </small>
                </Box>
            </MainBanner>
        </main>
    )
}

export default Index