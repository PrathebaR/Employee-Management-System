import '../component/searchadd.css';
import {Link} from 'react-router-dom';

function Search(){
    return (
        <div className="navbar navbar-light">
            <div className="container-fluid">
                <h2>Employee</h2>
                <form className="d-flex">
                    <i id="search" className="bi bi-search"></i>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    
                    <Link to="/addemp"><button className="btn">
                        <i id="add" className="bi bi-plus-circle"></i> Add New Employee
                    </button></Link>
                </form>
            </div>
        </div>
    );
}

export default Search;