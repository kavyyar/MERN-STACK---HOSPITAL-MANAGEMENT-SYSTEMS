import React, { useState, useEffect } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    patient: '',
    time: '',
  });

  useEffect(() => {
    fetch('http://localhost:1001/appointments', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT
      }
    })
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

  const handleAddAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:1001/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT
        },
        body: JSON.stringify(newAppointment),
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments([...appointments, data]); // Add the new appointment to the list
        setNewAppointment({ doctor: '', patient: '', time: '' }); // Reset the form
      } else {
        alert('Failed to add appointment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container1">
      <h1>Appointments</h1>
      <ul>
        {appointments.map(app => (
          <li key={app._id}>{app.doctor} with {app.patient} at {app.time}</li>
        ))}
      </ul>

      <form className="container2" onSubmit={handleAddAppointment}>
        
        <input type="text" placeholder="Doctor" value={newAppointment.doctor} onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })} required />
        <input type="text" placeholder="Patient" value={newAppointment.patient} onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })} required />
        <input type="text" placeholder="Time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} required />
        <button type="submit">Add Appointment</button>
        
      </form>
    </div>
  );
}

export default Appointments;
