import { Link } from 'react-router-dom'
import './styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-link">홈</Link>
            <Link to="/freeboard" className="navbar-link">자유게시판</Link>
            <Link to="/questionboard" className="navbar-link">질문게시판</Link>
        </div>
    );
}

export default Navbar;