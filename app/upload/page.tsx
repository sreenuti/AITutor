'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Camera, FileImage, Loader2, AlertCircle } from 'lucide-react';
import { analyzeWorksheet, isDemoMode } from '@/lib/tutor';
import { addWorksheet } from '@/lib/storage';
import Image from 'next/image';

const SAMPLE_WORKSHEETS = [
  {
    id: 'sample-parallel',
    name: 'Parallel Lines & Transversals Practice',
    description: 'Practice worksheet on angle relationships',
  },
  {
    id: 'sample-triangles',
    name: 'Triangle Angle Sum',
    description: 'Finding missing angles in triangles',
  },
];

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
      setError('Please upload an image file (JPG, PNG, WebP) or PDF');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeWorksheet(file);

      // Save worksheet session
      const sessionId = `ws-${Date.now()}`;
      addWorksheet({
        sessionId,
        topicIds: analysis.topicIds,
        uploadedAt: new Date().toISOString(),
        fileName: file.name,
        analyzed: true,
      });

      // Navigate to the main topic's learn page
      router.push(`/learn/${analysis.topicIds[0]}?from=worksheet&session=${sessionId}`);
    } catch (err) {
      setError('Failed to analyze worksheet. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleWorksheet = async (sampleId: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Use demo mode for sample
      const analysis = await analyzeWorksheet('sample-data', true);

      const sessionId = `ws-sample-${Date.now()}`;
      addWorksheet({
        sessionId,
        topicIds: analysis.topicIds,
        uploadedAt: new Date().toISOString(),
        fileName: `Sample: ${sampleId}`,
        analyzed: true,
      });

      router.push(`/learn/${analysis.topicIds[0]}?from=worksheet&session=${sessionId}`);
    } catch (err) {
      setError('Failed to load sample worksheet.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            size="sm"
          >
            ← Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Worksheet</h1>
          <p className="text-gray-600">
            Upload a photo or file of your geometry worksheet, and I&apos;ll help you understand it!
          </p>
          {isDemoMode() && (
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                <strong>Demo Mode:</strong> The app will use sample analysis. Add an OPENAI_API_KEY
                environment variable to enable real worksheet analysis.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Upload Area */}
        <Card className="mb-6 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Choose Upload Method</CardTitle>
            <CardDescription>
              You can upload a saved image, take a photo, or try a sample worksheet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG, WebP, or PDF (max 10MB)
                </p>
              </label>
            </div>

            {/* Camera Capture (Mobile/Chromebook) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  id="camera-capture"
                  className="hidden"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                />
                <label htmlFor="camera-capture" className="block">
                  <div className="w-full cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="file"
                  id="file-select"
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-select" className="block">
                  <div className="w-full cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <FileImage className="h-4 w-4" />
                    Choose File
                  </div>
                </label>
              </div>
            </div>

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={preview}
                    alt="Worksheet preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{file?.name}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Analyze Button */}
            {file && (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Worksheet...
                  </>
                ) : (
                  'Analyze Worksheet'
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Sample Worksheets */}
        <Card className="bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Try a Sample Worksheet</CardTitle>
            <CardDescription>
              Not sure what to upload? Try one of these sample worksheets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {SAMPLE_WORKSHEETS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleWorksheet(sample.id)}
                  disabled={isAnalyzing}
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-colors">
                    <div>
                      <h3 className="font-semibold text-gray-900">{sample.name}</h3>
                      <p className="text-sm text-gray-600">{sample.description}</p>
                    </div>
                    <Button variant="ghost" size="sm" disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Try →'
                      )}
                    </Button>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
