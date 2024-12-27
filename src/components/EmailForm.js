import React, { useState } from 'react';
import { generateEmailTemplate } from './generateEmailTemplate';
import API from '../Hooks/Api';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    text: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate email HTML
    const emailBody = generateEmailTemplate({
      companyName: formData.companyName,
      text: formData.text,
    });

    const requestJSON = {
        subject: "Email from JOB DEKLO",
        body: emailBody,
        recipients: ["shashanklinga7@gmail.com"]
    }

    const response = await API.post('https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/mail/send-email', requestJSON);

    if (response.ok) {
      alert('Email sent successfully!');
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
