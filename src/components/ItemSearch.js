import SearchIcon from '@mui/icons-material/Search.js';
import '../Home.css'
const ItemSearch = ({filter, setFilter}) => {
    return ( 
        <div className="boxContainer" style={{marginTop:"25px"}}>
        <table className="elementsContainer">
            <tr>
                <td>
                <SearchIcon className="material-icon"/>
                </td>
                <td>
                    <input type="text" placeHolder="Search" className="search" value={filter || ''} onChange={e=>setFilter(e.target.value)}/>
                </td>
            </tr>
        </table>
    </div>
     );
}
 
export default ItemSearch;