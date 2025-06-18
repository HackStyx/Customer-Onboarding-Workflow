import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-700">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">Here's what's happening with your account</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold w-20">Name:</span>
                  <span className="ml-2">{user.name}</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold w-20">Email:</span>
                  <span className="ml-2">{user.email}</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold w-20">GSTIN:</span>
                  <span className="ml-2">{user.gstin}</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold w-20">Status:</span>
                  <span className="ml-2 text-green-600 font-semibold">✓ Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">₹45,230</p>
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
                    <p className="text-gray-600 text-sm">Growth</p>
                    <p className="text-2xl font-bold text-gray-800">+12.5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Order #12345 completed</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">New product added</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Payment received</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">📦</div>
              <p className="font-semibold text-blue-700">New Order</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-semibold text-green-700">View Reports</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="font-semibold text-purple-700">Customers</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="font-semibold text-orange-700">Settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 