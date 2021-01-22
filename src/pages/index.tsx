import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


export default function Home() {
  
    const redirectToCheckout = async event => {
        event.preventDefault()
        const stripe = await loadStripe("pk_test_51ICPbvIoW5V7ZqlfNTRdR1YAhQjycy4hOCyWI3rpiUbsmXB3p1qpFkNX4yhTE6C5t3UsLup2XSYNYBI1mrQAE9Td00GvRbVDNE")
        const { error } = await stripe.redirectToCheckout({
          mode: "subscription",
          lineItems: [{ price: "price_1ICRUNIoW5V7ZqlfqltqaokE", quantity: 1 }],
          successUrl: `http://localhost:8000/payment-success/`,
          cancelUrl: `http://localhost:8000/payment-error/`,
        })
        if (error) {
          console.warn("Error:", error)
                    
        }
      }



    return <button onClick={redirectToCheckout}>Buy Laptops</button>
}