import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const Logo = () => (
  <svg viewBox="0 0 500 200" version="1.1" width="500px">
    <g id="root" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="shape" transform="translate(40.000000, 65.000000)" fill="" fillRule="nonzero">
        <path
          d="M6.806 34.011c1.253 0 2.269 1.113 2.269 2.489c0 1.376 -1.016 2.489 -2.269 2.489l-4.537 0c-1.253 0 -2.269 -1.113 -2.269 -2.489c0 -1.376 1.016 -2.489 2.269 -2.489l4.537 0zm409.925 0c1.253 0 2.269 1.113 2.269 2.489c0 1.376 -1.016 2.489 -2.269 2.489l-344.337 0c-1.253 0 -2.269 -1.113 -2.269 -2.489c0 -1.376 1.016 -2.489 2.269 -2.489l344.337 0z"
          id="shape.primary"
          fill="#1ED760"
        />
        <path
          d="M35.97 18.25c1.245 0 2.255 1.02 2.255 2.281l0 31.938c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -31.938c0 -1.261 1.01 -2.281 2.255 -2.281zm26.4 0c1.245 0 2.255 1.02 2.255 2.281l0 31.938c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -31.938c0 -1.261 1.01 -2.281 2.255 -2.281zm-44.44 9.125c1.245 0 2.255 1.02 2.255 2.281l0 13.688c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -13.688c0 -1.261 1.01 -2.281 2.255 -2.281zm36.08 -18.25c1.245 0 2.255 1.02 2.255 2.281l0 50.188c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -50.188c0 -1.261 1.01 -2.281 2.255 -2.281zm-27.06 0c1.245 0 2.255 1.02 2.255 2.281l0 50.188c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -50.188c0 -1.261 1.01 -2.281 2.255 -2.281zm18.04 -9.125c1.245 0 2.255 1.02 2.255 2.281l0 68.438c0 1.261 -1.01 2.281 -2.255 2.281c-1.245 0 -2.255 -1.02 -2.255 -2.281l0 -68.438c0 -1.261 1.01 -2.281 2.255 -2.281z"
          id="shape.primary"
          fill="#1ED760"
        />
      </g>
      <g id="Group" transform="translate(123.000000, 42.000000)">
        <rect x="0" y="0" width="334" height="46" />
        <text fontFamily="Roboto" fontSize="46" fontWeight="700" letterSpacing="4.04" fill="#1ED760" fontStyle="normal">
          <tspan x="0" y="37.5">Spotishare</tspan>
        </text>
      </g>
    </g>
  </svg>
)

const App = () => (
  <Container
    style={{
      height: '100%'
    }}
  >
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{
        height: '100%'
      }}
    >
      <Grid container direction="column" spacing={2} md={6} xl={6} justify="center" alignItems="center">
        <Grid item>
          <Logo />
        </Grid>
        <Grid container spacing={8} direction="column" alignItems="center">
          <Grid item>
            Tervetuloa Spotishareen!
          </Grid>
          <Grid container justify="space-around">
            <Grid item>
              <Button color="primary">Luo uusi sessio</Button>
            </Grid>
            <Grid item>
              <Link to="/session">
                <Button>Liity sessioon</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
)

export default App
