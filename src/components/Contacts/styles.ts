import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        borderRadius: 15,
        margin: '10px 0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
    },
    [theme.breakpoints.down('sm')]: {
        mainContainer: {
            padding: '0',
            marginLeft: '-12px',
        },
    },
}));