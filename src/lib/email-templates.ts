export const emailTemplates = {
  bookingConfirmedCustomer: (customerName: string, bookingNumber: string, serviceName: string, date: string, time: string, total: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Booking Confirmed!</h2>
      <p>Hi ${customerName},</p>
      <p>Your booking <strong>${bookingNumber}</strong> for <strong>${serviceName}</strong> is confirmed.</p>
      <p><strong>Date:</strong> ${date}<br><strong>Time:</strong> ${time}</p>
      <p><strong>Total:</strong> ₹${total}</p>
      <p>We'll notify you when your professional is assigned.</p>
    </div>
  `,
  
  jobAssignedProfessional: (proName: string, bookingNumber: string, serviceName: string, date: string, time: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">New Job Assigned</h2>
      <p>Hi ${proName},</p>
      <p>You have been assigned to booking <strong>${bookingNumber}</strong> for <strong>${serviceName}</strong>.</p>
      <p><strong>Date:</strong> ${date}<br><strong>Time:</strong> ${time}</p>
      <p>Please check your dashboard for address details.</p>
    </div>
  `,
  
  workerEnRoute: (customerName: string, proName: string, bookingNumber: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Your Professional is on the way!</h2>
      <p>Hi ${customerName},</p>
      <p><strong>${proName}</strong> is en route to your location for booking ${bookingNumber}.</p>
      <p>You can track their arrival live on your dashboard.</p>
    </div>
  `,
  
  jobCompleted: (customerName: string, bookingNumber: string, serviceName: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Service Completed</h2>
      <p>Hi ${customerName},</p>
      <p>Your service <strong>${serviceName}</strong> (Booking: ${bookingNumber}) has been completed successfully.</p>
      <p>Thank you for choosing MadClap!</p>
    </div>
  `,
  
  applicationReceived: (proName: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Application Received</h2>
      <p>Hi ${proName},</p>
      <p>We've received your application to join MadClap as a professional.</p>
      <p>Our team is reviewing your details and will get back to you shortly.</p>
    </div>
  `,
  
  applicationApproved: (proName: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Welcome to MadClap!</h2>
      <p>Hi ${proName},</p>
      <p>Congratulations! Your application has been approved.</p>
      <p>You can now log in to your dashboard and start receiving jobs.</p>
    </div>
  `,
  
  applicationRejected: (proName: string, reason: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Update on Your Application</h2>
      <p>Hi ${proName},</p>
      <p>Thank you for applying to MadClap. Unfortunately, we cannot approve your application at this time.</p>
      <p><strong>Reason:</strong> ${reason}</p>
    </div>
  `,
  
  bookingCancelled: (name: string, bookingNumber: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #000;">Booking Cancelled</h2>
      <p>Hi ${name},</p>
      <p>Booking <strong>${bookingNumber}</strong> has been cancelled.</p>
      <p>If you have any questions, please contact our support team.</p>
    </div>
  `
};
