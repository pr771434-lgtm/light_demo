import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  orderId: string;
  amount: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, orderId, amount
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
    <h1 style={{ color: '#3b82f6' }}>LUMINA - Order Confirmed!</h1>
    <p>Hi {name},</p>
    <p>Thank you for your purchase. Your order has been successfully placed.</p>
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Amount Paid:</strong> ₹{amount}</p>
    </div>
    <p>We will deliver your lights soon!</p>
  </div>
);