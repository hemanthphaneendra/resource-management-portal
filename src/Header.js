import logo from './logo.jpg';
import myAvatar from './img_avatar.png';
import {Link} from 'react-router-dom';
const Header = () => {
    return ( 
        <>
        <div className="header">
            <img className ="image" src={logo} alt="logo" />
            <Link to="/resource-management-portal" className = "avatar" >
                <img data-tip data-for="registerTip" 
                src = {myAvatar} alt = "avatar" style={{width:"40px",borderRadius:"50%"}}/>
            </Link>
        </div>
      </>
     );
}
 
export default Header;