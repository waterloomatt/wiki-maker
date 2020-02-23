import React, {useEffect, useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

const Titles = (props) => {

    function counterMessage()
    {
        const verb = props.titles.length === 1 ? ' is ' : ' are ';
        const noun = props.titles.length === 1 ? 'entry' : 'entries';

        return `There ${verb} ${props.titles.length} ${noun}. Keep adding more!`;
    }

    return (
        <div>
            <p>Welcome to the Wiki-Maker. {counterMessage()}</p>
            <ListGroup>
                {props.titles.map((title) => {
                    return (
                        <ListGroup.Item key={title}><Link to={`/${title}`}>{title}</Link></ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    );
}

export default Titles