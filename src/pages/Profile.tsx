
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Settings, 
  BookOpen,
  Save,
  Plus,
  X
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    transcriptionFormat: user?.preferences?.transcriptionFormat || 'plain',
    customDictionary: user?.preferences?.customDictionary || []
  });
  const [newWord, setNewWord] = useState('');

  const handleSave = () => {
    updateProfile({
      ...user,
      name: formData.name,
      email: formData.email,
      preferences: {
        transcriptionFormat: formData.transcriptionFormat,
        customDictionary: formData.customDictionary
      }
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const addCustomWord = () => {
    if (newWord.trim() && !formData.customDictionary.includes(newWord.trim())) {
      setFormData({
        ...formData,
        customDictionary: [...formData.customDictionary, newWord.trim()]
      });
      setNewWord('');
    }
  };

  const removeCustomWord = (wordToRemove) => {
    setFormData({
      ...formData,
      customDictionary: formData.customDictionary.filter(word => word !== wordToRemove)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account information and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="dictionary" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Dictionary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          transcriptionFormat: user?.preferences?.transcriptionFormat || 'plain',
                          customDictionary: user?.preferences?.customDictionary || []
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Overview of your account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-gray-600">Total Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12.5h</div>
                  <div className="text-sm text-gray-600">Practice Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                  <div className="text-sm text-gray-600">Avg Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transcription Settings</CardTitle>
              <CardDescription>
                Customize how your transcriptions are displayed and formatted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">Transcription Format</Label>
                <Select 
                  value={formData.transcriptionFormat}
                  onValueChange={(value) => setFormData({ ...formData, transcriptionFormat: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="plain">Plain Text</SelectItem>
                    <SelectItem value="timestamped">With Timestamps</SelectItem>
                    <SelectItem value="formatted">Formatted with Punctuation</SelectItem>
                    <SelectItem value="json">JSON Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Display Options</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Show confidence scores</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Highlight uncertain words</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Auto-scroll during transcription</span>
                  </label>
                </div>
              </div>

              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dictionary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Dictionary</CardTitle>
              <CardDescription>
                Add words specific to your vocabulary to improve recognition accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new word..."
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomWord()}
                />
                <Button onClick={addCustomWord} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Your Custom Words ({formData.customDictionary.length})</Label>
                <div className="min-h-32 max-h-64 overflow-y-auto border rounded-lg p-4">
                  {formData.customDictionary.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No custom words added yet. Add words that are specific to your vocabulary.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.customDictionary.map((word, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {word}
                          <button
                            onClick={() => removeCustomWord(word)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Tips for Custom Dictionary:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Add names, technical terms, and specialized vocabulary</li>
                  <li>• Include common phrases you use frequently</li>
                  <li>• Words are case-insensitive</li>
                  <li>• Adding more relevant words improves accuracy</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
