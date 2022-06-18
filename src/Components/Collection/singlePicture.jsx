import {Card, CardActions, CardContent, CardMedia, Fab, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import pictureService from '../Services/pictureService';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import userService from '../Services/userService';

const locate_url ="https://ailurophile-gallery-backend.herokuapp.com";

const SinglePicture = (props) => {

  const {picture,onDelete} = props

  let navigate = useNavigate();

  const[totalamount, setAmount]= React.useState(100);
  let price = totalamount*100;

  const handleUpdateClick = ()=>{
        navigate("/PhotoCollection/update/"+picture._id, { replace: true });
    }

  const Ontoken=token=>{
  const data={token,totalamount}
  axios.post('https://ailurophile-gallery-backend.herokuapp.com/api/picture/payment/',data)
  .then(res=>{
     toast.success(res.data, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
  }
  )
  .catch(err =>{console.log(err)})
}
    return ( 
      
        <Grid item xs={12}md={4}lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img"
                  image={`${locate_url}/${picture.imagePath}`}/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                        {picture.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                        Price: {picture.Price} PKR
                </Typography>
              </CardContent>
            <CardActions>
              {
                !userService.getLoggedInUser() &&
                <>
                <Typography>To Buy, Please <Link to='/ailurophile-gallery/login'>Login</Link></Typography>
                </>
              }
                { userService.isAdmin() &&
                  <>
                  <Fab size="small"  aria-label="edit" onClick={handleUpdateClick}>
                            <EditIcon />
                  </Fab>
                  <Fab size="small"  aria-label="delete" onClick={(e)=>{
                      pictureService.deletePicture(picture._id)
                      .then((data)=>{
                        console.log(data);
                        onDelete();
                      }).catch((err)=>{
                        console.log(err);
                      })
                  }} >
                            <DeleteIcon />
                  </Fab>
                  </>}
                  { userService.getLoggedInUser() &&
                      <StripeCheckout
                      stripeKey ="pk_test_51L7MuHJF4hqINAnaNlJ9g1cElULZ5JXTDm29bNIP0HFNN2OX8mMai7raUVBtRW6DvV5ZV10c1VYju1aIQ7Ii6Htn00Qbza2eKU"
                      token={Ontoken}
                      amount={price}
                      description={`Total Pay ${totalamount}`}
                      shippingAddress
                      billingAddress
                      />
                      }
              </CardActions>
            </Card>
        </Grid>

     );
}
 
export default SinglePicture;