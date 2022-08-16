import { useEffect } from "react";
import useStyles from "./styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { getAllContacts } from "../../store/contactsReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";

type PaginateType = {
  page: number;
};

const Paginate = ({ page }: PaginateType) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const totalPagesCount = useAppSelector(
    (state) => state.contacts.totalPagesCount
  );

  useEffect(() => {
    if (page) dispatch(getAllContacts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPagesCount}
      page={page || 1}
      variant={"outlined"}
      color={"primary"}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/contacts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
