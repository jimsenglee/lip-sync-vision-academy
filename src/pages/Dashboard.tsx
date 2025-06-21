
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  BookOpen, 
  BarChart3, 
  Clock,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Sessions This Week',
      value: '12',
      change: '+3 from last week',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Accuracy Rate',
      value: '87%',
      change: '+5% improvement',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Lessons Completed',
      value: '24',
      change: '+8 this month',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      title: 'Study Streak',
      value: '7 days',
      change: 'Keep it up!',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Start Real-time Transcription',
      description: 'Begin live lip-reading with your webcam',
      icon: Video,
      href: '/transcription',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Continue Learning',
      description: 'Resume your educational journey',
      icon: BookOpen,
      href: '/education',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Progress',
      description: 'Check your performance reports',
      icon: BarChart3,
      href: '/reports',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's your learning progress and quick actions
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link to={action.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your current course completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Vowels & Consonants</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Common Phrases</span>
                <span>62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Numbers & Dates</span>
                <span>40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest sessions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed "Basic Vowels" lesson</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Transcribed 5-minute video session</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Achieved 90% accuracy in quiz</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
