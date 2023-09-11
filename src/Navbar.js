import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <Link to="/">홈</Link>
            <Link to="/freeboard">자유게시판</Link>
            <Link to="/questionboard">질문게시판</Link>
        </nav>
    );
}

export default Navbar;