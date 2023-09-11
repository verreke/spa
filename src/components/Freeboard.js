import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, Input, FormControl, InputLabel, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function FreeBoard() {
    const [issues, setIssues] = useState([]);
    const [searchType, setSearchType] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const repoOwner = 'verreke';
    const repoName = 'freeboard';

    useEffect(() => {
        async function fetchIssues() {
            try {
                const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`);
                setIssues(response.data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        }
        fetchIssues();
    }, []);

    function handleSearch() {
        // GitHub의 Issue API로 검색 기능을 구현하려면 추가적인 로직이 필요합니다.
        // 현재는 단순히 searchTerm을 콘솔에 출력합니다.
        console.log(searchType, searchTerm);
    }

    return (
        <div>
            <h1>게시판 제목</h1>
            <div>
                <FormControl variant="outlined">
                    <InputLabel>Search Type</InputLabel>
                    <Select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <MenuItem value="title">제목</MenuItem>
                        <MenuItem value="body">내용</MenuItem>
                    </Select>
                </FormControl>
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                <Button onClick={handleSearch}>검색</Button>
                <Button>글쓰기</Button>
            </div>
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
                    {issues.map(issue => (
                        <TableRow key={issue.id}>
                            <TableCell>{issue.number}</TableCell>
                            <TableCell>{issue.title}</TableCell>
                            <TableCell>{issue.user.login}</TableCell>
                            <TableCell>{new Date(issue.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default FreeBoard;