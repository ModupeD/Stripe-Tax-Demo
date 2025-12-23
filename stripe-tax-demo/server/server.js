require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/calculate-tax', async (req, res) => {
  try {
    const { amount, currency, customerDetails } = req.body;

    const taxCalculation = await stripe.tax.calculations.create({
      currency,
      line_items: [
        {
          amount: amount * 100, 
          reference: 'product_ref_123',
          tax_code: 'txcd_99999999',
        },
      ],
      customer_details: {
        address: {
          line1: customerDetails.address,
          city: customerDetails.city,
          state: customerDetails.state,
          postal_code: customerDetails.postalCode,
          country: customerDetails.country,
        },
        address_source: 'billing',
      },
    });

    const taxAmountCents = taxCalculation.tax_amount_exclusive || 0;
    const totalAmountCents = taxCalculation.amount_total || (amount * 100 + taxAmountCents);
    const taxRate = parseFloat(taxCalculation.tax_breakdown?.[0]?.tax_rate_details?.percentage_decimal || 0);
    const taxType = taxCalculation.tax_breakdown?.[0]?.tax_rate_details?.tax_type || 'unknown';

    res.json({
      subtotal: amount,
      taxAmount: taxAmountCents / 100,
      total:totalAmountCents / 100,
      taxRate:taxRate,
      taxType: taxType,
    });
  } catch (error) {
    console.error('Error calculating tax:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
