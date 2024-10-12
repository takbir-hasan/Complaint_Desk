import Donation from '../model/donation.model.js';
import SSLCommerzPayment from 'sslcommerz-lts';
import dotenv from 'dotenv';

dotenv.config(); 

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox


export const donor = async (req, res) => {
      try {
            const amount = req.body.amount;
            const donate  = new Donation({
                  amount
            });
            const result = await donate.save();
            const transactionId = result._id;
               const data = {
                      total_amount: amount,
                      currency: 'BDT',
                      tran_id: 'REF123', 
                      success_url:`${process.env.CLIENT_URL}/done/${'successful'}`,
                      fail_url: `${process.env.CLIENT_URL}/fail/${transactionId}`,
                      cancel_url:`${process.env.CLIENT_URL}/donation`,
                      ipn_url: `${process.env.CLIENT_URL}/ipn`,
                      shipping_method: 'Courier',
                      product_name: 'Computer.',
                      product_category: 'Electronic',
                      product_profile: 'general',
                      cus_name: 'Customer Name',
                      cus_email: 'customer@example.com',
                      cus_add1: 'Dhaka',
                      cus_add2: 'Dhaka',
                      cus_city: 'Dhaka',
                      cus_state: 'Dhaka',
                      cus_postcode: '1000',
                      cus_country: 'Bangladesh',
                      cus_phone: '01711111111',
                      cus_fax: '01711111111',
                      ship_name: 'Customer Name',
                      ship_add1: 'Dhaka',
                      ship_add2: 'Dhaka',
                      ship_city: 'Dhaka',
                      ship_state: 'Dhaka',
                      ship_postcode: 1000,
                      ship_country: 'Bangladesh',
                  };
                  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
                  sslcz.init(data).then(async apiResponse => {
                      // Redirect the user to payment gateway
                      let GatewayPageURL = apiResponse.GatewayPageURL
                      res.send({url: GatewayPageURL})

                      console.log('Redirecting to: ', GatewayPageURL)
                  });                
            
          } catch (error) {
            console.error('Error saving data:', err);
            res.status(500).send(err);
          }
};


