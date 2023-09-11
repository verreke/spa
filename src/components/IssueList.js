import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/IssueList.css'

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();

        // Check if the date is today
        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });  // If today, return only the time
        } else {
            return date.toLocaleString();  // Otherwise, return the full date and time
        }
    }

    return (
        <div>
            <h2>{header}</h2>
            <div className='container'>
                <ul className='issueList'>
                    {issues.map(issue => (
                        <li key={issue.id} className='issueItem'>
                            <Link to="/freeboard">{issue.title}</Link>
                            <span>{formatDate(issue.created_at)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IssueList;
