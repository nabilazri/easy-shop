import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Button, Form} from 'react-bootstrap'
import {Link} from "react-router-dom"
import FormContainer from '../components/FormContainer'
import Message from "../components/Message"
import Loader from "../components/Loader"
import {listProductDetails, updateProduct} from "../actions/productActions"
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants"
import axios from "axios";

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setCategory(product.category)
                setBrand(product.brand)
                setImage(product.image)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, history, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {
                    loading ? <Loader/> : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='name' placeholder='Enter name' value={name}
                                              onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number' placeholder='Enter price' value={price}
                                              onChange={(e) => setPrice(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text' placeholder='Enter image url' value={image}
                                              onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>
                                <Form.File id='image-file' label='Choose File' custom
                                           onChange={uploadFileHandler}>
                                </Form.File>
                                {uploading && <Loader/>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand' value={brand}
                                              onChange={(e) => setBrand(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='countInStock'>
                                <Form.Label>Count In stock</Form.Label>
                                <Form.Control type='number' placeholder='Enter countInStock' value={countInStock}
                                              onChange={(e) => setCountInStock(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' placeholder='Enter category' value={category}
                                              onChange={(e) => setCategory(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text' placeholder='Enter description' value={description}
                                              onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
