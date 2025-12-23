# Stripe Tax Calculator Demo

This is a demo application that showcases Stripe's Tax API for calculating sales tax based on customer addresses. The application consists of a React frontend and a Node.js backend.

## Features

- Calculate sales tax based on customer address
- Real-time tax calculation using Stripe's Tax API
- Responsive design that works on mobile and desktop
- Clean and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Stripe account with API keys

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with your Stripe secret key:
   ```
   PORT=5000
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. In a new terminal, navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## How It Works

1. Enter an amount in USD
2. Fill in the customer's address details
3. Click "Calculate Tax" to see the tax calculation
4. The application will display the subtotal, tax amount, and total

## Technologies Used

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js, Express, Stripe API
- **Build Tools**: Create React App

## Environment Variables

### Backend
- `PORT`: The port number for the backend server (default: 5000)
- `STRIPE_SECRET_KEY`: Your Stripe secret key

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository.
