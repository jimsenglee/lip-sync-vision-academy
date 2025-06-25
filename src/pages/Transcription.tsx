
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Play,
  Pause,
  Square,
  Upload,
  Download,
  Settings,
  Volume2,
  Eye,
  Target
} from 'lucide-react';

const Transcription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const videoRef = useRef(null);
  const { toast } = useToast();

  // Mock transcription data
  const mockTranscription = "Hello, welcome to the lip reading practice session. This is a demonstration of real-time transcription.";
  const wordConfidences = [
    { word: "Hello", confidence: 95 },
    { word: "welcome", confidence: 88 },
    { word: "to", confidence: 92 },
    { word: "the", confidence: 90 },
    { word: "lip", confidence: 85 },
    { word: "reading", confidence: 89 },
    { word: "practice", confidence: 87 },
    { word: "session", confidence: 93 }
  ];

  const handleStartRecording = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsRecording(true);
      setIsVideoEnabled(true);
      
      // Simulate real-time transcription
      simulateTranscription();
      
      toast({
        title: "Recording Started",
        description: "Lip reading session is now active",
      });
    } catch (error) {
      toast({
        title: "Camera Access Error",
        description: "Please allow camera access to use lip reading features",
        variant: "destructive",
      });
    }
  };

  const handleStopRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    
    setIsRecording(false);
    setIsVideoEnabled(false);
    
    toast({
      title: "Recording Stopped",
      description: "Session saved to your history",
    });
  };

  const simulateTranscription = () => {
    // Simulate gradual transcription
    let currentText = '';
    const words = mockTranscription.split(' ');
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        setTranscriptionText(currentText);
        setConfidenceScore(Math.floor(Math.random() * 20) + 80); // 80-100%
        wordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `Processing ${file.name}...`,
      });
      // Simulate processing
      setTimeout(() => {
        setTranscriptionText("This is a transcription from your uploaded video file. The system has analyzed the lip movements and generated this text.");
        setConfidenceScore(87);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Lip Reading Transcription
        </h1>
        <p className="text-gray-600 mt-1">
          Practice your lip reading skills with real-time transcription
        </p>
      </div>

      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/5 border border-primary/20">
          <TabsTrigger value="realtime" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Video className="h-4 w-4" />
            Real-time Practice
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Upload className="h-4 w-4" />
            Video Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Feed */}
            <div className="lg:col-span-2">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Camera Feed
                  </CardTitle>
                  <CardDescription>Position your face in the center of the frame</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    {isVideoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Video className="h-16 w-16 text-primary mx-auto mb-4" />
                          <p className="text-gray-600">Click "Start Recording" to begin</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording</span>
                      </div>
                    )}
                    
                    {/* Confidence Score Overlay */}
                    {isRecording && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                        <div className="text-xs">Confidence</div>
                        <div className="text-lg font-bold">{confidenceScore}%</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    {!isRecording ? (
                      <Button 
                        onClick={handleStartRecording}
                        className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                        size="lg"
                      >
                        <Play className="h-5 w-5" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleStopRecording}
                        variant="destructive"
                        className="flex items-center gap-2"
                        size="lg"
                      >
                        <Square className="h-5 w-5" />
                        Stop Recording
                      </Button>
                    )}
                    
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transcription Panel */}
            <div className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Live Transcription
                  </CardTitle>
                  <CardDescription>Real-time lip reading results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="min-h-32 max-h-64 overflow-y-auto p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      {transcriptionText ? (
                        <p className="text-gray-800 leading-relaxed">{transcriptionText}</p>
                      ) : (
                        <p className="text-gray-500 italic">Transcription will appear here...</p>
                      )}
                    </div>
                    
                    {confidenceScore > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Confidence</span>
                          <span>{confidenceScore}%</span>
                        </div>
                        <Progress value={confidenceScore} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                        <Volume2 className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Word Confidence */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary text-sm">Word Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {wordConfidences.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.word}</span>
                        <Badge 
                          variant="outline" 
                          className={`${
                            item.confidence >= 90 
                              ? 'border-green-200 text-green-700 bg-green-50' 
                              : item.confidence >= 80 
                                ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                                : 'border-red-200 text-red-700 bg-red-50'
                          }`}
                        >
                          {item.confidence}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Video File
              </CardTitle>
              <CardDescription>
                Upload a video file for lip reading analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-primary mb-2">
                    Drop your video file here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports MP4, WebM, AVI files up to 100MB
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button className="bg-primary hover:bg-primary/90" asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>

                {/* Results */}
                {transcriptionText && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary">Analysis Results</h3>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-gray-800 leading-relaxed mb-4">{transcriptionText}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-primary/20">
                          Confidence: {confidenceScore}%
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                            <Download className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transcription;
