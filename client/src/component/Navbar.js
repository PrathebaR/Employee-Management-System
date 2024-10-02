import '../component/navbar.css';
import logo from'./logo.svg';

function Navbar(){
    return (
        <nav className = "nav">
            <h3>RS TECH</h3>
        
            <ul>
                <li><img src={logo} alt="Admin"></img></li>
                <li><span><i class="bi bi-bell-fill"></i></span></li>
                <li><span><i className="bi bi-gear-fill"></i></span></li>
            </ul>
        </nav>
    );
}

export default Navbar;