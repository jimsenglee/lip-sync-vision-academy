import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileVideo, 
  Play, 
  Pause,
  Download,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const mockTranscriptionResult = {
    text: "Hello everyone, welcome to today's presentation. I hope you're all doing well and ready to learn something new. Today we'll be discussing the importance of clear communication and how technology can help bridge communication gaps.",
    timestamps: [
      { start: 0, end: 2.5, text: "Hello everyone, welcome to" },
      { start: 2.5, end: 4.8, text: "today's presentation." },
      { start: 4.8, end: 7.2, text: "I hope you're all doing well" },
      { start: 7.2, end: 9.5, text: "and ready to learn something new." },
      { start: 9.5, end: 12.8, text: "Today we'll be discussing the importance" },
      { start: 12.8, end: 15.2, text: "of clear communication" },
      { start: 15.2, end: 18.5, text: "and how technology can help" },
      { start: 18.5, end: 21.0, text: "bridge communication gaps." }
    ],
    stats: {
      duration: 21.0,
      wordCount: 42,
      confidence: 89,
      wer: 12,
      cer: 8
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['video/mp4', 'video/avi', 'video/x-msvideo', 'video/x-matroska'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload MP4, AVI, or MKV files only",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (500MB limit)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 500MB",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      setTranscriptionResult(null);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for processing`,
      });
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const startProcessing = () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setTranscriptionResult(mockTranscriptionResult);
          toast({
            title: "Processing complete",
            description: "Video has been successfully transcribed",
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const copyTranscript = () => {
    if (transcriptionResult) {
      navigator.clipboard.writeText(transcriptionResult.text);
      toast({
        title: "Copied to clipboard",
        description: "Transcript has been copied",
      });
    }
  };

  const downloadTranscript = () => {
    if (transcriptionResult) {
      const content = `Video Transcript\n\nFull Text:\n${transcriptionResult.text}\n\nTimestamped Segments:\n${transcriptionResult.timestamps.map(t => `[${t.start}s - ${t.end}s] ${t.text}`).join('\n')}`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcript-${uploadedFile?.name || 'video'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: "Transcript file is being downloaded",
      });
    }
  };

  const downloadSRT = () => {
    if (transcriptionResult) {
      const srtContent = transcriptionResult.timestamps.map((segment: any, index: number) => {
        const startTime = formatSRTTime(segment.start);
        const endTime = formatSRTTime(segment.end);
        return `${index + 1}\n${startTime} --> ${endTime}\n${segment.text}\n`;
      }).join('\n');

      const blob = new Blob([srtContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subtitles-${uploadedFile?.name || 'video'}.srt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "SRT file downloaded",
        description: "Subtitle file is ready for use",
      });
    }
  };

  const formatSRTTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Video Upload Transcription</h1>
        <p className="text-gray-600 mt-1">
          Upload video files for accurate lip-reading transcription with timestamps
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Video File
          </CardTitle>
          <CardDescription>
            Drag and drop your video file or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileVideo className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">
              {uploadedFile ? uploadedFile.name : "Drop your video file here"}
            </h3>
            <p className="text-gray-600 mb-4">
              {uploadedFile 
                ? `${formatFileSize(uploadedFile.size)} • Ready for processing`
                : "Supports MP4, AVI, MKV up to 500MB"
              }
            </p>
            <Button className="flex items-center gap-2 mx-auto">
              <Upload className="h-4 w-4" />
              {uploadedFile ? "Choose Different File" : "Choose File"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/avi,video/x-msvideo,video/x-matroska"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {uploadedFile && !isProcessing && !transcriptionResult && (
            <div className="mt-6 flex justify-center">
              <Button onClick={startProcessing} size="lg" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Processing
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-spin" />
              Processing Video
            </CardTitle>
            <CardDescription>
              Analyzing lip movements and generating transcription...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={processingProgress} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing: {Math.round(processingProgress)}%</span>
                <span>Estimated time remaining: {Math.max(0, Math.round((100 - processingProgress) / 10))} seconds</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {transcriptionResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Player */}
          <Card>
            <CardHeader>
              <CardTitle>Video Playback</CardTitle>
              <CardDescription>
                Review the original video with synchronized transcript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg mb-4">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain rounded-lg"
                  src={uploadedFile ? URL.createObjectURL(uploadedFile) : undefined}
                  controls
                />
              </div>
              <div className="flex justify-center gap-2">
                <Button onClick={togglePlayback} variant="outline">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transcript */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transcription Results</CardTitle>
                  <CardDescription>
                    Generated transcript with timestamps
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyTranscript}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadTranscript}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Full Text */}
                <div>
                  <h4 className="font-medium mb-2">Full Transcript</h4>
                  <div className="p-4 bg-gray-50 rounded-lg max-h-32 overflow-y-auto">
                    <p className="text-sm leading-relaxed">{transcriptionResult.text}</p>
                  </div>
                </div>

                {/* Timestamped Segments */}
                <div>
                  <h4 className="font-medium mb-2">Timestamped Segments</h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {transcriptionResult.timestamps.map((segment: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        <Badge variant="outline" className="text-xs">
                          {segment.start}s
                        </Badge>
                        <span className="text-sm flex-1">{segment.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex gap-2">
                  <Button size="sm" onClick={downloadSRT} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download SRT
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadTranscript}>
                    <Download className="h-4 w-4" />
                    Download TXT
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Statistics */}
      {transcriptionResult && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Statistics</CardTitle>
            <CardDescription>
              Quality metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(transcriptionResult.stats.duration)}s
                </div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {transcriptionResult.stats.wordCount}
                </div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {transcriptionResult.stats.confidence}%
                </div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {transcriptionResult.stats.wer}%
                </div>
                <div className="text-sm text-gray-600">WER</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">
                  {transcriptionResult.stats.cer}%
                </div>
                <div className="text-sm text-gray-600">CER</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoUpload;