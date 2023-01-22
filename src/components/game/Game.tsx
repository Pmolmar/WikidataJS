import React from 'react';
import { Button, Grid, Input, Paper } from '@mui/material';
import { Datos } from '../../types/datos';

function GameComponent(props: { datos: Datos; }) {
    return (
        <Grid item xs={3}>
            <Paper key={props.datos.game} elevation={3}>
                {props.datos.logo && <img width={200} src={props.datos.logo}></img>}
                Nombre:{props.datos.game_label}
                Nombre:{props.datos.genres}
                Nombre:{props.datos.platforms}
                Nombre:{props.datos.firstPublication}
            </Paper>
        </Grid>
    )
}

export default GameComponent