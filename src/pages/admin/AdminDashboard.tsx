
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const systemStats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12% this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Sessions',
      value: '89',
      change: 'Currently online',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'System Accuracy',
      value: '91.2%',
      change: '+2.1% improvement',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Storage Used',
      value: '847 GB',
      change: '78% of capacity',
      icon: FileText,
      color: 'text-orange-600'
    }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      message: 'High server load detected',
      time: '5 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      severity: 'low'
    },
    {
      type: 'error',
      message: 'Failed login attempts threshold exceeded',
      time: '3 hours ago',
      severity: 'high'
    }
  ];

  const userActivity = [
    { day: 'Mon', users: 145, sessions: 234 },
    { day: 'Tue', users: 167, sessions: 289 },
    { day: 'Wed', users: 203, sessions: 345 },
    { day: 'Thu', users: 189, sessions: 312 },
    { day: 'Fri', users: 234, sessions: 398 },
    { day: 'Sat', users: 156, sessions: 234 },
    { day: 'Sun', users: 123, sessions: 189 }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          System overview and management tools
        </p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly User Activity</CardTitle>
            <CardDescription>Daily active users and session counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userActivity.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-8">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(day.users / 250) * 100} className="w-20 h-2" />
                      <span className="text-sm text-gray-600">{day.users} users</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{day.sessions} sessions</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Alerts</CardTitle>
            <CardDescription>Important notifications and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Disk Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcription Quality</CardTitle>
            <CardDescription>System-wide accuracy metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Word Error Rate</span>
                <span>8.3%</span>
              </div>
              <Progress value={91.7} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Character Error Rate</span>
                <span>5.1%</span>
              </div>
              <Progress value={94.9} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Accuracy</span>
                <span>91.2%</span>
              </div>
              <Progress value={91.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-medium text-blue-900">View User Reports</div>
              <div className="text-sm text-blue-700">Detailed user analytics</div>
            </button>
            <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">System Backup</div>
              <div className="text-sm text-green-700">Create system backup</div>
            </button>
            <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">Update Content</div>
              <div className="text-sm text-purple-700">Manage educational content</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
