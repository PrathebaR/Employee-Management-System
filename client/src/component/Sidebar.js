import {Link} from 'react-router-dom';
import '../component/sidebar.css';
function Sidebar(){

    return(
        <header className = "sidebar">
            
            <div className = "links">
                <Link to="/"><button id="top"><i class="bi bi-columns-gap"></i> Dashboard</button></Link>
                <Link to="/empdisplay"><button><i className="bi bi-person-square"></i> Employee</button></Link>
                <Link to="/"><button><i className="bi bi-calendar2-date-fill"></i> Calendar</button></Link>
                <Link to="/"><button><i className="bi bi-chat-left-text-fill"></i> Messages</button></Link>
            
            </div>

        </header>
    );
}

export default Sidebar;