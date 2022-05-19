import { useState, useContext } from "react";
import { TextField, Select, MenuItem, Grid, Button, InputLabel, IconButton, FormControl } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../../App";

import DeleteIcon from '@mui/icons-material/Delete';

const CKCustom = styled(CKEditor)`
    .ck-editor__editable {
        background-color: #212121 !important;
        border: 5px solid yellow;
        margin: 100px;
        display: none;
    }
`

const AddArticle = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { themeMode } = useContext(mainContext);

    const handleFormChange = e => {
        if (e.target.type === "file") {
            if (!e.target.files[0].type.startsWith("image")) return toast.error("file upload is allow only image");

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

        axios
            .post(`${process.env.REACT_APP_BASE_API}/api/article`, formData, { withCredentials: true })
            .then(resp => {
                setForm({});
                toast.success(resp.data.msg);
                setTimeout(() => { navigate("/cp/article") }, 1500)
            })
            .catch(resp => toast.error(resp.response.data.msg))
    }

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto" }}>
                <h1 className="mb-8"> Add Article</h1>
                <Grid container spacing={2} className="mb-8">
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="thumbnailImg" style={{ cursor: "pointer" }}>
                            <figure className="relative" style={{ paddingTop: "50%" }}>
                                <img className="fit-img" src={form.thumbnail ? URL.createObjectURL(form.thumbnail) : `https://via.placeholder.com/500/${themeMode === "dark" ? "333/969696" : ""}`} />
                            </figure>
                        </label>
                        <input accept="image/*" onChange={handleFormChange} name="thumbnail" hidden id="thumbnailImg" type="file" />
                        <div className="flex mt-3">
                            <Button startIcon={<FileUploadIcon />} className="w-full mr-2" variant="outlined" component="label" htmlFor="thumbnailImg"> Upload Thumbnail </Button>
                            {
                                form.thumbnail &&
                                <IconButton
                                    color="error"
                                    onClick={() => setForm(prev => ({ ...prev, thumbnail: null }))}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="bannerImg" style={{ cursor: "pointer" }}>
                            <figure className="relative" style={{ paddingTop: "50%" }}>
                                <img className="fit-img" src={form.banner ? URL.createObjectURL(form.banner) : `https://via.placeholder.com/500/${themeMode === "dark" ? "333/969696" : ""}`} />
                            </figure>
                            <input accept="image/*" onChange={handleFormChange} name="banner" hidden id="bannerImg" type="file" />
                        </label>
                        <div className="flex mt-3">
                            <Button startIcon={<FileUploadIcon />} className="w-full mr-2" variant="outlined" component="label" htmlFor="bannerImg"> Upload Banner </Button>
                            {
                                form.banner &&
                                <IconButton
                                    color="error"
                                    onClick={() => setForm(prev => ({ ...prev, banner: null }))}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </div>
                    </Grid>
                </Grid>

                <TextField value={form.title || ""} onChange={handleFormChange} name="title" variant="outlined" label="Title" size="small" fullWidth className="mb-8" />

                <div className={themeMode}>
                    <CKCustom
                        editor={ClassicEditor}
                        data={form.desc}
                        onChange={(e, editor) => setForm(prev => ({ ...prev, desc: editor.getData() }))}
                    />
                </div>
                
                <FormControl fullWidth className="my-8"> 
                    <InputLabel id="category-select"> Category </InputLabel>
                    <Select id="category-select" value={form.category || "Art"} onChange={handleFormChange} name="category" label="Category" size="small" fullWidth >
                        {/* <MenuItem disabled value=""> === Select Category === </MenuItem> */}
                        <MenuItem value="Art"> Art </MenuItem>
                        <MenuItem value="Business"> Business </MenuItem>
                        <MenuItem value="Travel"> Travel </MenuItem>
                        <MenuItem value="Interview"> Interview </MenuItem>
                    </Select>
                </FormControl>

                <TextField value={form.url || ""} onChange={handleFormChange} name="url" variant="outlined" label="URL" size="small" fullWidth className="mb-8" />
                <div className="text-right">
                    <Button type="submit" variant="contained" className="bg-primary"> Submit </Button>
                </div>
            </form>
        </>
    )
}

export default AddArticle