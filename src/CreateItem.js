import useWindowDimensions from './components/useWindowDimensions.js';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useState,useEffect} from 'react';
import './CreateItem.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

const CreateItem = () => {
    const { height } = useWindowDimensions();
    const height1 = height-52+'px';
    const initialValues = { itemName: "", link: "", resourceName: "", description:""};
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
        console.log(formErrors);
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && 
        isSubmit && 
        !Object.values(formValues).includes('')) {
            const resource = formValues;
            fetch('https://media-content.ccbp.in/website/react-assignment/add_resource.json',{
                method:'POST',
                headers: {'Content-Type':"application/json",},
                body: JSON.stringify(resource),
            }).then(()=>{
                toast.success("Resource Added Succesfully",{
                    position:"bottom-center",
                    theme: "colored",
                });
            }).catch(err=>{
                toast.error("Resource Adding Failed",{
                    position:"bottom-center",
                    theme: "colored",
                });
            })
        }
    }, [formErrors,formValues,isSubmit]);

    const validate = (values) => {
        const errors = {};
        if (!values.itemName) {
          errors.itemName = "Item Name is required!";
        } else if(values.itemName.length < 5){
            errors.itemName = "Item Name Should Contain 5 Characters"
        }
        if(!values.link){
            errors.link = "Link is Required";
        } else if(values.link.length < 3){
            errors.link = "Link Should Contain atleast 3 Characters"
        }
        if(!values.resourceName){
            errors.resourceName = "Resource Name is Required";
        } else if(values.resourceName.length < 5){
            errors.resourceName = "Resource Name Should Contain atleast 5 Characters"
        }
        if (!values.description) {
          errors.description = "Description is required";
        } else if (values.description.length < 10) {
          errors.description = "Description  must be more than 10 characters";
        } else if (values.description.length > 50) {
          errors.description = "Description  cannot exceed more than 50 characters";
        }
        return errors;
    };

    return ( 
        <div style={{display:"flex",height:height1}}>
            <div>
                <div style={{display:"flex",paddingTop:"20px"}}>
                    <Link to={-1}><ArrowBackIosNewIcon style={{color:"darkBlue",height:"22px",width:"20px"}}/></Link>
                    <p style={{paddingLeft:"8px",paddingBottom:"3px",fontSize:"14px",color:"#7E858E",paddingTop:"3px"}}>Users</p>
                </div>
                <div className="create">
      <h2>Item Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{textAlign:"left",color:"#7E858E"}}>ITEM NAME</div>
        <input 
          type="text" 
          value={formValues.itemName}
          onChange={handleChange}
          name="itemName"
        />
        <div style={{textAlign:"left",color:"red",fontSize:"10px"}}>{formErrors.itemName}</div>
        <div style={{textAlign:"left",color:"#7E858E",marginTop:"10px"}}>LINK</div>
        <input 
          type="text" 
          value={formValues.link}
          onChange={handleChange}
          name="link"
          style={{color:"blue"}}
        />
        <div style={{textAlign:"left",color:"red",fontSize:"10px"}}>{formErrors.link}</div>
        <div style={{textAlign:"left",color:"#7E858E",width:"450px",marginTop:"10px"}}>RESOURCE NAME</div>
        <input 
          type="text" 
          value={formValues.resourceName}
          onChange={handleChange}
          name="resourceName"
        />
        <div style={{textAlign:"left",color:"red",fontSize:"10px"}}>{formErrors.resourceName}</div>
        <div style={{textAlign:"left",fontStize:"12px",color:"#7E858E",width:"450px",marginTop:"10px"}}>DESCRIPTION</div>
        <input
        type="text"
        style={{height:"60px"}}
          value={formValues.description}
          onChange={handleChange}
          name="description"
        />
        <div style={{textAlign:"left",color:"red",fontSize:"10px"}}>{formErrors.description}</div>
        <button>CREATE</button>
      </form>
    </div>
    <ToastContainer />
            </div>
            <img style={{marginLeft:"auto",width:"45%"}} src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?cs=srgb&dl=pexels-cadeau-maestro-1170412.jpg&fm=jpg" alt="office"></img>
        </div>
     );
}
 
export default CreateItem;