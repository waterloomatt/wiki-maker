import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Markdown from "react-markdown";
import {Notification} from './notification'

const View = (props) => {
    const [hasError, setErrors] = useState(false);
    const [body, setBody] = useState('');
    const title = props.match.params.title;

    async function fetchData() {
        fetch("/articles/" + title)
            .then((response) => {
                if (response.status !== 200) {
                    return new Promise((resolve, reject) => {
                        resolve('No article with this exact name found. Use Edit button in the header to add it.');
                    });
                }

                return response.text();
            })
            .then(res => setBody(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

            <h1>{title} <Link to={`/edit/${title}`} className="btn btn-primary">Edit this page</Link></h1>

            <hr/>

            <Notification/>

            <Markdown source={body}/>
        </div>
    );
}

export default View