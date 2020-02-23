import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Markdown from "react-markdown";
import {addNotification} from "./notification";

const Edit = (props) => {
    const [hasError, setErrors] = useState(false);
    const [body, setBody] = useState('');
    const title = props.match.params.title;

    async function fetchData() {
        const res = await fetch("/articles/" + title);
        res
            .text()
            .then(res => setBody(res))
            .catch((err) => {
                addNotification('danger', err);
                setErrors(err)
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleChange(event) {
        setBody(event.target.value);
    }

    function handleSubmit(event) {

        event.preventDefault();

        fetch('/articles/' + title, {
            method: 'PUT',
            body: body
        }).then((response) => {
            addNotification('success', 'Wiki page saved successfully.');
            props.history.push(`/${title}`);
        })
    }

    return (
        <div>
            <h1>{title}</h1>

            <hr/>

            <div className="row">
                <div className="col-8">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={body}
                            onChange={handleChange}
                            cols={80}
                            rows={10}
                            className="form-control"/>
                        <br/>

                        <Button variant="primary" type="submit">Submit</Button>
                        <span> </span>
                        <Link to={'/' + title} className="btn btn-secondary">Cancel</Link>
                    </form>
                </div>

                <div className="col-4">
                    <Markdown source={body}/>
                </div>
            </div>
        </div>
    );
}

export default Edit