import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import useStyles from "./styles";
import Avatar from "@material-ui/core/Avatar";
import { ContactType } from "../../../api/api";
import { useAppDispatch } from "../../../store/store";
import { deleteContact } from "../../../store/contactsReducer";

type ContactPropsType = {
  contact: ContactType;
  setCurrentId: (currentId: string) => void;
};

export const Contact = ({ contact, setCurrentId }: ContactPropsType) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.nameContainer}>
        <Avatar
          src={contact.photo}
          className={classes.avatar}
          alt={contact.firstName}
        />
        <div>
          <Typography variant={"body2"}>{contact.firstName}</Typography>
          <Typography variant={"body2"}>{contact.lastName}</Typography>
        </div>
      </div>
      <div className={classes.contactInfo}>
        <Typography variant={"body2"}>{contact.email}</Typography>
        <Typography variant={"body2"}>{contact.phone}</Typography>
        <Typography variant={"body2"}>{contact.adress}</Typography>
      </div>
      <div className={classes.actions}>
        <Button
          color={"primary"}
          size={"small"}
          onClick={() => setCurrentId(contact._id!)}
        >
          <Edit fontSize={"small"} />
        </Button>
        <Button
          color={"secondary"}
          size={"small"}
          onClick={() => dispatch(deleteContact(contact._id!))}
        >
          <Delete fontSize={"small"} />
        </Button>
      </div>
    </Card>
  );
};
