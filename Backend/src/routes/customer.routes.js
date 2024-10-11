import express from 'express';
import { createCustomer, getAllCustomers, getCustomerById, updateCustomerById } from '../controller/customer.controller.js'
import verifyJWT from '../middleware/auth.middlewares.js'

const router = express.Router();

router.post('/create', verifyJWT, createCustomer);
router.get('/getCustomers',verifyJWT,getAllCustomers)
router.get('/getCustomers/:c',verifyJWT,getCustomerById)

router.patch('/update/:c',verifyJWT,updateCustomerById)

export default router;
