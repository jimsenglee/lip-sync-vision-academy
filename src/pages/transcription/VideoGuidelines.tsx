import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Camera,
  Sun,
  Volume2,
  User,
  AlertTriangle
} from 'lucide-react';

const VideoGuidelines = () => {
  const guidelines = [
    {
      category: 'Camera Setup',
      icon: Camera,
      color: 'bg-blue-500',
      items: [
        { text: 'Position camera at eye level', good: true },
        { text: 'Maintain 2-3 feet distance from camera', good: true },
        { text: 'Use a stable tripod or surface', good: true },
        { text: 'Avoid camera shake or movement', good: true },
        { text: 'Don\'t position camera too high or low', good: false },
        { text: 'Avoid handheld recording', good: false }
      ]
    },
    {
      category: 'Lighting',
      icon: Sun,
      color: 'bg-yellow-500',
      items: [
        { text: 'Use natural daylight when possible', good: true },
        { text: 'Ensure even lighting on face', good: true },
        { text: 'Position light source in front of speaker', good: true },
        { text: 'Use soft, diffused lighting', good: true },
        { text: 'Avoid backlighting or silhouettes', good: false },
        { text: 'Don\'t use harsh shadows on face', good: false }
      ]
    },
    {
      category: 'Speaker Position',
      icon: User,
      color: 'bg-green-500',
      items: [
        { text: 'Face the camera directly', good: true },
        { text: 'Keep head relatively still', good: true },
        { text: 'Maintain consistent distance', good: true },
        { text: 'Ensure full lip visibility', good: true },
        { text: 'Avoid profile or angled shots', good: false },
        { text: 'Don\'t cover mouth with hands/objects', good: false }
      ]
    },
    {
      category: 'Audio & Environment',
      icon: Volume2,
      color: 'bg-purple-500',
      items: [
        { text: 'Use quiet environment', good: true },
        { text: 'Minimize background noise', good: true },
        { text: 'Speak at moderate pace', good: true },
        { text: 'Use clear articulation', good: true },
        { text: 'Avoid noisy backgrounds', good: false },
        { text: 'Don\'t speak too fast or mumble', good: false }
      ]
    }
  ];

  const technicalSpecs = [
    { label: 'Resolution', value: '720p minimum (1080p recommended)', icon: '📹' },
    { label: 'Frame Rate', value: '24-30 FPS', icon: '🎬' },
    { label: 'File Format', value: 'MP4, AVI, MKV', icon: '📁' },
    { label: 'File Size', value: 'Up to 500MB', icon: '💾' },
    { label: 'Duration', value: 'Up to 30 minutes', icon: '⏱️' }
  ];

  const commonIssues = [
    {
      issue: 'Poor lighting causing shadows',
      solution: 'Use multiple light sources or move near a window',
      severity: 'high'
    },
    {
      issue: 'Speaker moving too much',
      solution: 'Practice staying still or use a chair with back support',
      severity: 'medium'
    },
    {
      issue: 'Camera angle too low/high',
      solution: 'Adjust camera to eye level for optimal lip visibility',
      severity: 'high'
    },
    {
      issue: 'Background distractions',
      solution: 'Use a plain wall or virtual background',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Video Recording Guidelines</h1>
        <p className="text-gray-600 mt-1">
          Follow these guidelines to ensure optimal lip-reading accuracy
        </p>
      </div>

      {/* Quick Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Lightbulb className="h-5 w-5" />
            Quick Setup Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Good lighting on face</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Camera at eye level</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Face camera directly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Speak clearly and slowly</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {guidelines.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon className="h-4 w-4" />
                </div>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    {item.good ? (
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.good ? 'text-gray-700' : 'text-gray-500'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
          <CardDescription>
            Recommended video specifications for optimal processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">{spec.icon}</div>
                <div className="font-medium text-sm">{spec.label}</div>
                <div className="text-xs text-gray-600 mt-1">{spec.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Common Issues & Solutions
          </CardTitle>
          <CardDescription>
            Troubleshoot common problems that affect transcription quality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonIssues.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-gray-900">{item.issue}</div>
                  <Badge className={getSeverityColor(item.severity)}>
                    {item.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{item.solution}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Example Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Ideal Setup Example</CardTitle>
          <CardDescription>
            Visual representation of the optimal recording environment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-blue-600" />
              <p className="text-gray-700 font-medium">Optimal Setup Diagram</p>
              <p className="text-sm text-gray-600 mt-2">
                Speaker facing camera directly with even lighting
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoGuidelines;