import { Link } from "react-router-dom"
import useWindowDimensions from './components/useWindowDimensions.js';

const NotFound = () => {
    const { height } = useWindowDimensions();
    const height1 = height-52+'px';
    return (
        <div style={{height:height1,textAlign:"center",paddingTop:"100px"}}>
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/home">Back to the homepage...</Link>
        </div>
    );
}
 
export default NotFound;