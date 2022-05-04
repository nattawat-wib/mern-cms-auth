import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import styled from "styled-components";

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

const ArticleDetail = () => {
    return (
        <main>
            {/* <div style={{ height: "64px", backgroundColor: "#343a40" }}></div> */}
            <MainBanner height="40vh" />
            <article>
                <Container className="p-5">
                    <Typography color="text.light"> Home / Interview / article name </Typography>
                    <Typography color="text.light"> 20 มกราคม 2565 </Typography>
                    <p className="mt-5">
                        2560 เป็นปีพิเศษของ เป็นเอก รัตนเรือง
                        วาระแรก เขาทำหนังมาครบ 20 ปี นับจากการเปิดตัวหนังเรื่องแรก ฝัน บ้า คาราโอเกะ
                        วาระที่สอง เขาเปิดตัวหนังเรื่องที่ 10 ไม่มีสมุยสำหรับเธอ หรือ Samui Song ในเทศกาลหนังทั่วโลก ก่อนจะวนมาเข้าฉายในเมืองไทยวันที่ 1 ก.พ. 2561
                        วาระที่สาม เขามาทำโปรเจกต์เล็กๆ สนุกๆ กับ The Cloud ด้วยการชวนคนที่เขาสนใจมานั่งคุย แล้วเรียบเรียงกลายเป็นคอลัมน์นี้
                        รายชื่อของบุคคลในวาระที่ 3 นั้นยาวเป็นหางว่าว แต่เวลาว่างของเขากลับสั้นอย่างน่าตกใจ
                        ในช่วงเกือบ 2 เดือนที่เรานัดหมายกัน ตารางนัดหมายของเขาเต็มไปด้วยคิวเดินทาง ทั้งไปร่วมเทศกาลหนัง ไปต่างประเทศ และไปปฏิบัติธรรม เวลาว่างของเขามีแค่ 2 วัน
                        “ถ้าเป็นช่วงก่อนหน้านี้เนี่ย นอนอยู่บ้านทั้งเดือน” ผู้กำกับวัย 55 ปีบอกพร้อมเสียงหัวเราะ
                        คนแรกที่ ต้อม-เป็นเอก รัตนเรือง อยากคุยด้วยคือ โต้ง-บรรจง ปิสัญธนะกูล ผู้กำกับหนังพันล้าน ซึ่งได้ชื่อว่า ทำหนังดีได้ป๊อปที่สุดในประเทศไทย
                        ต้อมและโต้งทำหนังกันมาคนละหลายเรื่อง และพวกเขาเหมือนกันหลายเรื่อง
                        พวกเขาเริ่มต้นจากการเป็นผู้กำกับหนังโฆษณา กลายมาเป็นคนทำหนังที่โด่งดังระดับโลก ใช้ชีวิตเดินสายตามเทศกาลหนังเหมือนกัน ทำหนังคุณภาพเหมือนกัน และเป็นแรงบันดาลใจให้คนทำหนังเหมือนกัน
                        ต่างกันบ้างก็แค่…
                    </p>
                </Container>
            </article>
        </main>
    )
}

export default ArticleDetail