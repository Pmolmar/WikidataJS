import React from 'react';
import { Card, CardContent, CardHeader, Grid, Link, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Datos } from '../../types/datos';

function GameComponent(props: { datos: Datos; }) {
    return (
        <Grid item xs={3} key={props.datos.game}>
            <Paper elevation={3}>
                <Card style={{ minHeight: '30rem', maxHeight: '30rem', overflowY: 'auto' }}>
                    <CardHeader
                        style={{ height: '4rem' }}
                        title={
                            <Link style={{ fontSize: '1.3rem'}} rel="noopener noreferrer" target="_blank" href={props.datos.game}>{props.datos.game_label}</Link> //similarly use `a` if not using react-router
                        }
                        subheader={ props.datos.firstPublication.split("-")[0]}
                    />

                    <div style={{ height: "8rem", textAlign: 'center', padding: '2%' }}>
                        <img
                            style={props.datos.logo ?  { maxHeight: "8rem",width: "-webkit-fill-available" } : { width: '40%', borderRadius:100, border:"0.5rem solid black" }}
                            src={props.datos.logo ? props.datos.logo : 'desconocido.png'}
                            alt={`${props.datos.game_label} logo`}
                        />
                    </div>

                    <CardContent style={{ padding: 0 }}>
                        <List style={{ minHeight: '14rem', maxHeight: '14rem', overflowY: 'auto' }}>
                            <ListItem key={"etiqueta"}>
                                <ListItemText primary={props.datos.developerLabel} />
                            </ListItem>
                            <ListItem  key={"genero"}>
                                <ListItemText primary={`Generos: ${props.datos.genres}`} />
                            </ListItem>
                            <ListItem  key={"plataforma"}>
                                <ListItemText primary={`Plataformas: ${props.datos.platforms}`} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )
}

export default GameComponent