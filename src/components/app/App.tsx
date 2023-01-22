import React from 'react';
import { Button, CircularProgress, Grid, Input, Modal, Paper, TextField, Typography } from '@mui/material';

import './App.css';
import query from '../../utils/queryMaker';
import { Filtro } from '../../types/filtro';
import { Datos, datosVacios } from '../../types/datos';
import GameComponent from '../game/Game';

function App() {
  const [filtro, setFiltro] = React.useState<Filtro>({ desarrolladora: "Nintendo" })
  const [datos, setDatos] = React.useState<Array<Datos>>([])
  const [loading, setLoading] = React.useState(true)
  const [pagina, setPagina] = React.useState(0)

  const [desarrolladora, setDesarrolladora] = React.useState("Nintendo")
  const [nombre, setNombre] = React.useState("")
  const [genero, setGenero] = React.useState("")
  const [plataforma, setPlataforma] = React.useState("")
  const [fechaHasta, setFechaHasta] = React.useState("")
  const [fechaDesde, setFechaDesde] = React.useState("")

  const keys = [
    "game",
    "game_label",
    "developerLabel",
    "genres",
    "platforms",
    "firstPublication",
    "logo"
  ]

  const buscar = () => {
    setLoading(true)
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeDes = (event: React.ChangeEvent<HTMLInputElement>) => {
    let f = filtro
    f.desarrolladora = event.target.value
    setFiltro(f)
    setDesarrolladora(event.target.value);
  };

  const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
    let f = filtro
    f.nombre = event.target.value
    setFiltro(f)
    setNombre(event.target.value);
  };

  const handleChangeGenero = (event: React.ChangeEvent<HTMLInputElement>) => {
    let f = filtro
    f.genero = event.target.value
    setFiltro(f)
    setGenero(event.target.value);
  };

  const handleChangePlataforma = (event: React.ChangeEvent<HTMLInputElement>) => {
    let f = filtro
    f.plataforma = event.target.value
    setFiltro(f)
    setPlataforma(event.target.value);
  };

  const handleChangeFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
    let f = filtro
    f.añoDesde = event.target.value
    setFiltro(f)
    setFechaDesde(event.target.value);
  };

  React.useEffect(() => {
    query(filtro, pagina).then((data) => {
      if (data && data.results && data.results.bindings) {
        setLoading(false)
        const addData: Datos[] = []
        data.results.bindings.forEach((element: any) => {
          let newGame: Datos = { ...datosVacios }
          for (let i of keys) {
            if (element[i])
              newGame[i as keyof typeof newGame] = element[i].value
          }
          addData.push(newGame)
        })
        setDatos(addData)
        goToTop()
      }
    })
  }, [loading])


  return (
    <Grid container rowGap={3} justifyContent={'center'} p={1}>
      <Grid item xs={5} >
        <Typography textAlign={'center'} variant={'h1'} style={{ textShadow: "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff" }}>
          VG Atlas
        </Typography>
      </Grid>
      <Paper style={{ textAlign: 'center', padding: '0.5rem' }} >
        <Grid xs={12} container item id="filtros" alignItems={'center'} justifyItems={'stretch'} gap={1}>
          <Grid xs={2} item>
            <TextField variant='standard' label="Desarrolladora" onChange={handleChangeDes} value={desarrolladora}></TextField>
          </Grid>
          <Grid xs={2} item>
            <TextField variant='standard' label="Plataforma" onChange={handleChangePlataforma} value={plataforma}></TextField>
          </Grid>
          <Grid xs={2} item>
            <TextField variant='standard' label="Genero" onChange={handleChangeGenero} value={genero}></TextField>
          </Grid>
          <Grid xs={2} item>
            <TextField variant='standard' label="Nombre" onChange={handleChangeNombre} value={nombre}></TextField>
          </Grid>
          <Grid xs={2} item>
            <TextField variant='standard' label="Año desde" onChange={handleChangeFecha} value={fechaDesde}></TextField>
          </Grid>
          <Grid xs={1} item>
            <Button variant='contained' onClick={buscar}>Buscar</Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid xs={12} container item id="contenido" gap={2} justifyContent={'center'}>
        {datos.map(element => <GameComponent datos={element}></GameComponent>)}
      </Grid>
      <Grid xs={12} container item justifyContent={'center'} textAlign={'center'}>
        <Grid item xs={3}>
          <Button size='large' variant='contained' disabled={pagina === 0} onClick={() => { let p = pagina; setPagina(--p); buscar() }}>{`<- Previa`}</Button>
        </Grid>
        <Grid item xs={3}>
          <Button size='large' variant='contained' onClick={() => { let p = pagina; setPagina(++p); buscar() }}>{`Siguiente ->`}</Button>
        </Grid>
      </Grid>
      <Modal
        open={loading}
        style={{
          top: '45%',
          left: '45%',
        }}
      >
        <CircularProgress size={'10rem'}></CircularProgress>
      </Modal>
    </Grid>
  );
}

export default App;
