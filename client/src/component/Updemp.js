import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../component/addemp.css';

function Updemp() {
    const { empid } = useParams();
    const [updemp, setUpdemp] = useState(null);
    const [load, setLoad] = useState(true);
    const [formData, setFormdata] = useState({
        image:'null',
        empname:'',
        empid:'',
        department:'',
        designation:'',
        project:'',
        type:'',
        status:''
    });
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3030/viewemp/${empid}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUpdemp(data);
                setLoad(false);
                setFormdata({
                    image: data.imagePath,
                    empname: data.empname,
                    empid: data.empid,
                    department: data.department,
                    designation: data.designation,
                    project: data.project,
                    type: data.type,
                    status: data.status,
                });
                setPreview(data.imagePath);
            })
            .catch((error) => console.error("Error Occurred", error));
    }, [empid]);

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value }); 
    }

    const handleFilechange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                    setFormdata({ ...formData, image: reader.result }); 
                }
                reader.readAsDataURL(file);
            }
        } else {
            setPreview(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3030/updemp/${empid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                image: formData.image,
                empname: formData.empname,
                empid: formData.empid,
                department: formData.department,
                designation: formData.designation,
                project: formData.project,
                type: formData.type,
                status: formData.status,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Employee's Details Updated Successfully", data);
            navigate('/empdisplay');
        })
        .catch((error) => console.error("Error Occurred during Updation", error));
    }

    if(load){
        return <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status"></div>
      </div>
    }

    return (
        <div className="forms">
            <h3><Link to="/empdisplay"><i className="bi bi-chevron-left"></i></Link> Edit Employee Details</h3>

            <div className="container">
                <h5><i className="bi bi-person-circle"></i> Personal Information</h5><hr></hr>
                {updemp ? (
                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <label htmlFor="image">

                            <div className="edit-image">
                            {preview ?
                            (<img src={preview} alt="Employee" />)
                            : (<div className="image-placeholder">
                                <i class="bi bi-camera"></i>
                            </div>
                            )}
                            </div>

                            <div className="overlay">
                                <div className="icon">
                                    <i className="bi bi-pencil-square"></i>

                                    <input type="file"
                                    name="image"
                                    onChange={handleFilechange} />
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="uname">Name*</label>
                            <input type="text"
                            name="empname"
                            value={formData.empname}
                            onChange={handleChange} required />
                        </div>
        
        {/* in update empid is set to readonly because the employee's id can't be changed */}
                        <div className="col">
                            <label htmlFor="empid">Employee ID*</label>
                            <input type="text"
                            name="empid"
                            value={formData.empid}
                            onChange={handleChange} readOnly />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="department">Department*</label>
                            <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange} required>
                            <option value="">Select Department</option>
                            <option value="Designing">Designing</option>
                            <option value="Development">Development</option>
                            <option value="Testing">Testing</option>
                            <option value="Business Development">Business Development</option>
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="designation">Designation*</label>
                            <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange} required>
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

                    <div className="row">
                        <div className="col">
                            <label htmlFor="project">Project*</label>
                            <input type="text"
                            name="project"
                            value={formData.project}
                            onChange={handleChange} required />
                        </div>

                        <div className="col">
                            <label htmlFor="type">Type*</label>
                            <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="Office">Office</option>
                            <option value="Work from Home">Work from Home</option>
                            <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="status">Status*</label>
                            <select id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange} required>
                            <option value="">Select Status</option>
                            <option value="Permanant">Permanant</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Terminated">Terminated</option>
                            </select>
                        </div>
                    </div>

                    <div id="submit">
                        <Link to='/empdisplay'><button type="button" className="btn">Cancel</button></Link>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
    
            ):(<div className="notfound"><h4>Employee's Data not Found</h4></div>)}
            
            </div>
        </div>
    );
}

export default Updemp;