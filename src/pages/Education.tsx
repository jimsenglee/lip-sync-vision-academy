
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock,
  Star,
  Award,
  Video,
  FileText,
  Users
} from 'lucide-react';

const Education = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
    {
      id: 1,
      title: 'Basic Vowels (A, E, I, O, U)',
      description: 'Learn to recognize fundamental vowel sounds',
      duration: '12 min',
      difficulty: 'Beginner',
      completed: true,
      progress: 100,
      category: 'Vowels'
    },
    {
      id: 2,
      title: 'Common Consonants (B, P, M)',
      description: 'Master lip-readable consonant sounds',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: true,
      progress: 100,
      category: 'Consonants'
    },
    {
      id: 3,
      title: 'Simple Greetings',
      description: 'Hello, goodbye, and common phrases',
      duration: '10 min',
      difficulty: 'Beginner',
      completed: false,
      progress: 65,
      category: 'Phrases'
    },
    {
      id: 4,
      title: 'Numbers 1-20',
      description: 'Recognize numbers in lip-reading',
      duration: '18 min',
      difficulty: 'Intermediate',
      completed: false,
      progress: 30,
      category: 'Numbers'
    },
    {
      id: 5,
      title: 'Question Words',
      description: 'What, where, when, why, how',
      duration: '20 min',
      difficulty: 'Intermediate',
      completed: false,
      progress: 0,
      category: 'Questions'
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Vowel Recognition Quiz',
      questions: 15,
      timeLimit: '10 min',
      bestScore: 87,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Common Phrases Challenge',
      questions: 20,
      timeLimit: '15 min',
      bestScore: 92,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Mixed Patterns Test',
      questions: 25,
      timeLimit: '20 min',
      bestScore: null,
      difficulty: 'Advanced'
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Education</h1>
        <p className="text-gray-600 mt-1">
          Interactive lessons and quizzes to improve your lip-reading skills
        </p>
      </div>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Path</CardTitle>
                  <CardDescription>
                    Follow the structured curriculum to master lip-reading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                              )}
                              <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                              <Badge className={getDifficultyColor(lesson.difficulty)}>
                                {lesson.difficulty}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {lesson.duration}
                              </span>
                              <span>{lesson.category}</span>
                            </div>
                            {!lesson.completed && (
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{lesson.progress}%</span>
                                </div>
                                <Progress value={lesson.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            variant={lesson.completed ? "outline" : "default"}
                            className="ml-4"
                          >
                            {lesson.completed ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Completion</span>
                        <span>48%</span>
                      </div>
                      <Progress value={48} className="h-3" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">2</div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-xs text-gray-600">In Progress</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">First Lesson</div>
                        <div className="text-xs text-gray-500">Completed your first lesson</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Vowel Master</div>
                        <div className="text-xs text-gray-500">Mastered all vowel sounds</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Questions:</span>
                      <span>{quiz.questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time Limit:</span>
                      <span>{quiz.timeLimit}</span>
                    </div>
                    {quiz.bestScore && (
                      <div className="flex justify-between text-sm">
                        <span>Best Score:</span>
                        <span className="text-green-600 font-medium">{quiz.bestScore}%</span>
                      </div>
                    )}
                  </div>
                  <Button className="w-full mt-4">
                    {quiz.bestScore ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Real-time Practice Mode
              </CardTitle>
              <CardDescription>
                Practice your pronunciation and get instant feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mx-auto mb-4" />
                      <p>Your Camera Feed</p>
                    </div>
                  </div>
                  <Button className="w-full">Start Practice Session</Button>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Exercise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">Hello</div>
                        <p className="text-gray-600 mb-4">Practice saying this word clearly</p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Good lip positioning</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Practice Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Accuracy</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attempts</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Success Rate</span>
                          <span className="font-medium text-green-600">78% </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
