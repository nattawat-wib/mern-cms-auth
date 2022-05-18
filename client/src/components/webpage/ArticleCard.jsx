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

const ArticleCard = ({ article }) => {    
    return (
        <article>
            <Link to={`/article/test-cate/${article.url}`}>
                <figure className="relative rounded-md overflow-hidden" style={{ paddingTop: "75%" }}>
                    <img 
                        className="fit-img" 
                        src={article.thumbnail ? `${process.env.REACT_APP_BASE_API}/upload/${article.thumbnail}` : "https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp"} 
                        alt="" />
                </figure>
            </Link>
            <CardContent className="p-2">
                <div className="flex justify-between items-center">
                    <Typography component="small" color="text.light" className="text-sm"> {article.category} </Typography>
                    <Button component={Link} to={`/article/test-cate/${article.url}`} size="small" className="text-sm"> read more... </Button>
                </div>
                <Typography className="line-clamp-1" component="span"> {article.title} </Typography>

                <Typography className="mb-3 line-clamp-4 text-sm font-light" dangerouslySetInnerHTML={{__html: article.desc}} />

                <Typography align="center" color="text.light" className="text-xs truncate flex justify-between">
                    <span>
                        Created at : {article.createdAtDateTime.split(" ")[0]}
                    </span> 
                    <span>
                        {article.createdBy && `Post By : ${article.createdBy.username}`}
                    </span>
                </Typography>
            </CardContent>
        </article>
    )
}

export default ArticleCard