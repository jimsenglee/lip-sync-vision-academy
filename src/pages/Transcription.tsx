import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  HelpCircle,
  Video,
  Clock,
  FileVideo,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Transcription = () => {
  const transcriptionModes = [
    {
      title: 'Real-Time Transcription',
      description: 'Live lip-reading with your webcam for instant communication',
      icon: Camera,
      href: '/transcription/realtime',
      color: 'bg-blue-500 hover:bg-blue-600',
      features: ['Live processing', 'Instant feedback', 'Quality monitoring'],
      recommended: true
    },
    {
      title: 'Video Upload',
      description: 'Upload video files for accurate transcription with timestamps',
      icon: Upload,
      href: '/transcription/upload',
      color: 'bg-green-500 hover:bg-green-600',
      features: ['Batch processing', 'Timestamped output', 'SRT export'],
      recommended: false
    },
    {
      title: 'Video Guidelines',
      description: 'Learn best practices for optimal transcription accuracy',
      icon: HelpCircle,
      href: '/transcription/guidelines',
      color: 'bg-purple-500 hover:bg-purple-600',
      features: ['Setup tips', 'Quality checklist', 'Troubleshooting'],
      recommended: false
    }
  ];

  const recentSessions = [
    {
      type: 'Real-time',
      duration: '15:30',
      accuracy: 89,
      date: '2024-01-20',
      words: 245
    },
    {
      type: 'Video Upload',
      duration: '12:45',
      accuracy: 92,
      date: '2024-01-19',
      words: 189
    },
    {
      type: 'Real-time',
      duration: '8:20',
      accuracy: 85,
      date: '2024-01-18',
      words: 156
    }
  ];

  const quickStats = [
    { label: 'Total Sessions', value: '47', icon: Video },
    { label: 'Avg Accuracy', value: '87%', icon: TrendingUp },
    { label: 'Total Hours', value: '12.5h', icon: Clock },
    { label: 'Words Processed', value: '8.2K', icon: FileVideo }
  ];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600';
    if (accuracy >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transcription Hub</h1>
        <p className="text-gray-600 mt-1">
          Choose your transcription method and start converting speech to text
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transcription Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {transcriptionModes.map((mode, index) => (
          <Card key={index} className="relative hover:shadow-lg transition-shadow group">
            {mode.recommended && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge className="bg-orange-500 text-white">Recommended</Badge>
              </div>
            )}
            <CardHeader>
              <div className={`inline-flex items-center justify-center w-12 h-12 ${mode.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                <mode.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{mode.title}</CardTitle>
              <CardDescription>{mode.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {mode.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full">
                <Link to={mode.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your latest transcription activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">{session.type}</div>
                      <div className="text-sm text-gray-600">{session.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getAccuracyColor(session.accuracy)}`}>
                      {session.accuracy}%
                    </div>
                    <div className="text-sm text-gray-600">{session.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Accuracy</CardTitle>
            <CardDescription>Improve your transcription results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">Optimal Lighting</div>
                  <div className="text-sm text-gray-600">Ensure your face is well-lit and clearly visible</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">Camera Position</div>
                  <div className="text-sm text-gray-600">Position camera at eye level for best results</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">Clear Speech</div>
                  <div className="text-sm text-gray-600">Speak clearly and at a moderate pace</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium">Stable Environment</div>
                  <div className="text-sm text-gray-600">Minimize background distractions and movement</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transcription;