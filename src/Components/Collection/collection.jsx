import React from 'react';
import { useNavigate } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useParams} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@mui/material';

import SinglePicture from './singlePicture';
import pictureService from '../Services/pictureService';
import userService from '../Services/userService';

const Collection = (props) => {

    const params = useParams();
    let navigate = useNavigate();

    const [pictures,setPictures] = React.useState([]);
    const [totalRecords,setTotalRecords] = React.useState([]);

    const page = params.page ? params.page : 1;
    const getData = ()=>{
        pictureService.getPicture(page)
        .then((data)=>{
            setPictures(data.pictures);
            setTotalRecords(data.totalRecords);
        }).catch((err)=>{
            console.log(err);
        })
    };
    
    React.useEffect(getData, [page]);

    const handleAddClick = ()=>{
        navigate("/PhotoCollection/add", { replace: true });
    }
    return ( 
        <>
        <div className='container'> 
            {   userService.isAdmin() &&
                <>
            <Fab size="medium" color="primary" aria-label="add" onClick={handleAddClick}>
                    <AddIcon />
            </Fab>
            </>}
            <h4>
                Collection
            </h4>
            
            {pictures.length == 0 ? (<p>There is no pictures in collection</p>) : 
            (
            
            <Grid container spacing={3}>
                            {pictures.map((picture, index)=>(
                            <SinglePicture key={index} picture={picture} onDelete={getData}/>
                                        ))}
            </Grid>           
            )}

            <Grid align='center' sx={{ mt: 2.0 }}>
                <Pagination count={Math.ceil(totalRecords/8)} variant="outlined" size="small" onChange={(e,value)=>{
                    navigate("/PhotoCollection/"+value, { replace: true });
                }}/>Total Photos : {totalRecords}
            </Grid>
        </div>
        </>
     );
}
 
export default Collection;