import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'reactstrap';
import {Link} from 'react-router-dom';

const ResorcesList = ({ resources }) => {
    return ( 
            <Row xs = {3}>
            {
                resources.map(
                    resource => (
                        <card key={ resource.id } style={{border:"1px solid lightGray",width:"360px",
                        marginLeft: "50px",marginBottom: "30px",backgroundColor: "white",
                        borderRadius: "5px"}}>
                            <Link to={`/resource/${resource.id}.json`} style={{textDecoration:"none"}}>
                            <table>
                                <tr>
                                    <td>
                                        <div className="img-container">
                                            <img src = {resource.icon_url} className="cardImg" alt="resource icon"/>
                                        </div>
                                    </td>
                                    <td>
                                            <h5 className="cardTitle">
                                                { resource.title }
                                            </h5>
                                            <h6 className="cardCategory">
                                                { resource.category }
                                            </h6>
                                    </td>
                                </tr>
                            </table>
                            <p className="cardLink">{ resource.link }</p>
                            <p className="cardDesc">{ resource.description }</p>
                            </Link>
                        </card>
                    )
                )
            }
            </Row>
        
     );
}
 
export default ResorcesList;