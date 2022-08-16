import  Toolbar  from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import  Avatar  from '@material-ui/core/Avatar'
import  Typography  from '@material-ui/core/Typography'
import  Button  from '@material-ui/core/Button'

export const Navbar = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [user, setUser] = useState(false)

  const signIn = () => navigate('/login')
  const logout = () => {
    navigate('/')
  }
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
                <Link to={'/'} className={classes.heading}>
                <Typography variant={'h6'} className={classes.headingText}>
                    Contact List
                    </Typography>
                </Link>        
            <Toolbar>
                {user ?
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={''} alt={''}/>
                        <Typography className={classes.userName} variant={'h6'}>{''}</Typography>
                        <Button variant={'contained'} color={'secondary'} onClick={logout}>Logout</Button>
                    </div> :
                    <div className={classes.toolbar}>
                        <Button className={classes.logout}
                                onClick={signIn}
                                variant={'contained'}
                                color={'primary'}>Sign In</Button>
                    </div>
                }
            </Toolbar>
        </AppBar>
  )
}
