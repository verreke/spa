import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateQuestionIssue() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');
    
    const navigate = useNavigate();

    const repoOwner = 'verreke';
    const repoName = 'questionboard';
    const token = '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';

    async function handleSubmit() {
        // Validation
        if (!title) {
            setTitleError('제목을 입력해주세요');
            return;
        }
        if (!body) {
            setBodyError('내용을 입력해주세요');
            return;
        }

        try {
            await axios.post(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
                title: title,
                body: body
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            navigate('/questionboard');
        } catch (error) {
            console.error("Error creating issue:", error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <h1>글쓰기</h1>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="제목"
                name="title"
                autoFocus
                value={title}
                onChange={(e) => { setTitle(e.target.value); setTitleError(''); }}
                error={!!titleError}
                helperText={titleError}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                rows={4}
                id="body"
                label="내용"
                name="body"
                value={body}
                onChange={(e) => { setBody(e.target.value); setBodyError(''); }}
                error={!!bodyError}
                helperText={bodyError}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                등록하기
            </Button>
        </Container>
    );
}

export default CreateQuestionIssue;
