import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../styles/IssueDetail.css'; // 스타일시트 추가
import { Button, Typography, Paper, Divider } from '@mui/material';
import { useModal } from './ModalContext';

function IssueDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);
    const { openModal, closeModal } = useModal();

    const repoOwner = 'verreke';
    const repoName = 'freeboard';
    const token = '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';

    useEffect(() => {
        async function fetchIssue() {
            const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${id}`);
            setIssue(response.data);
        }
        fetchIssue();
    }, [id]);

    const handleDelete = async () => {
        try {
            openModal(
                <div>
                  <h1>삭제하시겠습니까?</h1>
                  <Button variant="contained" color="primary" onClick={closeModal}>취소</Button>
                  <Button variant="contained" color="primary" onClick={handleConfirmDelete}>삭제</Button>
                </div>
            );
        } catch (error) {
            console.error("Error deleting the issue:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.patch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${id}`, 
            { state: 'closed' },
            {
                headers: {
                    'Authorization': `token ${token}`,
                }
            });
            closeModal();
            navigate("/freeboard");
        } catch (error) {
            console.error("Error deleting the issue:", error);
        }
    };

    const handleEdit = () => {}

    if (!issue) return <div>Loading...</div>;

    return (
        <Paper className="issue-detail-container">
            <Typography variant="h4" component="h1" gutterBottom>
                {issue.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Written by: {issue.user.login} on {moment(issue.created_at).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
            <Divider className="divider-margin" />
            <Typography variant="body1" className="issue-body">
                {issue.body}
            </Typography>
            <Divider className="divider-margin" />
            <div className="issue-detail-actions">
                <div className="left-actions">
                    <Button variant="contained" color="primary" onClick={handleEdit}>수정</Button>
                    <Button variant="contained" color="primary" onClick={handleDelete}>삭제</Button>
                </div>
                <Button variant="contained" onClick={() => navigate('/freeboard')}>목록</Button>
            </div>
        </Paper>
    );
}

export default IssueDetail;
