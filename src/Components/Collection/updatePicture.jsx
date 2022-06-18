import { Button, CardMedia, Grid, TextField } from '@mui/material';
import React from 'react';
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import pictureService from '../Services/pictureService';
import Admin from '../Auth/authAdmin';

const locate_url ="https://ailurophile-gallery-backend.herokuapp.com";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const UpdatePicture = (props) => {

    const params = useParams();
    let navigate = useNavigate();
    const picture_id = params.id;

    React.useEffect(()=>{
        pictureService.getSinglePicture(picture_id).then((data)=>{
            setTitle(data.Title);
            setPrice(data.Price);
            setimagePath(data.imagePath);
        })
    }, []);
    
    const [Title , setTitle] = React.useState([]);
    const [Price , setPrice] = React.useState([]);
    const [image , setImage] = React.useState(null);
    const [imagePath , setimagePath] = React.useState(null);
    const [isUpload,setUpload]=React.useState(false);
    
    const handleUpload = (e)=>{
        let fd = new FormData()


        isUpload?setUpload(true):setUpload(false)
        
        fd.append('Title',Title)
        fd.append('Price',Price)
        if(isUpload)
          fd.append('image',image.files[0])
      
        pictureService.updatePicture(picture_id,fd).then((res)=>{
            
            navigate("/PhotoCollection/:page", { replace: true });
        }).catch((err)=>{
            console.log(err);
        });
    }
    return ( 
        <Admin>
        <>
        <Grid container spacing={3}>
            <Grid item xs={12}> 
                <h5>Update Picture Details</h5>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <form encType="multipart/form-data">
                <TextField id="outlined-input"
                label="Title"
                type="Title"
                value={Title}
                autoComplete="current-Title" fullWidth margin="normal"  onChange={(e)=>{setTitle(e.target.value)}}/>

                <TextField id="outlined-input"
                label="Price"
                type="number"
                value={Price}
                autoComplete="current-Price" fullWidth margin="normal"  onChange={(e)=>{setPrice(e.target.value)}}/>

                <CardMedia component="img"
                  image={`${locate_url}/${imagePath}`}/>
                <FilePond
        onupdatefiles={fileItems => {
            setUpload(true)
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
                <Button variant="contained" color="primary" 
            //    disabled={!changes}
                onClick={handleUpload}>Update Details</Button>
            </Grid>
        </Grid>
        </>
        </Admin>
     );
}
 
export default UpdatePicture;