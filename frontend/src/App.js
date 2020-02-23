import React, {useState, useEffect} from "react"
import Container from 'react-bootstrap/Container'
import Titles from './components/titles'
import View from './components/view'
import Edit from './components/edit'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {BrowserRouter, Switch, Route, Link, NavLink} from "react-router-dom"

const App = () => {

    const [hasError, setErrors] = useState(false);
    const [titles, setTitles] = useState([]);

    async function fetchData() {
        const res = await fetch("/articles");
        res
            .json()
            .then(res => setTitles(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    <Link to={`/`} className="navbar-brand">Wiki-Maker by Matt Skelton</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to={`/`}>Home Page</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Container>
                    <Switch>
                        <Route exact path="/" component={() => <Titles titles={titles}/>}/>)}/>
                        <Route path="/edit/:title" component={Edit}/>
                        <Route path="/:title" component={View}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;