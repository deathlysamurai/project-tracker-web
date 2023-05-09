import './PaginationContainer.css';
import { FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from "react";

export default function PaginationContainer(props: {
    DEFAULT_ROWS_PER_PAGE: number,
    totalRows: number,
    rowsPerPage: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    setPreviousPageClass: React.Dispatch<React.SetStateAction<string>>,
    setNextPageClass: React.Dispatch<React.SetStateAction<string>>,
    previousPageClass: string,
    nextPageClass: string
}) {
    const ROWS_PER_PAGE_OPTIONS = [5, 20, 50, 'All'];
    const [currentPageStart, setCurrentPageStart] = useState(0);
    const [currentPageEnd, setCurrentPageEnd] = useState(0);
    const [rowsPerPageSelector, setRowsPerPageSelector] = useState(props.DEFAULT_ROWS_PER_PAGE.toString());

    useEffect(() => {
        var pageStart = (props.totalRows > 0) ? ((props.page * props.rowsPerPage) + 1) : 0;
        var pageEnd = (props.page * props.rowsPerPage) + props.rowsPerPage;
        pageEnd = pageEnd > props.totalRows ? props.totalRows : pageEnd;
        setCurrentPageStart(pageStart);
        setCurrentPageEnd(pageEnd);
    }, [props.page, props.rowsPerPage, props.totalRows]);

    const updateRowsPerPage = (event: SelectChangeEvent) => {
        var newRowsPerPage = event.target.value;
        setRowsPerPageSelector(newRowsPerPage);
        newRowsPerPage = newRowsPerPage == 'All' ? props.totalRows.toString() : newRowsPerPage;
        props.setRowsPerPage(Number(newRowsPerPage));
    }

    const handlePageSelector = (pageIncrement: number) => {
        var newPage = props.page + pageIncrement;
        newPage = newPage < 0 ? 0 : newPage;
        if(((newPage * props.rowsPerPage) + 1) > props.totalRows) { newPage -= 1; }
        props.setPage(newPage);
        if(newPage > 0) { 
            props.setPreviousPageClass('');
        } else {
            props.setPreviousPageClass('inactive-icon');
        } 
        if(((newPage * props.rowsPerPage) + props.rowsPerPage) >= props.totalRows) { 
            props.setNextPageClass('inactive-icon');
        } else {
            props.setNextPageClass('');
        }
    }

    return(
        <div className='pagination-container'>
            <Tooltip title="Previous Page" className='tooltip'>
                <IconButton onClick={() => handlePageSelector(-1)}>
                    <ChevronLeftIcon className={props.previousPageClass} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Next Page" className='tooltip'>
                <IconButton onClick={() => handlePageSelector(1)}>
                    <ChevronRightIcon className={props.nextPageClass} />
                </IconButton>
            </Tooltip>
            <p className='pagination-pages'>{currentPageStart} - {currentPageEnd} of {props.totalRows}</p>
            <FormControl size="small" className="pagination-row-count-select">
                <Select
                    value={rowsPerPageSelector}
                    onChange={updateRowsPerPage}
                    displayEmpty
                    autoWidth
                    inputProps={{ 'aria-label': 'Rows Per Page' }}
                    >
                        {
                            ROWS_PER_PAGE_OPTIONS.map((option) => (
                                <MenuItem value={option} key={option+'-selector'}><span className='pagination-row-selector'>{option}</span></MenuItem>
                            ))
                        }
                </Select>
            </FormControl>
        </div>
    )
}