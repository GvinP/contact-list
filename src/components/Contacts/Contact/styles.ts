import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "15px",
    height: "100%",
    padding: "10px 20px",
    position: "relative",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px 30px",
      marginLeft: "20px",
    },
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    minWidth: "180px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "10px",
    },
  },
  avatar: {
    marginRight: "20px",
  },
  contactInfo: {
    flexGrow: 3,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "10px",
    },
  },
  actions: {
    display: "flex",
    flexDirection: "row",
  },
}));
