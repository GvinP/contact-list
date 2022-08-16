import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import useStyles from './styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { api, ContactType } from '../../api/api'

type FormPropsType = {
    currentId: string | null
    setCurrentId: (currentId: string | null) => void
}

const contactDataInitialState: ContactType = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adress: '',
    photo: '',
}

export const Form = ({currentId, setCurrentId}: FormPropsType) => {
    const [contactData, setContactData] = useState<ContactType>(contactDataInitialState)
    const classes = useStyles()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            convertFileToBase64(file, (file64: string) => {
                setContactData({...contactData, photo: file64})
            })
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        api.addContact(contactData)
        if (currentId) {
            // dispatch(updatePostTC(currentId, {...postData, name: user?.authData?.name}))
        } else {
            // dispatch(addPostTC({...postData, name: user?.authData?.name}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setContactData({...contactDataInitialState})
    }

  return (
    <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant={'h6'}>{currentId ? 'Editing' : 'Creating'} a contact</Typography>
                <TextField name={'firstName'}
                           variant={'outlined'}
                           label={'First Name'}
                           focused={!!contactData.firstName}
                           fullWidth
                           value={contactData.firstName}
                           onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                />
                <TextField name={'lastName'}
                           variant={'outlined'}
                           label={'Last Name'}
                           focused={!!contactData.lastName}
                           fullWidth
                           value={contactData.lastName}
                           onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                />
                <TextField name={'email'}
                           variant={'outlined'}
                           label={'Email adress'}
                           focused={!!contactData.email}
                           type={'email'}
                           fullWidth
                           value={contactData.email}
                           onChange={(e) => setContactData({...contactData, email: e.target.value})}
                />
                <TextField name={'phone'}
                           variant={'outlined'}
                           label={'Phone number'}
                           focused={!!contactData.phone}
                           fullWidth
                           type={'tel'}
                           value={contactData.phone}
                           onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                />
                <TextField name={'adress'}
                           variant={'outlined'}
                           label={'Adress'}
                           focused={!!contactData.adress}
                           fullWidth
                           value={contactData.adress}
                           onChange={(e) => setContactData({...contactData, adress: e.target.value})}
                />
                <div className={classes.fileInput}>
                    <label>
                        <input type="file"
                               onChange={uploadHandler}
                               multiple={false}
                        />
                    </label>
                </div>
                <Button className={classes.buttonSubmit} variant={'contained'} color={'primary'} size={'large'}
                        type={'submit'} fullWidth>Submit</Button>
                <Button className={classes.root} variant={'contained'} color={'secondary'} size={'small'}
                        onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
  )
}
