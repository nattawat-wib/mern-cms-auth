import { Paper, Typography, Button } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom"

const CardContent = styled(Paper)`
    box-shadow: 0 0 24px 0 rgba(0,0,0,.16);
    margin: -60px auto 0 auto;
    position: relative;
    z-index: 2;
    width: 90%;
`

const ArticleCard = () => {
    return (
        <article>
            <Link to="/article/test-cate/test-url">
                <figure className="relative rounded-md overflow-hidden" style={{ paddingTop: "75%" }}>
                    <img className="fit-img" src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" alt="" />
                </figure>
            </Link>
            <CardContent className="p-2">
                <div className="flex justify-between items-center">
                    <Typography component="small" color="text.light" className="text-sm"> Business </Typography>
                    <Button component={Link} to="/article/test-cate/test-url" size="small" className="text-sm"> read more... </Button>
                </div>
                <Typography className="mb-3 line-clamp-4">
                    การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร
                    การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร
                    การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร การขยาย Chic Republic ของทายาทรุ่นสอง ด้วยเป้าหมายที่จะเป็นธุรกิจเฟอร์นิเจอร์ครบวงจร
                </Typography>
                <Typography align="center" color="text.light" className="text-xs truncate">
                    เรื่อง รตา มนตรีวัตภาพ เธียรสิน สุวรรณรังสิกุล เรื่อง รตา มนตรีวัตภาพ เธียรสิน สุวรรณรังสิกุล
                </Typography>
            </CardContent>
        </article>
    )
}

export default ArticleCard