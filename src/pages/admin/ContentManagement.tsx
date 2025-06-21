
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  BookOpen, 
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save
} from 'lucide-react';

const ContentManagement = () => {
  const [editingItem, setEditingItem] = useState(null);

  const tutorials = [
    {
      id: 1,
      title: 'Basic Vowels (A, E, I, O, U)',
      category: 'Vowels',
      difficulty: 'Beginner',
      duration: '12 min',
      status: 'published',
      lastModified: '2024-01-15',
      views: 1247
    },
    {
      id: 2,
      title: 'Common Consonants (B, P, M)',
      category: 'Consonants',
      difficulty: 'Beginner',
      duration: '15 min',
      status: 'published',
      lastModified: '2024-01-10',
      views: 892
    },
    {
      id: 3,
      title: 'Advanced Lip Patterns',
      category: 'Advanced',
      difficulty: 'Advanced',
      duration: '25 min',
      status: 'draft',
      lastModified: '2024-01-18',
      views: 0
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Vowel Recognition Quiz',
      questions: 15,
      difficulty: 'Beginner',
      status: 'published',
      averageScore: 87,
      completions: 234,
      lastModified: '2024-01-12'
    },
    {
      id: 2,
      title: 'Common Phrases Challenge',
      questions: 20,
      difficulty: 'Intermediate',
      status: 'published',
      averageScore: 79,
      completions: 156,
      lastModified: '2024-01-08'
    },
    {
      id: 3,
      title: 'Mixed Patterns Test',
      questions: 25,
      difficulty: 'Advanced',
      status: 'review',
      averageScore: 0,
      completions: 0,
      lastModified: '2024-01-20'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I improve transcription accuracy?',
      answer: 'Ensure good lighting, speak clearly, and position yourself directly facing the camera.',
      category: 'General',
      status: 'published',
      views: 567
    },
    {
      id: 2,
      question: 'What video formats are supported?',
      answer: 'We support MP4, AVI, and MKV formats up to 500MB in size.',
      category: 'Technical',
      status: 'published',
      views: 342
    },
    {
      id: 3,
      question: 'Can I use the app offline?',
      answer: 'Currently, the app requires an internet connection for real-time processing.',
      category: 'Technical',
      status: 'draft',
      views: 0
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">
            Manage tutorials, quizzes, and educational content
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Content
        </Button>
      </div>

      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tutorial Library</CardTitle>
              <CardDescription>Manage educational tutorials and lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Difficulty</th>
                      <th className="text-left p-3 font-medium">Duration</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Views</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorials.map((tutorial) => (
                      <tr key={tutorial.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{tutorial.title}</div>
                          <div className="text-sm text-gray-600">Modified: {tutorial.lastModified}</div>
                        </td>
                        <td className="p-3 text-sm">{tutorial.category}</td>
                        <td className="p-3">
                          <Badge className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">{tutorial.duration}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(tutorial.status)}>
                            {tutorial.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">{tutorial.views}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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

          {/* Add/Edit Tutorial Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Tutorial</CardTitle>
              <CardDescription>Create a new educational tutorial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter tutorial title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input placeholder="e.g., Vowels, Consonants" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input type="number" placeholder="15" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the tutorial content and learning objectives" />
              </div>
              <div className="flex gap-2">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button variant="outline">
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Management</CardTitle>
              <CardDescription>Manage interactive quizzes and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Title</th>
                      <th className="text-left p-3 font-medium">Questions</th>
                      <th className="text-left p-3 font-medium">Difficulty</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Avg Score</th>
                      <th className="text-left p-3 font-medium">Completions</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes.map((quiz) => (
                      <tr key={quiz.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium">{quiz.title}</div>
                          <div className="text-sm text-gray-600">Modified: {quiz.lastModified}</div>
                        </td>
                        <td className="p-3 text-sm">{quiz.questions}</td>
                        <td className="p-3">
                          <Badge className={getDifficultyColor(quiz.difficulty)}>
                            {quiz.difficulty}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          {quiz.averageScore > 0 ? `${quiz.averageScore}%` : '-'}
                        </td>
                        <td className="p-3 text-sm">{quiz.completions}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage FAQ content and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{faq.question}</h3>
                        <p className="text-sm text-gray-600 mb-2">{faq.answer}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{faq.category}</Badge>
                          <Badge className={getStatusColor(faq.status)}>
                            {faq.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{faq.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add New FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Add New FAQ</CardTitle>
              <CardDescription>Create a new frequently asked question</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <Input placeholder="Enter the question" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <Textarea placeholder="Provide a detailed answer" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>General</option>
                    <option>Technical</option>
                    <option>Account</option>
                    <option>Billing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
