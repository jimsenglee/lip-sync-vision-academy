import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Video, 
  VideoOff, 
  Play, 
  Square,
  Settings,
  Download,
  Copy,
  Mic,
  MicOff,
  Camera,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RealTimeTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [sessionStats, setSessionStats] = useState({
    duration: 0,
    wordCount: 0,
    confidence: 0,
    wpm: 0
  });
  const [cameraStatus, setCameraStatus] = useState<'off' | 'requesting' | 'active' | 'error'>('off');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const mockWords = [
    "Hello", "how", "are", "you", "today?", "I", "hope", "you're", "having", 
    "a", "wonderful", "day.", "The", "weather", "looks", "beautiful", "outside.",
    "Would", "you", "like", "to", "go", "for", "a", "walk?", "It's", "such",
    "a", "lovely", "afternoon", "for", "outdoor", "activities."
  ];

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraStatus('active');
        toast({
          title: "Camera activated",
          description: "Position yourself for optimal lip-reading",
        });
      }
    } catch (error) {
      setCameraStatus('error');
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use real-time transcription",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraStatus('off');
  };

  const startRecording = () => {
    if (cameraStatus !== 'active') {
      toast({
        title: "Camera not ready",
        description: "Please activate camera first",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(true);
    setTranscribedText('');
    setSessionStats({ duration: 0, wordCount: 0, confidence: 0, wpm: 0 });

    // Simulate real-time transcription
    let wordIndex = 0;
    let startTime = Date.now();
    
    intervalRef.current = setInterval(() => {
      if (wordIndex < mockWords.length) {
        const newWord = mockWords[wordIndex];
        setTranscribedText(prev => prev + (prev ? ' ' : '') + newWord);
        
        const elapsed = (Date.now() - startTime) / 1000;
        const wordsPerMinute = Math.round((wordIndex + 1) / elapsed * 60);
        const confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
        
        setSessionStats({
          duration: Math.floor(elapsed),
          wordCount: wordIndex + 1,
          confidence,
          wpm: wordsPerMinute
        });
        
        wordIndex++;
      } else {
        stopRecording();
      }
    }, 1200 + Math.random() * 800); // Vary timing between 1.2-2 seconds
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    toast({
      title: "Recording stopped",
      description: "Transcription session completed successfully",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcribedText);
    toast({
      title: "Copied to clipboard",
      description: "Transcribed text has been copied",
    });
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcribedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Transcript file is being downloaded",
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Real-Time Transcription</h1>
        <p className="text-gray-600 mt-1">
          Live lip-reading with webcam for instant communication
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Live Camera Feed
              </CardTitle>
              <CardDescription>
                Position yourself for optimal lip-reading accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                {cameraStatus === 'active' ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {isRecording && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="destructive" className="animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          REC
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>Camera Active</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Live</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      {cameraStatus === 'error' ? (
                        <>
                          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
                          <p className="mb-2">Camera Access Denied</p>
                          <p className="text-sm text-gray-400">Please allow camera permissions</p>
                        </>
                      ) : cameraStatus === 'requesting' ? (
                        <>
                          <Video className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                          <p>Requesting Camera Access...</p>
                        </>
                      ) : (
                        <>
                          <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <p className="mb-2">Camera Inactive</p>
                          <p className="text-sm text-gray-400">Click "Start Camera" to begin</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Camera Controls */}
              <div className="flex justify-center gap-4 mt-6">
                {cameraStatus === 'off' ? (
                  <Button onClick={startCamera} className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <Button onClick={stopCamera} variant="outline" className="flex items-center gap-2">
                    <VideoOff className="h-4 w-4" />
                    Stop Camera
                  </Button>
                )}
                
                {cameraStatus === 'active' && (
                  <>
                    {!isRecording ? (
                      <Button onClick={startRecording} className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button onClick={stopRecording} variant="destructive" className="flex items-center gap-2">
                        <Square className="h-4 w-4" />
                        Stop Recording
                      </Button>
                    )}
                  </>
                )}
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transcription Output */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Transcription</CardTitle>
                  <CardDescription>
                    Real-time text output from lip-reading analysis
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={copyToClipboard}
                    disabled={!transcribedText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={downloadTranscript}
                    disabled={!transcribedText}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-32 max-h-64 p-4 bg-gray-50 rounded-lg border overflow-y-auto">
                <p className="text-lg leading-relaxed">
                  {transcribedText || "Transcribed text will appear here..."}
                  {isRecording && <span className="animate-pulse">|</span>}
                </p>
              </div>
              
              {/* Real-time Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge variant="outline" className={getConfidenceColor(sessionStats.confidence)}>
                  Confidence: {sessionStats.confidence}%
                </Badge>
                <Badge variant="outline">
                  WPM: {sessionStats.wpm}
                </Badge>
                <Badge variant="outline">
                  Words: {sessionStats.wordCount}
                </Badge>
                <Badge variant="outline">
                  Duration: {formatDuration(sessionStats.duration)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Session Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Session Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium">{formatDuration(sessionStats.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Words</span>
                <span className="text-sm font-medium">{sessionStats.wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">WPM</span>
                <span className="text-sm font-medium">{sessionStats.wpm}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className={`text-sm font-medium ${getConfidenceColor(sessionStats.confidence)}`}>
                    {sessionStats.confidence}%
                  </span>
                </div>
                <Progress value={sessionStats.confidence} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quality Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Check</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Good lighting detected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Face properly positioned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Stable camera feed</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Slight head movement</span>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips for Better Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Speak at a moderate pace</li>
                <li>• Keep your head still</li>
                <li>• Ensure good lighting on your face</li>
                <li>• Face the camera directly</li>
                <li>• Avoid covering your mouth</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTranscription;