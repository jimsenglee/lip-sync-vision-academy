
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { Eye, Download, Search, Calendar, Clock, Video } from 'lucide-react';

const TranscriptionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transcriptions = [
    {
      id: 1,
      title: 'Meeting with Team',
      date: '2024-01-20',
      duration: '15:30',
      accuracy: 92,
      type: 'real-time',
      status: 'completed',
      wordCount: 450
    },
    {
      id: 2,
      title: 'Video Conference Call',
      date: '2024-01-19',
      duration: '8:45',
      accuracy: 87,
      type: 'file-upload',
      status: 'completed',
      wordCount: 280
    },
    {
      id: 3,
      title: 'Practice Session',
      date: '2024-01-18',
      duration: '5:20',
      accuracy: 94,
      type: 'real-time',
      status: 'completed',
      wordCount: 150
    },
    {
      id: 4,
      title: 'Training Video',
      date: '2024-01-17',
      duration: '22:15',
      accuracy: 89,
      type: 'file-upload',
      status: 'processing',
      wordCount: 0
    }
  ];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 bg-green-50';
    if (accuracy >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTranscriptions = transcriptions.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Reports', href: '/reports' },
    { title: 'Transcription History' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <BreadcrumbNav items={breadcrumbItems} />

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transcription History
        </h1>
        <p className="text-gray-600 mt-1">
          View and manage your past transcription sessions
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transcriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20"
              />
            </div>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Calendar className="h-4 w-4 mr-2" />
              Filter by Date
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transcription List */}
      <div className="grid gap-4">
        {filteredTranscriptions.map((transcription) => (
          <Card key={transcription.id} className="border-primary/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-primary">{transcription.title}</h3>
                    <Badge className={getStatusColor(transcription.status)}>
                      {transcription.status}
                    </Badge>
                    <Badge variant="outline" className="border-primary/20">
                      {transcription.type === 'real-time' ? 'Live' : 'File'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {transcription.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {transcription.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      {transcription.wordCount} words
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {transcription.status === 'completed' && (
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Accuracy</div>
                      <Badge className={getAccuracyColor(transcription.accuracy)}>
                        {transcription.accuracy}%
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTranscriptions.length === 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-12 text-center">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transcriptions found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'Start transcribing to see your history here'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TranscriptionHistory;
