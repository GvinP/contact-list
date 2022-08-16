import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useEffect, useState } from 'react'
import { api, ContactType } from '../../api/api'
import { Contact } from './Contact/Contact'

type PostsPropsType = {
    setCurrentId: (currentId: string) => void
}


export const Contacts = ({setCurrentId}:PostsPropsType) => {
    const classes = useStyles()
    const [contacts, setContacts] = useState<ContactType[]>([])
    const [isLoading, setIsLoading] = useState(false)

useEffect(()=>{
  api.getContacts(1).then(res=>setContacts(res.data))
}, [])

    // if (isLoading) return <div>'No posts'</div>

  return (
    isLoading
            ? <CircularProgress/> :
            <Grid container className={classes.mainContainer} alignItems={'stretch'}>
               <Grid item xs={12} sm={12} md={12} lg={12}>
                {contacts.map(contact=> <Contact contact={contact} setCurrentId={setCurrentId} key={contact.adress}/>)}
                        {/* <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/>
                        <Contact contact={contact} setCurrentId={setCurrentId}/> */}
                </Grid>
            </Grid>
  )
}
