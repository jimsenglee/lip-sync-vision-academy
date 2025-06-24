
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { useFeedbackToast } from '@/components/ui/feedback-toast';
import CrudModal from '@/components/ui/crud-modal';
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast = useFeedbackToast();

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
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-primary/10 text-primary border-primary/20';
      case 'user': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = () => {
    toast.success("User updated successfully", "User information has been saved.");
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    toast.success("User deleted", "The user has been removed from the system.");
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const breadcrumbItems = [
    { title: 'Admin', href: '/admin' },
    { title: 'User Management' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <BreadcrumbNav items={breadcrumbItems} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage users, monitor activity, and review performance
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/5 border border-primary/20">
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Users className="h-4 w-4" />
            User Accounts
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Eye className="h-4 w-4" />
            Activity Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-primary/20 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/10">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-primary/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-primary">User Accounts ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left p-3 font-medium text-primary">User</th>
                      <th className="text-left p-3 font-medium text-primary">Role</th>
                      <th className="text-left p-3 font-medium text-primary">Status</th>
                      <th className="text-left p-3 font-medium text-primary">Last Active</th>
                      <th className="text-left p-3 font-medium text-primary">Sessions</th>
                      <th className="text-left p-3 font-medium text-primary">Accuracy</th>
                      <th className="text-left p-3 font-medium text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-primary/5 transition-colors animate-fade-in" style={{ animationDelay: `${user.id * 100}ms` }}>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={`${getRoleColor(user.role)} border`}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={`${getStatusColor(user.status)} border`}>
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
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleEditUser(user)}
                              className="border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteUser(user)}
                              className="border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-105"
                            >
                              <Trash2 className="h-4 w-4" />
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
            {[
              { title: 'Total Users', value: '1,247', color: 'text-primary' },
              { title: 'Active Users', value: '1,089', color: 'text-green-600' },
              { title: 'Inactive Users', value: '158', color: 'text-yellow-600' },
              { title: 'Admin Users', value: '12', color: 'text-secondary' }
            ].map((stat, index) => (
              <Card key={index} className="border-primary/20 animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="border-primary/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-primary">Recent Activity</CardTitle>
              <CardDescription>Monitor user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-primary">{log.userName}</span>
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

      {/* Edit User Modal */}
      <CrudModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
        description="Update user information and permissions"
        onSave={handleSaveUser}
        saveLabel="Save Changes"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Name</label>
            <Input defaultValue={selectedUser?.name} className="border-primary/20 focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Email</label>
            <Input defaultValue={selectedUser?.email} className="border-primary/20 focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Role</label>
            <select className="w-full p-2 border border-primary/20 rounded-md focus:border-primary focus:ring-primary/20">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </CrudModal>

      {/* Delete Confirmation Modal */}
      <CrudModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        onDelete={handleConfirmDelete}
        deleteLabel="Delete User"
      >
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            This will permanently remove the user and all associated data from the system.
          </p>
        </div>
      </CrudModal>
    </div>
  );
};

export default UserManagement;
