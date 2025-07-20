
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AnimatedBreadcrumb from '@/components/ui/animated-breadcrumb';
import { useFeedbackToast } from '@/components/ui/feedback-toast';
import { 
  BookOpen, 
  FileVideo, 
  Calendar, 
  Clock, 
  Target, 
  Eye, 
  Trash2, 
  Search,
  Filter,
  Download
} from 'lucide-react';

interface TranscriptionRecord {
  id: string;
  fileName: string;
  type: 'realtime' | 'upload';
  createdAt: Date;
  duration: number;
  confidence: number;
  preview: string;
}

const TranscriptionHistory = () => {
  const navigate = useNavigate();
  const feedbackToast = useFeedbackToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'realtime' | 'upload'>('all');

  // Mock data - in real app, this would come from API
  const transcriptions: TranscriptionRecord[] = [
    {
      id: '1',
      fileName: 'presentation_video.mp4',
      type: 'upload',
      createdAt: new Date('2024-01-15T10:30:00'),
      duration: 245,
      confidence: 91,
      preview: "Welcome everyone to today's presentation on artificial intelligence and machine learning. We'll be covering the latest developments..."
    },
    {
      id: '2',
      fileName: 'real_time_session_20240115',
      type: 'realtime',
      createdAt: new Date('2024-01-15T14:20:00'),
      duration: 120,
      confidence: 89,
      preview: "Hello, this is a real-time transcription test session. The system is working well and capturing my speech accurately..."
    },
    {
      id: '3',
      fileName: 'meeting_recording.mp4',
      type: 'upload',
      createdAt: new Date('2024-01-14T09:15:00'),
      duration: 1820,
      confidence: 87,
      preview: "Let's begin today's team meeting. First on the agenda is the quarterly review of our lip reading technology project..."
    },
    {
      id: '4',
      fileName: 'tutorial_demo_session',
      type: 'realtime',
      createdAt: new Date('2024-01-13T16:45:00'),
      duration: 95,
      confidence: 94,
      preview: "This is a demonstration of our lip reading capabilities. The system can detect and transcribe spoken words in real-time..."
    }
  ];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTranscriptions = transcriptions.filter(transcription => {
    const matchesSearch = transcription.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transcription.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transcription.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleView = (id: string) => {
    navigate(`/transcription-result/${id}`);
  };

  const handleDelete = (id: string, fileName: string) => {
    // In real app, this would call an API
    feedbackToast.success(
      "Transcription Deleted",
      `"${fileName}" has been removed from your history.`
    );
  };

  const handleExport = (id: string, fileName: string) => {
    // Simulate export functionality
    feedbackToast.success(
      "Export Started",
      `Downloading "${fileName}" as transcript file.`
    );
  };

  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Transcription', href: '/transcription' },
    { title: 'History' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatedBreadcrumb items={breadcrumbItems} />
      
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transcription History
        </h1>
        <p className="text-gray-600 mt-1">
          View and manage your saved transcriptions
        </p>
      </div>

      {transcriptions.length === 0 ? (
        <Card className="border-primary/20">
          <CardContent className="py-12">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-primary mb-2">No Transcriptions Yet</h3>
              <p className="text-gray-600 mb-6">
                Your completed transcriptions will appear here. Start a session to build your history.
              </p>
              <Button 
                onClick={() => navigate('/transcription')}
                className="bg-primary hover:bg-primary/90"
              >
                Start New Transcription
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Search and Filter Controls */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transcriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border border-primary/20 rounded-md text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Types</option>
                    <option value="realtime">Real-time</option>
                    <option value="upload">File Upload</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcription List */}
          <div className="grid gap-4">
            {filteredTranscriptions.map((transcription) => (
              <Card key={transcription.id} className="border-primary/20 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <FileVideo className="h-5 w-5 text-primary shrink-0" />
                        <h3 className="font-medium text-gray-900 truncate">
                          {transcription.fileName}
                        </h3>
                        <Badge 
                          variant="outline"
                          className={`${
                            transcription.type === 'realtime' 
                              ? 'border-blue-200 text-blue-700 bg-blue-50' 
                              : 'border-green-200 text-green-700 bg-green-50'
                          }`}
                        >
                          {transcription.type === 'realtime' ? 'Real-time' : 'Upload'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {transcription.preview}
                      </p>
                      
                      <div className="flex items-center gap-6 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {transcription.createdAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDuration(transcription.duration)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {transcription.confidence}% confidence
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(transcription.id)}
                        className="border-primary/20 text-primary hover:bg-primary/10"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport(transcription.id, transcription.fileName)}
                        className="border-primary/20 text-primary hover:bg-primary/10"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(transcription.id, transcription.fileName)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTranscriptions.length === 0 && (
            <Card className="border-primary/20">
              <CardContent className="py-12">
                <div className="text-center">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TranscriptionHistory;
