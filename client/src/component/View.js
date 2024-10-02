import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import '../component/view.css';

function View(){

    const {empid} = useParams();
    const [empView, setEmpview] = useState(null);
    const [preview, setPreview] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:3030/viewemp/${empid}`)
        .then((response)=> response.json())
        .then((data)=>{
            setEmpview(data);
            setPreview(data.imagePath);
            setLoad(false);
        })
        .catch((error)=> console.error("Error OCCurred",error))
    }, [empid]);

    if(load){
        return <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status"></div>
      </div>
    }
    
    return (
        
        <div className = "viewforms">
            <h3><Link to="/empdisplay"><i class="bi bi-chevron-left"></i></Link> View Employee Details</h3>
 
            <div className = "container">    
                <h5><i className="bi bi-person-circle"></i> Personal Information</h5><hr></hr>

                {empView ? (
                <form>
                <div className = "row">
                    <label htmlFor="image">
                        <div className="edit-image">
                        {preview ?
                            (<img src={preview} alt="Employee" />)
                            : (<div className="image-placeholder">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            )}
                        </div>
                        
                    </label>
                </div>

                <div className = "row">
                <div className = "col">
                    <label htmlFor="uname">Name*</label>
                    <input type="text" 
                    value = {empView.empname} readOnly/>
                    
                </div>

                <div className = "col">
                    <label htmlFor="empid">Employee ID*</label>
                    <input value={empView.empid} readOnly/>
                </div>
                </div><hr></hr>

                <div className = "row">
                <div className ="col">
                    <label htmlFor = "department">Department*</label>
                    <input value={empView.department} readOnly/>
                </div>

                <div className = "col">
                    <label htmlFor="designation">Designation*</label>
                    <input value={empView.designation} readOnly/>       
                </div>
                </div><hr></hr>

                <div className ="row">
                <div className ="col">
                <label htmlFor = "project">Project*</label>
                    <input value={empView.project} readOnly/>
                </div>

                <div className ="col">
                    <label htmlFor="type">Type*</label>
                    <input value={empView.type} readOnly/>
                </div>
                </div><hr></hr>

                <div className ="col">
                    <label htmlFor = "status">Status*</label>
                    <input id="status" value={empView.status} readOnly/>
                </div>

                </form>):(<div className="notfound"><h4>Employee's Data not Found</h4></div>)}
            </div>
        </div>
    );
}

export default View;