import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import '../component/addemp.css';

function Addemp(){
    const navigate = useNavigate();
    const [select, setSelect] = useState(null);
    const [preview, setPreview] = useState(null);
    const [inputs, setInputs] = useState({});
    

    const handleChange = (e) =>{

        setInputs({...inputs, [e.target.name]:e.target.value});

    }
    
    const handleImagechange = (e) =>{
        if(e.target.files && e.target.files.length>0){
            const file = e.target.files[0];
            if(file){
                setSelect(file);

                const reader = new FileReader();
                reader.onloadend = () =>{
                    setPreview(reader.result);
                }
                reader.readAsDataURL(file);
            }
        }
        else{
            setPreview(null);
        }
        }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', select);
        formData.append('empname', inputs.empname);
        formData.append('empid', inputs.empid);
        formData.append('department', inputs.department);
        formData.append('designation', inputs.designation);
        formData.append('project', inputs.project);
        formData.append('type', inputs.type);
        formData.append('status', inputs.status);

        fetch('http://localhost:3030/addemp',{
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data =>{console.log(data);})
        .catch(error => console.error('Error:',error))
        
        navigate('/empdisplay');
    };

    return (
        <div className = "forms">
            <h3><Link to="/empdisplay"><i className="bi bi-chevron-left"></i></Link> Add New Employee</h3>

            <div className = "container">    
            <form onSubmit={handleSubmit}>
                <h5><i className="bi bi-person-circle"></i> Personal Information</h5><hr></hr>

                <div className = "row">
                    <label htmlFor="image">
                        
                        <div className="edit-image">
                            {preview ? 
                            (<img src={preview} alt="Employee"></img>)
                            :(<div className="image-placeholder">
                                <i className="bi bi-camera"></i>
                            </div>
                            )}
                        </div>

                        <div className="overlay">
                            <div className="icon">
                                <i className="bi bi-pencil-square"></i>

                                <input type="file"
                                name="image"
                                onChange={handleImagechange} required/>
                            </div>
                        </div>
                        
                    </label>
                </div>

                <div className = "row">
                <div className = "col">
                    <label htmlFor="uname">Name<b>*</b></label>
                    <input type="text" 
                    name ="empname" 
                    placeholder="Enter Name"
                    value = {inputs.empname || ""} 
                    onChange={handleChange} required/>
                    
                </div>

                <div className = "col">
                    <label htmlFor="empid">Employee ID<b>*</b></label>
                    <input type="text" 
                    name="empid" 
                    placeholder="Enter Employee ID"
                    value={inputs.empid || ""} 
                    onChange={handleChange} required/>
                </div>
                </div>

                <div className = "row">
                <div className ="col">
                    <label htmlFor = "department">Department<b>*</b></label>
                    <select 
                    name="department"
                    value={inputs.department} 
                    onChange={handleChange}required> 
                    <option value="">Select Department</option>
                    <option value="Designing">Designing</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Business Development">Business Development</option>
                    </select>
                </div>

                <div className = "col">
                    <label htmlFor="designation">Designation<b>*</b></label>
                    <select 
                    name="designation"
                    value={inputs.designation} 
                    onChange={handleChange}required>
                    <option value="">Select Designation</option>
                    <option value="Associate Lead">Associate Team Lead</option>
                    <option value="Human Resource Manager">Human Resource Manager</option>
                    <option value="Business Development Executive">Business Development Executive</option>
                    <option value="Software Tester">Software Tester</option>
                    <option value="Front-End Developer">Front-End Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Blockchain Developer">Blockchain Developer</option>
                    <option value="Android Developer">Android Developer</option>
                    <option value="IOS Developer">IOS Developer</option>
                    <option value="Flutter Developer">Flutter Developer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="SEO Analyst">SEO Analyst</option>                        
                    </select>       
                </div>
                </div>

                <div className ="row">
                <div className ="col">
                <label htmlFor = "project">Project</label>
                    <input type="text" 
                    name="project" 
                    placeholder="Enter Project"
                    value={inputs.project || ""} 
                    onChange={handleChange}/>
                </div>

                <div className ="col">
                    <label htmlFor="type">Type<b>*</b></label>
                    <select 
                    name="type"
                    value={inputs.type} 
                    onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="Office">Office</option>
                        <option value="Work from Home">Work from Home</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                </div>

                <div className ="col">
                    <label htmlFor = "status">Status<b>*</b></label>
                    <select id="status"
                    name="status"
                    value={inputs.status} 
                    onChange={handleChange}required>
                        <option value="">Select Status</option>
                        <option value="Permanant">Permanant</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                </div>

                <div id="submit">
                    <button onClick={()=> navigate('/empdisplay')}type="button">Cancel</button>
                    <input type="submit" value="Confirm"/>
                </div>

            </form>
            </div>
        </div>
    );
}

export default Addemp;