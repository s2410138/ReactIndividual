import { useEffect, useState } from 'react';
import * as comp from '../Helpers/react_bootstrapComp';
import UserCard from './Usercard.tsx';
import AddUserForm from '../Components/AddUserForm.tsx'
import SearchForm from '../Components/SearchForm.tsx'

export interface User{
  id: number;
  displayName: string;
  username: string;
  email: string;
  createdDate: string;
}

function UserList() {
  // Variables
  const [searchTerm, setSearchTerm] = useState('');
  const [Users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch users (either all or filtered by name)
  const fetchUsers = async (nameQuery?: string) => {
    setLoading(true);
    setError(null);

    try {
      // If a search term exists, append it to the route. Otherwise, fetch all users.
      const url = nameQuery && nameQuery.trim() !== ''
        ? `https://localhost:7285/api/LabbApi/Users/${encodeURIComponent(nameQuery)}`
        : 'https://localhost:7285/api/LabbApi/Users';

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          setUsers([]);
          throw new Error(`User '${nameQuery}' was not found.`);
        }
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      
      setUsers(data);

    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMsg);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users automatically when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission / search button click
  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };

  // Reset method to clear search and fetch all users again
  const handleReset = () => {
    setSearchTerm('');
    fetchUsers();
  };

  return (
    <div className="py-4 bg-secondary text-white shadow-sm">
      <comp.Container >
        <AddUserForm onUserAdded={fetchUsers}></AddUserForm>
      </comp.Container>
    <comp.Container>
      <h2 className="mb-4">User Search</h2>

      {/* Search Form */}
      <SearchForm Form_OnSubmit={handleSearch} ButtonDisabled={loading} 
      ButtonHandleReset={handleReset} FormControl_Value={searchTerm} FormControl_onChange={setSearchTerm}
      />

      {/* Error or Not Found Message */}
      {error && <comp.Alert variant="warning">{error}</comp.Alert>}
      
      {/* Show Results */} 
      <h1>Users</h1>     
      <comp.Row xs={1} md={2} lg={3} className="g-4">
        {Users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </comp.Row>
    </comp.Container>
    <comp.Button onClick={handleReset} className="m-3">Reload</comp.Button>
  </div>
  );
}

export default UserList;