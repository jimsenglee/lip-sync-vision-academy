
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Reports = () => {
  const performanceMetrics = [
    {
      name: 'Word Error Rate (WER)',
      value: '13%',
      trend: '-5%',
      status: 'improving',
      description: 'Percentage of incorrectly transcribed words'
    },
    {
      name: 'Character Error Rate (CER)',
      value: '8%',
      trend: '-3%',
      status: 'improving',
      description: 'Percentage of incorrectly transcribed characters'
    },
    {
      name: 'Match Error Rate (MER)',
      value: '11%',
      trend: '-2%',
      status: 'improving',
      description: 'Overall transcription accuracy metric'
    }
  ];

  const sessionHistory = [
    {
      date: '2024-01-15',
      duration: '15:30',
      accuracy: 89,
      type: 'Real-time',
      words: 245,
      improvements: ['Better lip positioning', 'Clearer articulation']
    },
    {
      date: '2024-01-14',
      duration: '12:45',
      accuracy: 85,
      type: 'Video Upload',
      words: 189,
      improvements: ['Lighting optimization needed', 'Good pace maintained']
    },
    {
      date: '2024-01-13',
      duration: '18:20',
      accuracy: 92,
      type: 'Real-time',
      words: 320,
      improvements: ['Excellent session', 'Consistent accuracy']
    },
    {
      date: '2024-01-12',
      duration: '10:15',
      accuracy: 78,
      type: 'Practice Mode',
      words: 156,
      improvements: ['Head movement detected', 'Background noise present']
    }
  ];

  const suggestions = [
    {
      category: 'Technical',
      title: 'Improve Lighting Setup',
      description: 'Better lighting on your face could improve accuracy by 5-8%',
      priority: 'high'
    },
    {
      category: 'Practice',
      title: 'Focus on Consonant Pairs',
      description: 'B/P and F/V sounds need more practice based on your error patterns',
      priority: 'medium'
    },
    {
      category: 'Environment',
      title: 'Reduce Background Distractions',
      description: 'A cleaner background helps the system focus on lip movements',
      priority: 'low'
    },
    {
      category: 'Technique',
      title: 'Maintain Steady Head Position',
      description: 'Minimizing head movement improves tracking accuracy',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
        <p className="text-gray-600 mt-1">
          Track your progress and identify areas for improvement
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Session History
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription className="text-sm">{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{metric.trend}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-green-700 bg-green-50">
                      Improving
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Accuracy trends over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20 h-2" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tuesday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20 h-2" />
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wednesday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20 h-2" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Thursday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-20 h-2" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Friday</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Milestones</CardTitle>
                <CardDescription>Your achievements and progress markers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">First Perfect Session</div>
                      <div className="text-sm text-gray-600">Achieved 100% accuracy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Consistency Streak</div>
                      <div className="text-sm text-gray-600">7 days above 85% accuracy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Speed Demon</div>
                      <div className="text-sm text-gray-600">Processed 300+ words in one session</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Practice Warrior</div>
                      <div className="text-sm text-gray-600">10+ hours of total practice time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Detailed records of your transcription sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionHistory.map((session, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{session.date}</div>
                        <Badge variant="outline">{session.type}</Badge>
                        <div className="text-sm text-gray-600">{session.duration}</div>
                      </div>
                      <div className={`text-lg font-bold ${getAccuracyColor(session.accuracy)}`}>
                        {session.accuracy}%
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Session Details</div>
                        <div className="text-sm">
                          <span className="font-medium">{session.words}</span> words processed
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Key Insights</div>
                        <ul className="text-sm space-y-1">
                          {session.improvements.map((improvement, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Suggestions</CardTitle>
              <CardDescription>
                Based on your performance data, here are recommendations to improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium">{suggestion.title}</div>
                          <div className="text-sm text-gray-600">{suggestion.category}</div>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 ml-8">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>Track your progress towards accuracy targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Reach 95% Average Accuracy</span>
                    <span>87% / 95%</span>
                  </div>
                  <Progress value={91.5} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Complete 50 Practice Sessions</span>
                    <span>32 / 50</span>
                  </div>
                  <Progress value={64} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Master All Vowel Sounds</span>
                    <span>4 / 5</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
