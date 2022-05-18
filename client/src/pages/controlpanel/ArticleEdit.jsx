import { useState, useEffect, useContext } from "react";
import { IconButton, TextField, Select, MenuItem, Grid, Button, bottomNavigationClasses } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { mainContext } from "./../../App";

import CancelIcon from '@mui/icons-material/Cancel';

const CKCustom = styled(CKEditor)`
    background-color: #212121 !important;
    border: 5px solid yellow !important;
    margin: 500px !important;

    & .ck-editor__editable {
        background-color: #212121 !important;
        border: 5px solid yellow;
        margin: 100px;
        display: none;
    }
`

const AddArticle = () => {
    const [form, setForm] = useState({});
    const [tempImage, setTempImage] = useState({});
    const navigate = useNavigate();
    const {themeMode} = useContext(mainContext);

    const params = useParams();

    useEffect(() => {        
        axios.get(`${process.env.REACT_APP_BASE_API}/api/article/${params.articleUrl}`)
            .then(resp => {
                setForm(resp.data.data)
                setTempImage({
                    thumbnail: resp.data.data.thumbnail,
                    banner: resp.data.data.banner
                })
            })
    }, [])

    const handleFormChange = e => {
        console.log(form);
        
        if (e.target.type === "file") {
            if (!e.target.files[0].type.startsWith("image")) return toast.error("file upload is allow only image");
            tempImage[e.target.name] = null
            setForm({ ...form, [e.target.name]: e.target.files[0] })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in form) {
            formData.append(key, form[key]);
        }
        console.log("form", form);

        axios
            .patch(`${process.env.REACT_APP_BASE_API}/api/article/${params.articleUrl}`, formData, {withCredentials: true})
            .then(resp => {
                toast.success(resp.data.msg);
                setTimeout(() => { navigate("/cp/article") }, 1500)
            })
            .catch(resp => toast.error(resp.response.data.msg))
    }

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="mb-8"> Edit Article </h1>
                <Grid container spacing={2} className="mb-8">
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="thumbnailImg" style={{ cursor: "pointer" }}>
                            <figure className="relative" style={{ paddingTop: "50%" }}>
                                {/* {
                                    form.thumbnail.size ?
                                        <IconButton
                                            onClick={e => setForm({ ...form, thumbnail: "" })}
                                            color="error"
                                            className="absolute -top-4 -right-2 z-10"
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                        :
                                        ""
                                } */}
                                <img
                                    className="fit-img"
                                    src={
                                        tempImage.thumbnail ?
                                            `${process.env.REACT_APP_BASE_API}/upload/${tempImage.thumbnail}`
                                            :
                                            // form.thumbnail ?
                                            //     URL.createObjectURL(form.thumbnail)
                                            //     :
                                                "https://via.placeholder.com/500"
                                    }
                                />
                            </figure>
                            <input accept="image/*" onChange={handleFormChange} name="thumbnail" hidden id="thumbnailImg" type="file" />
                            <Button startIcon={<FileUploadIcon />} className="mt-3 w-full" variant="outlined" component="label" htmlFor="thumbnailImg"> Upload Thumbnail </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="bannerImg" style={{ cursor: "pointer" }}>
                            <figure className="relative" style={{ paddingTop: "50%" }}>
                                <img
                                    className="fit-img"
                                    src={
                                        tempImage.banner ?
                                            `${process.env.REACT_APP_BASE_API}/upload/${tempImage.banner}`
                                            :
                                            // form.banner ?
                                            //     URL.createObjectURL(form.banner)
                                            //     :
                                                "https://via.placeholder.com/500"
                                    }
                                />
                            </figure>
                            <input accept="image/*" onChange={handleFormChange} name="banner" hidden id="bannerImg" type="file" />
                            <Button startIcon={<FileUploadIcon />} className="mt-3 w-full" variant="outlined" component="label" htmlFor="bannerImg"> Upload Banner </Button>
                        </label>
                    </Grid>
                </Grid>
                
                <TextField value={form.title || ""} onChange={handleFormChange} name="title" variant="outlined" label="Title" size="small" fullWidth className="mb-8" />

                <div className={themeMode}>
                    <CKCustom                    
                        editor={ClassicEditor}
                        data={form.desc}
                        onChange={(e, editor) => setForm(prev => ({ ...prev, desc: editor.getData() })) }
                    />
                </div>

                <Select value={form.category || ""} onChange={handleFormChange} color="primary" name="category" label="Category" size="small" fullWidth className="my-8" >
                    <MenuItem value="Art"> Art </MenuItem>
                    <MenuItem value="Business"> Business </MenuItem>
                    <MenuItem value="Travel"> Travel </MenuItem>
                    <MenuItem value="Interview"> Interview </MenuItem>
                </Select>


                <TextField value={form.url || ""} onChange={handleFormChange} name="url" variant="outlined" label="URL" size="small" fullWidth className="mb-8" />
                <div className="text-right">
                    <Button type="submit" variant="contained" className="bg-primary"> Submit </Button>
                </div>
            </form>
        </>
    )
}

export default AddArticle