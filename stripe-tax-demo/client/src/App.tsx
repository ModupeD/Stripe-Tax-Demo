import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface TaxResult {
  subtotal: number;
  taxAmount: number;
  total: number;
  taxRate: number;
  taxType: string;
}

function App() {
  const [amount, setAmount] = useState<number>(100);
  const [customerDetails, setCustomerDetails] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });
  const [result, setResult] = useState<TaxResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTax = async () => {
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5001/api/calculate-tax', {
        amount,
        currency: 'usd',
        customerDetails,
      });
      
      console.log('Tax calculation response:', response.data);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to calculate tax');
      console.error('Error calculating tax:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Stripe Tax Calculator
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="Amount (USD)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              placeholder="123 Main St"
            />
            
            <TextField
              fullWidth
              label="City"
              name="city"
              value={customerDetails.city}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="State/Province"
                name="state"
                value={customerDetails.state}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={customerDetails.postalCode}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
              />
            </Box>
            
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={customerDetails.country}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              disabled
              helperText="Currently only US addresses are supported"
            />
            
            <Box mt={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={calculateTax}
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate Tax'}
              </Button>
            </Box>
            
            {error && (
              <Box mt={2} color="error.main">
                <Typography variant="body2">{error}</Typography>
              </Box>
            )}
          </Box>
          
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tax Calculation
                </Typography>
                
                {result ? (
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>Subtotal:</Typography>
                      <Typography>${result.subtotal}</Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>
                        Tax ({result.taxType} @ {result.taxRate}%):
                      </Typography>
                      <Typography>${result.taxAmount}</Typography>
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mt={2} pt={2} sx={{ borderTop: '1px solid #e0e0e0' }}>
                      <Typography variant="subtitle1">
                        <strong>Total:</strong>
                      </Typography>
                      <Typography variant="subtitle1">
                        <strong>${result.total}</strong>
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Enter an amount and customer details to calculate tax.
                  </Typography>
                )}
              </CardContent>
            </Card>
            
            <Box mt={3} p={2} bgcolor="#f5f5f5" borderRadius={1}>
              <Typography variant="body2" color="textSecondary">
                <strong>Note:</strong> This demo uses Stripe's Tax API to calculate sales tax based on the customer's address.
                For demonstration purposes, it's pre-configured for US addresses only.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
