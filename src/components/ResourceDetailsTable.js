import { useMemo,useState,useEffect } from "react";
import { useTable,useGlobalFilter,useRowSelect } from "react-table";
import COLUMNS from "./columns.js";
import './resourceItemsTable.css';
import ItemSearch from './ItemSearch.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import SortIcon from '@mui/icons-material/Sort';
import Checkbox from './CheckBox.js';
import { Link } from 'react-router-dom';

function uniqBy(items, key) {
    var seen = {};
    return items.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

const ResourceDetailsTable = ({resourceItemsList}) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(resourceItemsList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(resourceItemsList.length / itemsPerPage));
    }, [ itemOffset, itemsPerPage,resourceItemsList ]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % resourceItemsList.length;
        setItemOffset(newOffset);
    };
    const columns = useMemo(()=>COLUMNS,[]);

    const {  
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows,
    } = useTable({
        columns,
        data:currentItems,
    },
    useGlobalFilter,
    useRowSelect,
    (hooks)=>{
        hooks.visibleColumns.push(columns=>{
            return [
                {
                    id:'selection',
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ];
        });
    }
    );

    const { globalFilter } = state;
    const handleClick=()=>{
        var items =[]
        for(var i=0;i<currentItems.length;i++){
            selectedFlatRows.map(flatRow=>{
                if(currentItems[i].id !== flatRow.original.id){
                    items.push(currentItems[i]);
                }
            })
        }
        var allCurrentItems = uniqBy(items, JSON.stringify);
        setCurrentItems(allCurrentItems);
    }

    return (
        <>
        <table style={{width:"100%"}}>
            <tr>
                <td style={{width:"43%",fontSize:"24px",color:"#171F46"}}>Items</td>
                <td>
                    <ItemSearch filter={globalFilter} setFilter={setGlobalFilter} style={{marginTop:"20px"}}/> 
                </td>
                <td><SortIcon style={{color:"#171F46",width:"20px",height:"20px"}}/></td>
                <td style={{fontSize:"12px",color:"#171F46"}}>SORT</td>
            </tr>
        </table>
        <table {...getTableProps()} style={{width: "100%",borderCollapse: "collapse",border: "1px solid",borderColor: "#D7DFE9",}}>
            <thead>
                {
                    headerGroups.map(headerGroup=>(
                        <tr {...headerGroup.getHeaderGroupProps()} style={{border: "1px solid",borderColor: "#D7DFE9"}}>
                            {
                                headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps()} style={{fontSize: "12px",
                                        color:"#7E858E",padding: "20px 50px"}}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row=>{
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={{border: "1px solid",borderColor: "#D7DFE9"}}>
                                {
                                    row.cells.map(cell=>{
                                        console.log(cell.value)
                                        return <td {...cell.getCellProps()} style={{fontSize: "14px",
                                        color:cell.column.Header==="Link"?"blue":"#7E858E",padding: "20px 20px 20px 50px"}}>
                                            <a style={{textDecoration:"none"}} href={cell.column.Header==="Link"?cell.value:null} 
                                            target="_blank" rel="noreferrer">{cell.render('Cell')}</a>
                                        </td>
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        <div style={{display:"flex",paddingTop:"20px"}}>
        <div>
            <Link to="/resource-management-portal/create"><button disabled={selectedFlatRows.length>0} style={{marginTop:"10px",
            paddingTop:"10px",backgroundColor:selectedFlatRows.length>0?"#D7DFE9":"#2DCA73",
            color:"white",fontSize:"14px",padding:"10px 15px",border:"none",borderRadius:"5px"}}>
                ADD ITEM
            </button></Link>
            <button onClick={handleClick} disabled={selectedFlatRows.length===0} 
            style={{marginLeft:"25px",paddingLeft:"20px",
            backgroundColor:selectedFlatRows.length>0?"red":"#D7DFE9",
            color:"white",fontSize:"14px",padding:"10px 20px",border:"none",borderRadius:"5px"}}>
                DELETE
            </button>
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="previous-page"
        nextLinkClassName="previous-page"
        activeLinkClassName="active"
      />
      </div>
        </>
     );
}
 
export default ResourceDetailsTable;