import './Login.css'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import useWindowDimensions from './components/useWindowDimensions.js';
import {useState,useEffect} from 'react';


const Login = () => {
    const { height} = useWindowDimensions();
    const navigate = useNavigate();
    const height1 = height-52+'px';
    const initialValues = { phone: "", password: "" };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && 
        isSubmit && 
        Object.values(formValues)[0].length>0 && Object.values(formValues)[1].length>0) {
            navigate('/resource-management-portal/home')
        }
    }, [formErrors,formValues,isSubmit,navigate]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[0-9]*$/i;
        if (!values.phone) {
          errors.phone = "Phone Number is required!";
        } else if(!regex.test(values.phone)){
            errors.phone = "Phone Number must be valid"
        } else if(values.phone.length !== 10){
            errors.phone = "Phone Number Should Contain 10 Digits"
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };
    
    return ( 
        <div style={{display:"flex",height:height1}}>
            <img style={{width:"400px",height:"400px",paddingTop:"10%",paddingLeft:"10%"}} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="login"></img>
            <div style={{marginLeft:"130px"}}>
                <div className="login">
                    <div style={{display:"flex", marginTop:"70px"}}>
                        <p style={{fontSize:"20px",width:"100px",textAlign:"center",marginRight:"10px"}}>Sign In With</p>
                        <div style={{marginTop:"20px"}}>
                        <button style={{fontWeight:"bold",backgroundColor:"blue",color:"white",borderRadius:"50%",
                        border:"none",padding:"8px 18px",fontSize:"17px"}}>f</button>
                        <button style={{fontWeight:"bold",backgroundColor:"blue",color:"white",borderRadius:"50%",
                        border:"none",padding:"8px 16px",fontSize:"17px",marginLeft:"10px"}}>G</button>
                        <button style={{fontWeight:"bold",backgroundColor:"blue",color:"white",borderRadius:"50%",
                        border:"none",padding:"8px 14px",fontSize:"17px",marginLeft:"10px"}}>in</button>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div style={{borderTop: "1px solid #bbb",width:"120px",marginTop:"15px",marginRight:"5px"}}></div>
                        <p style={{fontSize:"17px",fontWeight:"bold"}}>Or</p>
                        <div style={{borderTop: "1px solid #bbb",width:"130px",marginTop:"15px",marginLeft:"5px"}}></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                        <input value={formValues.phone} type="text" maxlength="10" name="phone" onChange={handleChange} placeholder="Mobile Number" style={{width:"280px",height:"40px",
                        border:"1px solid #bbb",borderRadius:"4px",padding:"20px 10px",marginTop:"20px"}}/>
                        </div>
                        <p style={{color:"red",fontSize:"12px"}}>{formErrors.phone}</p>
                        <div>
                        <input value={formValues.password} name= "password" onChange={handleChange} type="password" placeholder="Password" style={{width:"280px",height:"40px",
                        border:"1px solid #bbb",borderRadius:"4px",padding:"20px 10px",marginTop:"20px"}}/>
                        </div>
                        <p style={{color:"red",fontSize:"12px"}}>{formErrors.password}</p>
                        <button style={{marginTop:"15px",color:"white",backgroundColor:"blue",padding:"10px 30px",border:"none",borderRadius:"4px"}}>LOGIN</button>
                    </form>
                    <div style={{display:"flex",paddingTop:"20px"}}>
                        <p style={{fontSize:"15px",fontWeight:"bold",marginRight:"5px"}}>Don't have an account?</p>
                        <p style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>Register</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;