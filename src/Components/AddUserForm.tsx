import React, { useState } from 'react';
import * as comp from '../Helpers/react_bootstrapComp'

interface AddUserFormProps {
  onUserAdded: () => void; // Callback function from parent
}

export default function AddUserForm(props: AddUserFormProps) {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    displayName: '',
    email: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Encode path variables to safely handle special characters in password/username
    const encodedPassword = encodeURIComponent(formData.password);
    const encodedUser = encodeURIComponent(formData.userName);

    try {
      const response = await fetch(
        `https://localhost:7285/api/LabbApi/Users/Add/${encodedPassword}/${encodedUser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: '',
            displayName: formData.displayName || null,
            userName: formData.userName,
            email: formData.email,
            createdDate: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status} + and info: `);
      }

      setMessage({ type: 'success', text: 'User created successfully!' });
      
      // Reset form fields
      setFormData({
        userName: '',
        password: '',
        displayName: '',
        email: '',
      });
        props.onUserAdded();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      setMessage({ type: 'danger', text: `Failed to add user: ${errorMsg}` });
    } finally {
      setLoading(false);
    }
  };  
  return (
    <comp.Container className="mt-4" style={{ maxWidth: '500px' }}>
      <comp.Card className="shadow-sm">
        <comp.Card.Body>
          <comp.Card.Title className="mb-3">Add New User</comp.Card.Title>

          {message && <comp.Alert variant={message.type}>{message.text}</comp.Alert>}

          <comp.Form onSubmit={handleSubmit}>
            <comp.Form.Group className="mb-3" controlId="userName">
              <comp.Form.Label>Username</comp.Form.Label>
              <comp.Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </comp.Form.Group>

            <comp.Form.Group className="mb-3" controlId="password">
              <comp.Form.Label>Password</comp.Form.Label>
              <comp.Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </comp.Form.Group>

            <comp.Form.Group className="mb-3" controlId="displayName">
              <comp.Form.Label>Display Name</comp.Form.Label>
              <comp.Form.Control
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Enter display name (optional)"
              />
            </comp.Form.Group>

            <comp.Form.Group className="mb-3" controlId="email">
              <comp.Form.Label>Email Address</comp.Form.Label>
              <comp.Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </comp.Form.Group>

            <comp.Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? 'Adding User...' : 'Add User'}
            </comp.Button>
          </comp.Form>
        </comp.Card.Body>
      </comp.Card>
    </comp.Container>
  );
}