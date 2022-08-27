import React, { ReactElement, FC, useState } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import Asyncautocomplete from "../components/Asyncautocomplete";
import GoogleMap from "../components/GoogleMap";
import { AirportType } from '../utils/types';
import { Airport } from '../utils/types';
import { useSelector } from 'react-redux';
import  { getDistanceFromLatLonInNmi } from '../utils/helper';

const Home: FC<any> = (): ReactElement => {

  const startingPoint: Airport = useSelector((state: any) => state.start);
  const destination: Airport = useSelector((state: any) => state.destination);
  const [distance, setDistance] = useState(0);

  const displayDistance = () => {
    let d = getDistanceFromLatLonInNmi(startingPoint.lat, startingPoint.long, destination.lat, destination.long);
    setDistance(d);
  }

  return (
    <>
      <Grid container spacing={1} sx={{px: 1, mb: 1}}>
        <Grid item xs={12} md={4} sx={{mt: 1}}>
          <Asyncautocomplete type={AirportType.Start}/>
        </Grid>
        <Grid item xs={12} md={4} sx={{mt: 1}}>
          <Asyncautocomplete type={AirportType.Dest}/>
        </Grid>
        <Grid item xs={6} md={2} sx={{mt: 1}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Button variant='outlined' size='large' onClick={() => displayDistance()}>
              Calculate
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} md={2} sx={{ mt: 1, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ fontWeight: 'bold', fontSize: 24 }}>
            {distance.toFixed(4)} nmi
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{width: '100%', height: '100%', position: 'relative'}}>
        <GoogleMap />
      </Grid>
    </>
  );
};

export default Home;