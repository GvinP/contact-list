import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Contact } from "./Contact/Contact";
import { useAppSelector } from "../../store/store";

type PostsPropsType = {
  setCurrentId: (currentId: string) => void;
};

export const Contacts = ({ setCurrentId }: PostsPropsType) => {
  const classes = useStyles();
  const contacts = useAppSelector((state) => state.contacts.allContacts);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container className={classes.mainContainer} alignItems={"stretch"}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {contacts.map((contact) => (
          <Contact
            contact={contact}
            setCurrentId={setCurrentId}
            key={contact._id}
          />
        ))}
      </Grid>
    </Grid>
  );
};
