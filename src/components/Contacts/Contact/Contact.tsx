import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import useStyles from "./styles";
import Avatar from "@material-ui/core/Avatar";
import { ContactType } from "../../../api/api";


type ContactPropsType = {
  contact: ContactType;
  setCurrentId: (currentId: string) => void;
};

export const Contact = ({ contact, setCurrentId }: ContactPropsType) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised elevation={6}>
      <Avatar src={contact.photo} />
      <div>
        <Typography variant={"body2"}>{contact.firstName}</Typography>
        <Typography variant={"body2"}>{contact.lastName}</Typography>
      </div>
      <div>
        <Typography variant={"body2"}>{contact.email}</Typography>
        <Typography variant={"body2"}>{contact.phone}</Typography>
        <Typography variant={"body2"}>{contact.adress}</Typography>
      </div>
      <div>
        <Button color={"primary"} size={"small"} onClick={() => {}}>
          <Edit fontSize={"small"} />
        </Button>
        <Button color={"secondary"} size={"small"} onClick={() => {}}>
          <Delete fontSize={"small"} />
        </Button>
      </div>
    </Card>
  );
};
