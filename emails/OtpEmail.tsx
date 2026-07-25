import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';

interface OtpEmailProps {
  otp: string;
}

export default function OtpEmail({ otp }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Cue7Club Login Code is {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Cue7Club</Heading>
          <Text style={text}>
            Here is your one-time password (OTP) to sign in to your Cue7Club account:
          </Text>
          
          <Section style={codeBox}>
            <Text style={code}>{otp}</Text>
          </Section>
          
          <Text style={text}>
            This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            © {new Date().getFullYear()} Cue7Club. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#0a0f1e', // Brand Navy
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#111827',
  margin: '40px auto',
  padding: '40px',
  borderRadius: '12px',
  border: '1px solid #1f2937',
  maxWidth: '600px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 20px 0',
};

const text = {
  color: '#9ca3af',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px 0',
};

const codeBox = {
  background: '#1f2937',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  textAlign: 'center' as const,
};

const code = {
  color: '#00D4AA', // Brand Teal
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
};

const hr = {
  borderColor: '#374151',
  margin: '30px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'center' as const,
};
