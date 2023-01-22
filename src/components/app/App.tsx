import React from 'react';
import { Button, Grid, Input, Paper } from '@mui/material';

import './App.css';
import query from '../../utils/queryMaker';
import { Filtro } from '../../types/filtro';
import { Datos, datosVacios } from '../../types/datos';
import GameComponent from '../game/Game';

function App() {
  const [filtro, setFiltro] = React.useState<Filtro>({ desarrolladora: "Nintendo" })
  const [datos, setDatos] = React.useState<Array<Datos>>([])
  const [loading, setLoading] = React.useState(true)
  const keys = [
    "game",
    "game_label",
    "developerLabel",
    "genres",
    "platforms",
    "firstPublication",
    "logo"
  ]

  const buscar = () =>{
    setLoading(true)
  }

  React.useEffect(() => {
    query(filtro).then((data) => {
      if (data && data.results && data.results.bindings) {

        setLoading(false)
        const addData:Datos[] = [] 
        data.results.bindings.forEach((element: any) => {
          let newGame: Datos = { ...datosVacios }
          for (let i of keys) {
            if(element[i])
              newGame[i as keyof typeof newGame] = element[i].value
          }
          addData.push(newGame)
        })
        setDatos(addData)
      }
    })
  }, [loading])


  return (
    <Grid container>
      <Grid xs={12} container item id="filtros">
        <Paper elevation={2}>
          <Grid item>
            <Button onClick={buscar}>Buscar</Button>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={12} container item id="contenido" gap={1}>
        {datos.map(element => <GameComponent datos={element}></GameComponent>)}
      </Grid>
    </Grid>
  );
}

export default App;
