
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Play, 
  Search,
  Award,
  Video,
  FileText,
  Camera,
  Filter,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBreadcrumb from '@/components/ui/animated-breadcrumb';
import VideoCard from '@/components/education/VideoCard';

const Education = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Course data structured like Udemy
  const courses = [
    {
      id: 1,
      title: 'Master Basic Vowels',
      description: 'Learn to recognize and pronounce fundamental vowel sounds (A, E, I, O, U) with clear visual demonstrations',
      duration: '12 min',
      difficulty: 'Beginner' as const,
      completed: true,
      progress: 100,
      category: 'Vowels',
      lessons: 5,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Common Consonant Patterns',
      description: 'Master lip-readable consonant sounds including B, P, M, and their combinations in everyday words',
      duration: '18 min',
      difficulty: 'Beginner' as const,
      completed: true,
      progress: 100,
      category: 'Consonants',
      lessons: 7,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Everyday Greetings & Phrases',
      description: 'Practice common social interactions: hello, goodbye, thank you, and polite conversation starters',
      duration: '15 min',
      difficulty: 'Beginner' as const,
      completed: false,
      progress: 65,
      category: 'Phrases',
      lessons: 6
    },
    {
      id: 4,
      title: 'Numbers & Time Recognition',
      description: 'Learn to read numbers 1-100, time expressions, and common counting patterns through lip-reading',
      duration: '22 min',
      difficulty: 'Intermediate' as const,
      completed: false,
      progress: 30,
      category: 'Numbers',
      lessons: 8
    },
    {
      id: 5,
      title: 'Question Words Mastery',
      description: 'Master the 5 W\'s: What, Where, When, Why, Who - essential for understanding conversations',
      duration: '20 min',
      difficulty: 'Intermediate' as const,
      completed: false,
      progress: 0,
      category: 'Questions',
      lessons: 5,
      locked: true
    },
    {
      id: 6,
      title: 'Advanced Sentence Structures',
      description: 'Complex sentence patterns, idioms, and fast-paced conversation lip-reading techniques',
      duration: '35 min',
      difficulty: 'Advanced' as const,
      completed: false,
      progress: 0,
      category: 'Advanced',
      lessons: 12,
      locked: true
    }
  ];

  const categories = ['All', 'Vowels', 'Consonants', 'Phrases', 'Numbers', 'Questions', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Breadcrumb items for Education page
  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Education' }
  ];

  const handleStartLesson = (courseId: number) => {
    console.log(`Starting lesson for course ${courseId}`);
    // Navigate to lesson detail page
  };

  return (
    <div className="space-y-6 p-6">
      {/* Animated Breadcrumbs */}
      <AnimatedBreadcrumb items={breadcrumbItems} />

      {/* Header Section */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-primary">Lip-Reading Academy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master the art of lip-reading with our comprehensive video courses and interactive practice sessions
        </p>
      </motion.div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-primary/10">
          <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <BookOpen className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Camera className="h-4 w-4" />
            Live Practice
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Award className="h-4 w-4" />
            My Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${selectedCategory === category ? 'bg-primary hover:bg-primary/90' : 'border-primary/20 hover:bg-primary/10'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Course Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <VideoCard
                  {...course}
                  onStartLesson={() => handleStartLesson(course.id)}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No courses found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {/* Real-time Practice Mode */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Camera className="h-5 w-5" />
                Live Lip-Reading Practice
              </CardTitle>
              <CardDescription>
                Practice your pronunciation with real-time webcam feedback and AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Webcam Preview */}
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Camera className="h-16 w-16 mx-auto text-primary/60" />
                      <div>
                        <p className="text-lg font-medium text-primary">Your Camera Feed</p>
                        <p className="text-sm text-gray-500">Click "Start Practice" to begin</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Camera className="mr-2 h-4 w-4" />
                    Start Practice Session
                  </Button>
                </div>

                {/* Practice Controls & Feedback */}
                <div className="space-y-4">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Current Exercise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div className="text-4xl font-bold text-primary mb-2">Hello</div>
                        <p className="text-gray-600">Practice saying this word clearly</p>
                        
                        {/* Live Feedback Indicators */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Lip Position</span>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-green-600">Good</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Mouth Opening</span>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm text-yellow-600">Adjust</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Clarity</span>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-green-600">Excellent</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Session Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Accuracy</span>
                          <span className="font-medium text-primary">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">23</div>
                            <div className="text-xs text-gray-600">Correct</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">4</div>
                            <div className="text-xs text-gray-600">To Practice</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Completion</span>
                    <span className="font-medium">54%</span>
                  </div>
                  <Progress value={54} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-center pt-2">
                    <div>
                      <div className="text-2xl font-bold text-green-600">2</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <div className="text-xs text-gray-600">In Progress</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'First Lesson', icon: '🎯', color: 'text-green-600' },
                    { name: 'Vowel Master', icon: '🏆', color: 'text-yellow-600' },
                    { name: 'Practice Streak', icon: '🔥', color: 'text-orange-600' }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-xs text-gray-500">Earned today</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Weekly Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Practice Time</span>
                    <span className="font-medium">45 min / 2 hrs</span>
                  </div>
                  <Progress value={37.5} className="h-3" />
                  <div className="text-center pt-2">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-xs text-gray-600">Days this week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
