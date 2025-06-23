
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  Lightbulb
} from 'lucide-react';

const Transcription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  const mockTranscription = "Hello, how are you today? I hope you're having a wonderful day. The weather looks beautiful outside.";

  const handleStartRecording = () => {
    setIsRecording(true);
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
  };

  const tips = [
    "Ensure good lighting on your face",
    "Position camera at eye level",
    "Speak at a moderate pace",
    "Avoid covering your mouth",
    "Use a clean background"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transcription</h1>
        <p className="text-gray-600 mt-1">
          Real-time lip reading and video file transcription
        </p>
      </div>

      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <FileVideo className="h-4 w-4" />
            Upload Video
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Live Camera Feed
                  </CardTitle>
                  <CardDescription>
                    Position yourself in front of the camera for optimal lip-reading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                    {isRecording ? (
                      <div className="text-white text-center">
                        <Video className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                        <p>Camera Active - Lip Reading in Progress</p>
                        <Badge variant="destructive" className="mt-2 animate-pulse">
                          REC
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <VideoOff className="h-16 w-16 mx-auto mb-4" />
                        <p>Camera Preview - Click Start to begin</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-6">
                    {!isRecording ? (
                      <Button onClick={handleStartRecording} className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button onClick={handleStopRecording} variant="destructive" className="flex items-center gap-2">
                        <Square className="h-4 w-4" />
                        Stop Recording
                      </Button>
                    )}
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Live Transcription</CardTitle>
                  <CardDescription>
                    Real-time text output from lip-reading analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-32 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-lg leading-relaxed">
                      {transcribedText || "Transcribed text will appear here..."}
                      {isRecording && <span className="animate-pulse">|</span>}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">Confidence: 87%</Badge>
                      <Badge variant="outline">WPM: 145</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Export Text
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Tips for Better Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-medium">00:02:34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Words</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Upload a video file for lip-reading transcription with timestamps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
                <FileVideo className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Drop your video file here</h3>
                <p className="text-gray-600 mb-4">Supports MP4, AVI, MKV up to 500MB</p>
                <Button className="flex items-center gap-2 mx-auto">
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Video Guidelines for Best Results:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure the speaker's face is clearly visible</li>
                  <li>• Good lighting on the face area</li>
                  <li>• Minimal background noise</li>
                  <li>• Speaker should face the camera directly</li>
                  <li>• Avoid rapid head movements</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transcription;
