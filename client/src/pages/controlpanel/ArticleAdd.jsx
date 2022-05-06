import { useState } from "react";
import { TextField, Select, MenuItem, Grid, Button } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
// import { InputLabel, FormControl } from "@mui/material";

const AddArticle = () => {
    const [form, setForm] = useState({});

    const handleFormChange = e => {
        if (e.target.type === "file") {
            if (!e.target.files[0].type.startsWith("image")) return toast.error("file upload is allow only image");

            setForm({ ...form, [e.target.name]: e.target.files[0] })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

        console.log(form);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setForm({});

        console.log(form);
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
                                <img className="fit-img" src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                            </figure>
                            <input accept="image/*" onChange={handleFormChange} name="thumbnail" hidden id="thumbnailImg" type="file" />
                            <Button startIcon={<FileUploadIcon />} className="mt-3 w-full" variant="outlined" component="label" htmlFor="thumbnailImg"> Upload Thumbnail </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="bannerImg" style={{ cursor: "pointer" }}>
                            <figure className="relative" style={{ paddingTop: "50%" }}>
                                <img className="fit-img" src="https://readthecloud.co/wp-content/uploads/2022/04/the-cloud-coffee-club-2-banner.jpg.webp" />
                            </figure>
                            <input accept="image/*" onChange={handleFormChange} name="banner" hidden id="bannerImg" type="file" />
                            <Button startIcon={<FileUploadIcon />} className="mt-3 w-full" variant="outlined" component="label" htmlFor="bannerImg"> Upload Banner </Button>
                        </label>
                    </Grid>
                </Grid>

                <TextField value={form.title || ""} onChange={handleFormChange} name="title" variant="outlined" label="Title" size="small" fullWidth className="mb-8" />


                <CKEditor
                    editor={ClassicEditor}
                    data="Description Here <br/><br/><br/><br/><br/>"
                    value={form.ck || ""} onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        setForm({ ...form, ck: data })
                    }}
                />

                <Select value={form.category || ""} onChange={handleFormChange} color="primary" name="category" label="Category" size="small" fullWidth className="my-8" >
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