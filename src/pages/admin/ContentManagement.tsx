
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  BookOpen, 
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Video,
  Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBreadcrumb from '@/components/ui/animated-breadcrumb';
import VideoModal from '@/components/admin/VideoModal';
import { useFeedbackToast } from '@/components/ui/feedback-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ContentManagement = () => {
  // State management for modals and data
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Basic Vowels (A, E, I, O, U)',
      category: 'Vowels',
      difficulty: 'Beginner',
      duration: '12 min',
      status: 'published',
      uploadDate: '2024-01-15',
      views: 1247,
      description: 'Learn fundamental vowel sounds'
    },
    {
      id: 2,
      title: 'Common Consonants (B, P, M)',
      category: 'Consonants',
      difficulty: 'Beginner',
      duration: '15 min',
      status: 'published',
      uploadDate: '2024-01-10',
      views: 892,
      description: 'Master lip-readable consonant sounds'
    },
    {
      id: 3,
      title: 'Advanced Lip Patterns',
      category: 'Advanced',
      difficulty: 'Advanced',
      duration: '25 min',
      status: 'draft',
      uploadDate: '2024-01-18',
      views: 0,
      description: 'Complex lip movement patterns'
    }
  ]);

  const { success, error } = useFeedbackToast();

  // Breadcrumb for admin content management
  const breadcrumbItems = [
    { title: 'Admin Dashboard', href: '/admin' },
    { title: 'Content Management' }
  ];

  // Filter videos based on search
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle video operations
  const handleAddVideo = () => {
    setModalMode('add');
    setEditingVideo(null);
    setIsVideoModalOpen(true);
  };

  const handleEditVideo = (video: any) => {
    setModalMode('edit');
    setEditingVideo(video);
    setIsVideoModalOpen(true);
  };

  const handleDeleteVideo = (videoId: number) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
    success('Video deleted', 'The tutorial video has been removed from your library.');
  };

  const handleSaveVideo = (videoData: any) => {
    if (modalMode === 'add') {
      setVideos(prev => [...prev, videoData]);
    } else {
      setVideos(prev => prev.map(v => v.id === videoData.id ? videoData : v));
    }
  };

  // Utility functions
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Animated Breadcrumbs */}
      <AnimatedBreadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-primary">Content Management</h1>
          <p className="text-gray-600 mt-1">
            Manage tutorials, quizzes, and educational content for the platform
          </p>
        </div>
        <Button 
          onClick={handleAddVideo}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          Upload New Video
        </Button>
      </motion.div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
          <TabsTrigger 
            value="videos" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <Video className="h-4 w-4" />
            Tutorial Videos
          </TabsTrigger>
          <TabsTrigger 
            value="quizzes" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <FileText className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger 
            value="faqs" 
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          {/* Search and Filter Bar */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary bg-white"
              />
            </div>
          </motion.div>

          {/* Video Library */}
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Tutorial Video Library
              </CardTitle>
              <CardDescription>Manage your educational video content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left p-4 font-medium text-primary">Video Details</th>
                      <th className="text-left p-4 font-medium text-primary">Category</th>
                      <th className="text-left p-4 font-medium text-primary">Difficulty</th>
                      <th className="text-left p-4 font-medium text-primary">Status</th>
                      <th className="text-left p-4 font-medium text-primary">Views</th>
                      <th className="text-left p-4 font-medium text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVideos.map((video, index) => (
                      <motion.tr 
                        key={video.id} 
                        className="border-b hover:bg-primary/5 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                              <Video className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{video.title}</div>
                              <div className="text-sm text-gray-500">{video.duration} • {video.uploadDate}</div>
                              <div className="text-xs text-gray-400 mt-1">{video.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            {video.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge className={getDifficultyColor(video.difficulty)}>
                            {video.difficulty}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(video.status)}>
                            {video.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm font-medium">{video.views.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditVideo(video)}
                              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{video.title}"? 
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteVideo(video.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No videos found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm ? 'Try adjusting your search criteria' : 'Start by uploading your first tutorial video'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={handleAddVideo} className="bg-primary hover:bg-primary/90">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload First Video
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          {/* Quiz Management Placeholder */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Quiz Management</CardTitle>
              <CardDescription>Create and manage interactive quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Quiz Management</h3>
                <p className="text-gray-400">Quiz management functionality coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          {/* FAQ Management Placeholder */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>FAQ Management</CardTitle>
              <CardDescription>Manage frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">FAQ Management</h3>
                <p className="text-gray-400">FAQ management functionality coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Video Upload/Edit Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSave={handleSaveVideo}
        editingVideo={editingVideo}
        mode={modalMode}
      />
    </div>
  );
};

export default ContentManagement;
