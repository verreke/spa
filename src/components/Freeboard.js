import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Select, Input, FormControl, InputLabel, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import '../styles/Freeboard.css';
import { useModal } from './ModalContext';

function FreeBoard() {
    const [issues, setIssues] = useState([]);
    const [searchType, setSearchType] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const { openModal, closeModal } = useModal();
    const issuesPerPage = 10;

    

    const navigate = useNavigate();

    const repoOwner = 'verreke';
    const repoName = 'freeboard';

    async function fetchIssues() {
        try {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`);
            console.log(response);
            setIssues(response.data);
        } catch (error) {
            console.error("Error fetching issues:", error);
        }
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    function handleSearch() {
        if( searchTerm === '') {
            openModal(
                <div>
                  <h1>검색어를 입력하세요.</h1>
                  <Button variant="contained" color="primary" onClick={closeModal}>확인</Button>
                </div>
            );
            return;
        }
        setIsSearching(true);
        setIssues(issues.filter( issue => issue.title.includes(searchTerm)));
    }

    const handleCancelSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        fetchIssues();
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleCreateIssue = () => {
        navigate('/createfreeissue');
    }

    const totalPages = Math.ceil(issues.length / issuesPerPage);
    const currentIssues = issues.slice((currentPage - 1) * issuesPerPage, currentPage * issuesPerPage);

    return (
        <div>
            <h1 className="title">자유게시판</h1>
            <div className="searchContainer">
                <FormControl variant="outlined" size="small">
                    <Select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <MenuItem value="title">제목</MenuItem>
                        <MenuItem value="body">내용</MenuItem>
                    </Select>
                </FormControl>
                <Input 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search..." 
                    className="searchInput"
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>검색</Button>
                {isSearching && <Button variant="contained" color="primary" onClick={handleCancelSearch}>검색취소</Button>}
                <Button variant="contained" color="primary" onClick={handleCreateIssue}>글쓰기</Button>
            </div>
            <Paper className="tableContainer">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>작성자</TableCell>
                            <TableCell>작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {issues.length > 0 ? (
                        currentIssues.map(issue => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.number}</TableCell>
                                <TableCell><Link to={`/freeissue/${issue.number}`}>{issue.title}</Link></TableCell>
                                <TableCell>{issue.user.login}</TableCell>
                                <TableCell>{new Date(issue.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} style={{textAlign: 'center'}}>등록된 게시글이 없습니다.</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                <Pagination
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    showFirstButton 
                    showLastButton 
                />
            </Paper>
        </div>
    );
}

export default FreeBoard;