import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { loadStripe } from '@stripe/stripe-js';


export default function Home() {

    const redirectToCheckout = async (event, pId) => {
        event.preventDefault()
        const stripe = await loadStripe("pk_test_51ICPbvIoW5V7ZqlfNTRdR1YAhQjycy4hOCyWI3rpiUbsmXB3p1qpFkNX4yhTE6C5t3UsLup2XSYNYBI1mrQAE9Td00GvRbVDNE")
        const { error } = await stripe.redirectToCheckout({
            mode: "subscription",
            lineItems: [{ price: pId, quantity: 1 }],
            successUrl: `http://localhost:8000/payment-success/`,
            cancelUrl: `http://localhost:8000/payment-error/`,
        })
        if (error) {
            console.warn("Error:", error)

        }
    }

    const data = useStaticQuery(graphql`
    query MyQuery {
        allStripePrice {
          edges {
            node {
              product {
                id
                description
                name
                updated
                images
              }
              id
            }
          }
        }
      }
      
    `)

    console.log(data);

    return <div>
        <h1>Products</h1>
        {
            data.allStripePrice.edges.map(({ node }) => {
                return <div key={node.id}>
                    <p>{node.product.name}</p>
                    <p>{node.product.description}</p>
                    <img src={node.product.images[0]} />
                    <button onClick={(e)=> redirectToCheckout(e,node.id)}>Buy {node.product.name}</button>
                </div>
            })
        }
 
    </div>
}