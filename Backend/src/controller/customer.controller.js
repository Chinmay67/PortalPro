import { logActivity } from '../utils/logger.js';
import Customer from '../models/customer.model.js';
import { generatePDF } from '../utils/generatePdf.js';
import { triggerWebhook } from '../utils/WebHookService.js';

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, age, gender } = req.body;
    const userId=req.user.googleId
    console.log(userId)
    const customer = await Customer.create({ name, email, phone, age, gender ,userId});

    const pdfUrl = await generatePDF(customer);
    customer.pdfUrl = pdfUrl;
    await customer.save();

   

    await logActivity(req.user.userId, 'Created customer record');

    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getAllCustomers=async(req,res)=>{
  const id=req.user.googleId
  try {
    const  customers = await Customer.findAll({
      where:{
        userId:id
      }
    })
   
    res.status(201).json({
      message:"customers created successfully",customers
    })

  } catch (error) {
    res.status(500).send("unable to fetch customers")
  }
}
export const getCustomerById=async(req,res)=>{
  const id=req.params.id
  try {
    const customers=await Customer.findOne({
      where:{
        id:id
      }
    })
    res.status(201).json({message:"customer fetched successfully"} , customers)
  } catch (error) {
    res.status(500).send("unable to fetch customer")
  }
}


// import { generatePDF } from './path-to-your-generatePDF-function';// Import your PDF generation function

export const updateCustomerById = async (req, res) => {
  try {
    const id = req.params.c;
    const newData = req.body;

    // Find the customer by ID
    console.log(req.body);
    const customer = await Customer.findByPk(id);

    // Check if the customer exists
    if (!customer) {
      return res.status(404).json({ error: `Customer with ID ${id} not found.` });
    }

    // Update the customer data
    await Customer.update(newData, {
      where: { id: id },
    });

    // Fetch the updated customer details
    const updatedCustomer = await Customer.findByPk(id);

    // Generate new PDF and replace the old one
    const pdfUrl = await generatePDF(updatedCustomer);  // Call the PDF generation function

    // Respond with the updated customer and PDF URL
    return res.status(200).json({
      message: "Customer updated successfully",
      updatedCustomer,
      pdfUrl  // Include the updated PDF URL in the response
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return res.status(500).json({ message: 'Error updating customer' });
  }
};
