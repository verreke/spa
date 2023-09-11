import React, { useState } from 'react';
import axios from 'axios';

function CreateIssue() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async () => {
        const token = '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'; // GitHub의 Personal Access Token
        const repoOwner = 'verreke';
        const repoName = 'freeboard';

        try {
            const response = await axios.post(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
                title: title,
                body: body
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            
            if (response.status === 201) {
                alert('Issue created successfully!');
            } else {
                alert('Error creating issue.');
            }
        } catch (error) {
            console.error("There was an error creating the issue", error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Issue Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="Issue Body" 
                value={body} 
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit}>Submit Issue</button>
        </div>
    );
}

export default CreateIssue;