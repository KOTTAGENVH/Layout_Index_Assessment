import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "../CSS/Signup.css";
import {useSignupMutation}from "../services/appApi";




function Signup() {

    const[name,setName] =useState('');
    const[address,setaddress] =useState('');
    const[phone,setphone] =useState('');
    const[email,setEmail] =useState('');
    const[password,setPassword] =useState('');
    
    
    const[signup,{error,isLoading,isError}] = useSignupMutation();


function handleSignup(e) {
        e.preventDefault();
        signup({ name, address, phone, email, password });
    }


  return (
    <Container>
    <Row>
        <Col md={6} className="signup_from--container">
            <Form style={{width:"100%"}} onSubmit={handleSignup} >
                <h1>Create an account</h1>
                {isError && <Alert variant="danger">{error.data}</Alert>}    
                         <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Your Name" value={name} required onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>


                       <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="" value={address} required onChange={(e) => setaddress(e.target.value)}/>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone number" value={phone} required onChange={(e) => setphone(e.target.value)}/>
                        </Form.Group>

                       <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Your Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                              
                        <Form.Group>
                            <p></p>
                            <Button type ="submit"disabled={isLoading}>
                                Create account
                            </Button>

                        </Form.Group>
                        <hr></hr>
                        <p> Dont have an account <Link to ="/login">login</Link>?</p>
            </Form>
        </Col>

    </Row>
 </Container>
  )
}

export default Signup
