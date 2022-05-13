import { Typography, Box, Container, Grid, List, ListItem } from "@mui/material"
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
    return (
        <footer className="mt-16" style={{ backgroundColor: "#212529" }}>
            <Grid container>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/ice-mountain.jpg" />
                    </figure>
                </Grid>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/sea.jpg" />
                    </figure>
                </Grid>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/desert.jpg" />
                    </figure>
                </Grid>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/mountain.jpg" />
                    </figure>
                </Grid>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/tree.jpg" />
                    </figure>
                </Grid>
                <Grid item xs={2}>
                    <figure className="relative" style={{ paddingTop: "80%"}}> 
                        <img className="fit-img" src="/images/footer/island.jpg" />
                    </figure>
                </Grid>
            </Grid>
            <Container className="p-4" sx={{ color: "light.main" }}>
                <Grid container className="items-center justify-between my-4">
                    <Grid item xs={12} sm={6} md={4}>
                        <img src="/images/logo.png" alt="" width="150px" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ul className="flex justify-end">
                            <Link to="/article"> Art </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/article/Business"> Business </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/article/Interview"> Interview </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/article/Travel"> Travel </Link>
                        </ul>
                        <ul className="flex justify-end mt-4">
                            <Link to="#" className="mx-3"> <FacebookIcon /> </Link>
                            <Link to="#" className="mx-3"> <YouTubeIcon /> </Link>
                            <Link to="#" className="mx-3"> <TwitterIcon /> </Link>
                            <Link to="#" className="ml-3"> <PinterestIcon /> </Link>
                        </ul>
                    </Grid>
                </Grid>
                <hr className="my-5" style={{ borderColor: "rgba(255,255,255,.5)", borderWidth: "1px" }} />
                <Typography align="center" component="small" className="block text-sm">
                    COPYRIGHT © 2022 CLOUD AND GROUND CO., LTD. ALL RIGHTS RESERVED.
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer