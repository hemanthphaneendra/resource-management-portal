import './Home.css'
import useFetch from './useFetch.js';
import ResourcesList from './ResourcesList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search.js';

const Home = () => {
    const { error, isPending, data: resources } = useFetch('https://media-content.ccbp.in/website/react-assignment/resources.json');

    const [tabPage,setTabPage] = useState('resourcesTab');
    const [searchTerm, setSearchTerm] = useState('');
    const handleTap = (e)=>{
        setTabPage(e.target.id);
    }

    return ( 
        <div className="home" >
            <div className="btn-group" style={{display: "block",marginLeft: "auto",marginRight: "auto",
            width:"50%",paddingBottom:"30px"}}>
                <button id="resourcesTab" onClick={handleTap} style={{width:"170px",backgroundColor:tabPage==="resourcesTab"?"blue":"rgba(215, 223, 233, 0.24)",color:tabPage==="resourcesTab"?"white":"darkBlue"}}>Resources</button>
                <button id="requestsTab" onClick={handleTap} style={{width:"170px",backgroundColor:tabPage==="requestsTab"?"blue":"rgba(215, 223, 233, 0.24)",color:tabPage==="requestsTab"?"white":"darkBlue"}}>Requests</button>
                <button id="usersTab" onClick={handleTap} style={{width:"170px",backgroundColor:tabPage==="usersTab"?"blue":"rgba(215, 223, 233, 0.24)",color:tabPage==="usersTab"?"white":"darkBlue"}}>Users</button>
            </div>
            <div className="boxContainer">
                <table className="elementsContainer">
                    <tr>
                        <td>
                        <SearchIcon className="material-icon"/>
                        </td>
                        <td>
                            <input type="text" placeHolder="Search" className="search" onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                        </td>
                    </tr>
                </table>
            </div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { resources && tabPage === 'resourcesTab' && 
                <ResourcesList resources={resources.filter(
                    (resource)=>{
                        if(searchTerm === ''){
                            return resource;
                        }
                        else if(resource.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return resource;
                        }
                    }
                )} 
                /> 
            }
            {resources && tabPage === 'requestsTab' && 
                <ResourcesList resources={resources.filter(
                    (resource)=>{
                        if(searchTerm === ''){
                            return resource;
                        }
                        else if(resource.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return resource;
                        }
                    }
                ).filter((resource)=>resource.tag==="request")}/>}
            {resources && tabPage === 'usersTab' && 
                <ResourcesList resources={resources.filter(
                    (resource)=>{
                        if(searchTerm === ''){
                            return resource;
                        }
                        else if(resource.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return resource;
                        }
                    }
                ).filter((resource)=>resource.tag==="user")}/>}
        </div>
    );
}
 
export default Home;