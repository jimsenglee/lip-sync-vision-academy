
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import LoadingScreen from '@/components/ui/loading-screen';
import { 
  Video, 
  VideoOff, 
  Upload, 
  Play, 
  Pause, 
  Square,
  Settings,
  FileVideo,
  Camera,
  Lightbulb,
  Download,
  AlertCircle
} from 'lucide-react';

const Transcription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const { toast } = useToast();

  const mockTranscription = "Hello, how are you today? I hope you're having a wonderful day. The weather looks beautiful outside.";

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Lip reading transcription is now active",
      duration: 3000,
    });
    
    // Simulate real-time transcription
    let currentText = '';
    const words = mockTranscription.split(' ');
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < words.length && isRecording) {
        currentText += (index === 0 ? '' : ' ') + words[index];
        setTranscribedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Transcription session has ended",
      duration: 3000,
    });
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful",
        description: "Video file has been processed for transcription",
        duration: 3000,
      });
    }, 3000);
  };

  const tips = [
    "Ensure good lighting on your face",
    "Position camera at eye level",
    "Speak at a moderate pace",
    "Avoid covering your mouth",
    "Use a clean background"
  ];

  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Transcription' }
  ];

  if (isUploading) {
    return <LoadingScreen message="Processing video file..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <BreadcrumbNav items={breadcrumbItems} />
      
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transcription
        </h1>
        <p className="text-gray-600 mt-1">
          Real-time lip reading and video file transcription
        </p>
      </div>

      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/10">
          <TabsTrigger value="realtime" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200">
            <Camera className="h-4 w-4" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200">
            <FileVideo className="h-4 w-4" />
            Upload Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Video className="h-5 w-5" />
                    Live Camera Feed
                  </CardTitle>
                  <CardDescription>
                    Position yourself in front of the camera for optimal lip-reading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {isRecording ? (
                      <div className="text-white text-center animate-fade-in">
                        <Video className="h-16 w-16 mx-auto mb-4 animate-pulse text-primary" />
                        <p className="text-lg font-medium">Camera Active - Lip Reading in Progress</p>
                        <Badge variant="destructive" className="mt-3 animate-pulse bg-red-500">
                          ● REC
                        </Badge>
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-sm">LIVE</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center animate-fade-in">
                        <VideoOff className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg">Camera Preview - Click Start to begin</p>
                        <p className="text-sm mt-2 opacity-70">Make sure to allow camera permissions</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    {!isRecording ? (
                      <Button 
                        onClick={handleStartRecording} 
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
                      >
                        <Play className="h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleStopRecording} 
                        variant="destructive" 
                        className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
                      >
                        <Square className="h-4 w-4" />
                        Stop Recording
                      </Button>
                    )}
                    <Button variant="outline" className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 transition-all duration-200">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Live Transcription</CardTitle>
                  <CardDescription>
                    Real-time text output from lip-reading analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-32 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                    <p className="text-lg leading-relaxed text-gray-800">
                      {transcribedText || (
                        <span className="text-gray-500 italic">
                          Transcribed text will appear here as you speak...
                        </span>
                      )}
                      {isRecording && <span className="animate-pulse text-primary font-bold">|</span>}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Confidence: 87%
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        WPM: 145
                      </Badge>
                      {transcribedText && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Words: {transcribedText.split(' ').length}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-2 border-primary/20 hover:bg-primary/10 transition-all duration-200"
                      disabled={!transcribedText}
                    >
                      <Download className="h-4 w-4" />
                      Export Text
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    Tips for Better Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary">Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-medium">00:02:34</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Words</span>
                    <span className="text-sm font-medium">{transcribedText.split(' ').filter(word => word.length > 0).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Session Quality</span>
                      <span className="text-green-600">Good</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6 animate-fade-in">
          <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Upload className="h-5 w-5" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Upload a video file for lip-reading transcription with timestamps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 cursor-pointer group"
                onClick={handleFileUpload}
              >
                <FileVideo className="h-16 w-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-medium mb-2 text-gray-900">Drop your video file here</h3>
                <p className="text-gray-600 mb-4">Supports MP4, AVI, MKV up to 500MB</p>
                <Button className="flex items-center gap-2 mx-auto bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105">
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary mb-2">Video Guidelines for Best Results:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ensure the speaker's face is clearly visible</li>
                      <li>• Good lighting on the face area</li>
                      <li>• Minimal background noise</li>
                      <li>• Speaker should face the camera directly</li>
                      <li>• Avoid rapid head movements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transcription;
