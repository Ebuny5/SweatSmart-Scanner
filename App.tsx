import React, { useState } from 'react';
import { AnalysisResult } from './types';
import { analyzeImage } from './services/geminiService';
import ImageCapture from './components/FileUpload';
import LoadingState from './components/LoadingState';
import AnalysisResults from './components/AnalysisResults';
import { Header } from './components/Header';
import SensorDashboard, { SimulationScenario } from './components/SensorDashboard';

type SensorStatus = 'disconnected' | 'connecting' | 'connected';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Sensor state
  const [hrStatus, setHrStatus] = useState<SensorStatus>('disconnected');
  const [gsrStatus, setGsrStatus] = useState<SensorStatus>('disconnected');
  const [hrData, setHrData] = useState<number | null>(null);
  const [gsrData, setGsrData] = useState<number | null>(null);
  
  // New state for simulation control
  const [simulationScenario, setSimulationScenario] = useState<SimulationScenario>('Resting');


  // Generates a random number in a given range
  const getRandomValue = (min: number, max: number, decimalPlaces: number = 0) => {
    const rand = Math.random() * (max - min) + min;
    return parseFloat(rand.toFixed(decimalPlaces));
  };

  const handleConnect = () => {
    if (hrStatus === 'connected' || gsrStatus === 'connected') {
      setHrStatus('disconnected');
      setGsrStatus('disconnected');
      setHrData(null);
      setGsrData(null);
    } else {
      setHrStatus('connecting');
      setGsrStatus('connecting');
      setTimeout(() => {
        let hrValue: number;
        let gsrValue: number;

        switch (simulationScenario) {
          case 'Exercise':
            hrValue = getRandomValue(110, 140); // High heart rate
            gsrValue = getRandomValue(6.0, 8.5, 2);  // High GSR
            break;
          case 'Normal':
            hrValue = getRandomValue(60, 85);  // Normal heart rate
            gsrValue = getRandomValue(0.5, 2.0, 2);   // Low GSR
            break;
          case 'Resting':
          default:
            hrValue = getRandomValue(60, 85);  // Resting heart rate
            gsrValue = getRandomValue(7.0, 9.5, 2);   // High GSR for hyperhidrosis
            break;
        }

        setHrData(hrValue);
        setGsrData(gsrValue);
        setHrStatus('connected');
        setGsrStatus('connected');
      }, 1500);
    }
  };

  const handleImageCapture = async (base64ImageDataUrl: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setImagePreview(base64ImageDataUrl);

    try {
      const base64data = base64ImageDataUrl.split(',')[1];
      const result = await analyzeImage(base64data, mimeType, hrData, gsrData);
      setAnalysisResult(result);
    } catch (err) => {
      setError('Failed to analyze image. Please try again with a clear image of a palm, foot, or sole.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        {!analysisResult && !isLoading && !error && (
          <>
            <SensorDashboard
              hrStatus={hrStatus}
              gsrStatus={gsrStatus}
              hrData={hrData}
              gsrData={gsrData}
              onConnect={handleConnect}
              simulationScenario={simulationScenario}
              setSimulationScenario={setSimulationScenario}
            />
            <ImageCapture onImageCapture={handleImageCapture} />
          </>
        )}
        
        {isLoading && (
          <LoadingState />
        )}

        {error && !isLoading && (
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Analysis Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {analysisResult && !isLoading && (
          <AnalysisResults result={analysisResult} onReset={handleReset} imagePreview={imagePreview} />
        )}
      </main>
    </div>
  );
};

export default App;