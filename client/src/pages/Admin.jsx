import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('all');
  const { logout } = useAuth();

  useEffect(() => {
    axios.get('/api/users').then(res => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  // Filter and sort users
  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gstin.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => {
        if (statusFilter === 'active') return true; // All users are active for now
        if (statusFilter === 'inactive') return false; // No inactive users in current setup
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase();
        bValue = bValue?.toString().toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy, sortOrder, statusFilter]);

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSortBy('created_at');
    setSortOrder('desc');
  };

  const getActiveUsersCount = () => {
    return Math.max(users.length, 1); // Ensure at least 1 active user
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-red-700">Admin Dashboard</h1>
                <p className="text-gray-600">System overview and user management</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-gray-800">{getActiveUsersCount()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">New Today</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-800">+15%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Users Table */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-red-700">Registered Users</h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    Filter
                  </button>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search users by name, email, or GSTIN..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="md:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Showing {filteredUsers.length} of {users.length} users</span>
                  <span>Sorted by: {sortBy.replace('_', ' ')} ({sortOrder})</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200 rounded-lg">
                  <thead className="bg-red-50">
                    <tr>
                      <th 
                        className="px-4 py-3 border-b text-left font-semibold text-red-700 cursor-pointer hover:bg-red-100 transition-colors"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Name
                          {sortBy === 'name' && (
                            <svg className={`ml-1 w-4 h-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 border-b text-left font-semibold text-red-700 cursor-pointer hover:bg-red-100 transition-colors"
                        onClick={() => handleSort('email')}
                      >
                        <div className="flex items-center">
                          Email
                          {sortBy === 'email' && (
                            <svg className={`ml-1 w-4 h-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 border-b text-left font-semibold text-red-700 cursor-pointer hover:bg-red-100 transition-colors"
                        onClick={() => handleSort('gstin')}
                      >
                        <div className="flex items-center">
                          GSTIN
                          {sortBy === 'gstin' && (
                            <svg className={`ml-1 w-4 h-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 border-b text-left font-semibold text-red-700 cursor-pointer hover:bg-red-100 transition-colors"
                        onClick={() => handleSort('created_at')}
                      >
                        <div className="flex items-center">
                          Created At
                          {sortBy === 'created_at' && (
                            <svg className={`ml-1 w-4 h-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 border-b text-left font-semibold text-red-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border-b font-medium">{u.name}</td>
                          <td className="px-4 py-3 border-b">{u.email}</td>
                          <td className="px-4 py-3 border-b font-mono text-sm">{u.gstin}</td>
                          <td className="px-4 py-3 border-b text-sm">{new Date(u.created_at).toLocaleString()}</td>
                          <td className="px-4 py-3 border-b">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                              <button className="text-green-600 hover:text-green-800 text-sm">View</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          {searchTerm || statusFilter !== 'all' ? 'No users found matching your criteria' : 'No users found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-red-700 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">Database</span>
                  <span className="text-green-600 font-semibold">✓ Online</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">API Server</span>
                  <span className="text-green-600 font-semibold">✓ Running</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">Frontend</span>
                  <span className="text-green-600 font-semibold">✓ Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-semibold">Backup</span>
                  <span className="text-yellow-600 font-semibold">⚠ Pending</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-red-700 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">New user registered</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">System backup</p>
                    <p className="text-sm text-gray-600">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Analytics updated</p>
                    <p className="text-sm text-gray-600">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 