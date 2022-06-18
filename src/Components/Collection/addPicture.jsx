import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import pictureService from '../Services/pictureService';
import { toast } from 'react-toastify';
import Admin from '../Auth/authAdmin'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const AddPicture = () => {
    let navigate = useNavigate();
    const [Title , setTitle] = React.useState([]);
    const [Price , setPrice] = React.useState([]);
    const [image , setImage] = React.useState([]);
    
    const areAllFieldsFilled = (Title != "") && (Price != "") && (image != "")
    const titleHandler=(e)=>{
        setTitle(e.target.value);
    }
    const priceHandler=(e)=>{
        setPrice(e.target.value);
    }

    const handleUpload = (e)=>{

        let image_item = image.files[0];
        let fd = new FormData()
        fd.append('image',image_item)
        fd.append('Title',Title)
        fd.append('Price',Price)

        pictureService.addPicture(fd)
        .then((res)=>{

            navigate("/PhotoCollection/:page", { replace: true });
        })
        .catch((err)=>{
            
            toast.error(err.response.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
        });
    }
    return ( 
        <Admin>
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} > 
                <h5>Add New Picture</h5>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <form >
                <TextField id="outlined-input"
                label="Title"
                type="Title"
                value={Title}
                autoComplete="current-Title" fullWidth margin="normal"  onChange={titleHandler}/>

                <TextField id="outlined-input"
                label="Price"
                type="number"
                min = {0}
                value={Price}
                autoComplete="current-Price" fullWidth margin="normal"  onChange={priceHandler}/>

                <FilePond
        onupdatefiles={fileItems => {
                    setImage({
                files: fileItems.map(fileItem => fileItem.file)
            })}}
        name="image"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
                </form>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
                <Button variant="contained" color="primary"  disabled={!areAllFieldsFilled} onClick={handleUpload}>Add Photo</Button>
            </Grid>
        </Grid>
        </>
        </Admin>
     );
}
 
export default AddPicture;