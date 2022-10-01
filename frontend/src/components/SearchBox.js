import React, {useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='searchForm'>
            <Row>
                <Col xs={8} md={6}>
                    <Form.Control type='text'
                                  name='q'
                                  onChange={(e) => setKeyword(e.target.value)}
                                  placeholder='Search Products...'
                                  className='mr-sm-2 ml-sm-5'
                    />
                </Col>
                <Col xs={4} md={2}>
                    <Button type='submit' variant='outline-success' className='p-2'>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBox
