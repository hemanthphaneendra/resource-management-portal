import { useParams } from "react-router-dom";
import useFetch from './useFetch.js';
import './ResourceDetails.css';
import {Link} from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ResourceDetailsTable from './components/ResourceDetailsTable.js';

const ResourceDetails = () => {
    const { id } = useParams();
    const { data: resource, error, isPending } = useFetch('https://media-content.ccbp.in/website/react-assignment/resource/' + id+'.json');

    const handleUpdate=()=>{
        fetch('https://media-content.ccbp.in/website/react-assignment/resource/update.json',{
            method:'PUT',
            headers: {
                'Accept':"application/json",
                'Content-Type':"application/json",
            },
            body: JSON.stringify(resource),
        }).then((res)=>{
            console.log(res.status);
        }).catch(err=>{
            console.log(err)
        })
    }

    return ( 
        <div className="resource-details-screen" style={{height:"100%",paddingBottom:"200px"}}>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { resource && (
                <>
                    <div style={{display:"flex"}}>
                        <Link to='/resource-management-portal/home' style={{textDecoration:"none"}}><ArrowBackIosNewIcon style={{color:"darkBlue",height:"22px",width:"20px"}}/></Link>
                        <p style={{paddingLeft:"8px",paddingBottom:"3px",fontSize:"14px",color:"#7E858E",paddingTop:"3px"}}>Resources</p>
                    </div>
                    <div className="circle-container" style={{display:"flex"}}>
                        <img src={resource.icon_url} className="resourceImg" alt="resourecIcon"/>
                        <div style={{paddingLeft:"25px"}}>
                            <div style={{fontSize:"32px",color:"#171F46"}}>{resource.title}</div>
                            <div style={{fontSize:"16px",color:"#7E858E"}}>2345</div>
                            <a style={{textDecoration:"none"}}href={resource.link} target="_blank"><div style={{paddingTop:"3px",width:"1000px",fontSize:"14px",color:"#0B69FF"}}>{resource.link}</div></a>
                        </div>
                    </div>
                    <p style={{width:"600px",fontSize:"14px",color:"#7E858E",paddingTop:"45px",paddingBottom:"20px"}}>
                    Slack brings the team together, wherever you are. With all of your communication and tools in one place, remote teams will stay productive no matter where you’re ...
                    </p>
                    <button onClick={handleUpdate} style={{padding: "8px 20px",backgroundColor:"#0B69FF",
                    color:"white",fontSize:"14px",border:"none",borderRadius:"4px"}}>
                        Update
                    </button>
                    <ResourceDetailsTable resourceItemsList={resource.resource_items}/>
            </>
            )}
        </div>
     );
}
 
export default ResourceDetails;