import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IssueList({ header, repository }) {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        async function fetchIssues() {
            const { owner, name } = repository;

            try {
                const response = await axios.get(`https://api.github.com/repos/${owner}/${name}/issues?per_page=5`);

                setIssues(response.data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        }

        fetchIssues();
    }, [repository]);

    return (
        <div>
            <h2>{header}</h2>
            <ul>
                {issues.map(issue => (
                    <li key={issue.id}>
                        <Link to="/freeboard">{issue.title}</Link> - {new Date(issue.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IssueList;