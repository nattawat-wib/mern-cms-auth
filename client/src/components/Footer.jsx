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
                <Grid item xs={6} sm={3}>
                    <img src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <img src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <img src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <img src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                </Grid>
            </Grid>
            <Container className="p-4" sx={{ color: "light.main" }}>
                <Grid container className="items-center justify-between my-4">
                    <Grid item xs={12} sm={6} md={4}>
                        <h1> LOGO </h1>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ul className="flex justify-end">
                            <Link to="/"> Art </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/"> Business </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/"> Interview </Link>
                            <span className="mx-4"> | </span>
                            <Link to="/"> Travel </Link>
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