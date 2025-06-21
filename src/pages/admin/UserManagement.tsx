
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserPlus
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      totalSessions: 47,
      avgAccuracy: 89,
      totalHours: 12.5
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      totalSessions: 32,
      avgAccuracy: 92,
      totalHours: 8.3
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      lastActive: '2024-01-20',
      totalSessions: 15,
      avgAccuracy: 95,
      totalHours: 4.2
    },
    {
      id: 4,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastActive: '2024-01-12',
      totalSessions: 8,
      avgAccuracy: 76,
      totalHours: 2.1
    }
  ];

  const activityLogs = [
    {
      userId: 1,
      userName: 'John Doe',
      action: 'Started transcription session',
      timestamp: '2024-01-20 14:30:00',
      details: 'Real-time session, 15 minutes'
    },
    {
      userId: 2,
      userName: 'Jane Smith',
      action: 'Completed educational quiz',
      timestamp: '2024-01-20 13:45:00',
      details: 'Vowel Recognition Quiz - Score: 92%'
    },
    {
      userId: 1,
      userName: 'John Doe',
      action: 'Updated profile settings',
      timestamp: '2024-01-20 12:15:00',
      details: 'Changed transcription format'
    },
    {
      userId: 4,
      userName: 'Mike Johnson',
      action: 'Login attempt',
      timestamp: '2024-01-19 09:30:00',
      details: 'Last login session'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            Manage users, monitor activity, and review performance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Accounts
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Activity Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">User</th>
                      <th className="text-left p-3 font-medium">Role</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Last Active</th>
                      <th className="text-left p-3 font-medium">Sessions</th>
                      <th className="text-left p-3 font-medium">Accuracy</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-600">
                          {user.lastActive}
                        </td>
                        <td className="p-3 text-sm">
                          {user.totalSessions}
                        </td>
                        <td className="p-3 text-sm">
                          <span className={user.avgAccuracy >= 90 ? 'text-green-600' : user.avgAccuracy >= 80 ? 'text-yellow-600' : 'text-red-600'}>
                            {user.avgAccuracy}%
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">1,089</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">158</div>
                <div className="text-sm text-gray-600">Inactive Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-600">Admin Users</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Monitor user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{log.userName}</span>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">{log.action}</div>
                      <div className="text-xs text-gray-500">{log.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
