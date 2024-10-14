import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import '../component/empdisplay.css';
import Searchadd from './Searchadd';

function Empdisplay(){
    const [empvalue, setEmpvalue] = useState([]);
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [delemp, setDelemp] = useState(null);
    
    useEffect(()=>{
        fetch('http://localhost:3030/empdisplay')
        .then((response) =>
            response.json())
        .then((data)=>{
            setEmpvalue(data);
        })
        .catch((error)=>{
            console.error("Error Occurred",error);
        })
    }, []);
    
    const handleDelete = (empid) =>{
        setAlert(true);
        setDelemp(empid);
    }

    const onCancel = () =>{
        setAlert(false);
        setDelemp(null);
        navigate(0);
    }

    const onDelete = () =>{
        if(delemp){
            fetch(`http://localhost:3030/delemp/${delemp}`,{
                method:"DELETE",
            })
            .then((response)=>{
                response.json();
            })
            .then((data)=>{
                console.log("Employee Deleted Successfully!!!",data);
                setAlert(false);
                setDelemp(null);
            })
            .catch((error) => {console.error("Error in Deletion",error);
            setAlert(false)
            });

            navigate(0);
        }

    };
    
    return (
        <div>
            <Searchadd/>
            <div>
                {empvalue.length >0 ? (
                    <table className ="table table-light table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Project</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {empvalue.map((employees, index) => (
                                <tr key={index}>
                                    <td><img src={employees.imagePath} alt="Employee"></img>
                                    {employees.empname}</td>
                                    <td>{employees.empid}</td>
                                    <td>{employees.department}</td>
                                    <td>{employees.designation}</td>
                                    <td>{employees.project}</td>
                                    <td>{employees.type}</td>
                                    <td>{employees.status}</td>

                                    <td id="btn">
                                        <Link to={`/viewemp/${employees.empid}`}><button><i className="bi bi-eye-fill"></i> </button></Link>
                                        <Link to={`/updemp/${employees.empid}`}><button><i className="bi bi-pen-fill"></i></button></Link>
                                        <button onClick={()=> handleDelete(employees.empid)}><i className="bi bi-trash-fill"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ) : (<table className = "table table-light table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Employee Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Project</th>
                                <th scope="col">Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <caption>No Record Found</caption></table>)}
            </div> 

            {alert && (
            <div className="popup">
            <div className="popup-inner">
                <div className="trash">
                    <i className = "bi bi-trash fill"></i>
                </div>
                
                <h5>Are you sure you want to Delete</h5>
                <div className="popup-actions">
                    <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
                    <button className="btn" id="btn-yes" onClick={onDelete}>Yes</button>
                </div>
            </div>
        </div>
        )}

        </div>

    );
}

export default Empdisplay;