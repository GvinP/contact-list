import React, {useEffect} from 'react';
import useStyles from './styles'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {Link} from "react-router-dom";


type PaginateType = {
    page: number
}

const Paginate = ({page}: PaginateType) => {
    const classes = useStyles()
    // const dispatch = useAppDispatch()
    // const currentPage = useAppSelector(state => state.posts.currentPage)
    // const totalCountOfPages = useAppSelector(state => state.posts.totalCountOfPages)

    useEffect(() => {
        // if (page) dispatch(getPostsTC(page))
    }, [page])


    return (
        <Pagination classes={{ul: classes.ul}}
                    // count={totalCountOfPages}
                    page={page || 1}
                    variant={'outlined'}
                    color={'primary'}
                    renderItem={(item) => (
                        <PaginationItem {...item} component={Link} to={`/contacts?page=${item.page}`}/>
                    )}
        />
    );
};

export default Paginate;