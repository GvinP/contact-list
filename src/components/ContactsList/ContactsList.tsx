import { useState, KeyboardEvent, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import { Form } from "../Form/Form";
import Pagination from "../Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { Contacts } from "../Contacts/Contacts";
import { Navbar } from "../Navbar/Navbar";
import { searchContacts } from "../../store/contactsReducer";
import { useAppDispatch } from "../../store/store";
import { AuthDataType } from "../../api/api";

export const useQuery = () => new URLSearchParams(useLocation().search);

export const ContactsList = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const [user, setUser] = useState<AuthDataType>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    if (!Object.keys(user).length) navigate("/login");
  }, []);

  const searchContact = () => {
    if (search.trim()) {
      dispatch(searchContacts(search));
      navigate(`search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      searchContact();
    }
  };

  return (
    <>
      <Navbar />
      <Grow in>
        <Container maxWidth={"xl"}>
          <Grid
            className={classes.gridContainer}
            container
            justifyContent={"space-between"}
            alignItems={"stretch"}
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Contacts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position={"static"}
                color={"inherit"}
              >
                <TextField
                  name={"search"}
                  variant={"outlined"}
                  label={"Search post"}
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ margin: "10px 0" }}
                />
                <Button
                  className={classes.searchButton}
                  onClick={searchContact}
                  color={"primary"}
                  variant={"contained"}
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!search && (
                <Paper className={classes.pagination} elevation={6}>
                  <Pagination page={+page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};
