import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import React from 'react';

// API Key setup
const resend = new Resend(process.env.RESEND_API_KEY || 're_YOUR_API_KEY');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, amount, orderId } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Lumina <onboarding@resend.dev>', 
      to: [email],
      subject: `Order Confirmed: ${orderId}`,
      // Proper JSX usage to avoid Promise<ReactNode> error
      react: <EmailTemplate name={name} orderId={orderId} amount={amount} />,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: "Receipt sent successfully", data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}