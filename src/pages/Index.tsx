
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PredictionForm from '@/components/PredictionForm';
import PredictionResult from '@/components/PredictionResult';

const Index = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const handlePrediction = (result: number, data?: any) => {
    setPrediction(result);
    setFormData(data);
    // Scroll to result
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-10 bg-gradient-to-b from-teal to-teal-light text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Massachusetts House Price Prediction
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Enter your house details below to get an instant price estimate based on 
              advanced machine learning algorithms.
            </p>
          </div>
        </section>
        
        <section className="py-12 container mx-auto px-4">
          <PredictionForm 
            onPredictionResult={(result) => handlePrediction(result, {
              overallQuality: 5,
              totalSqFt: 1500,
              bedrooms: 3,
              bathrooms: 2,
              garageSize: 1,
              yearBuilt: 2000,
            })} 
          />
          
          <div id="results">
            <PredictionResult prediction={prediction} formData={formData} />
          </div>
          
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-teal mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 border border-teal rounded-lg">
                <div className="bg-teal text-white w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">1</div>
                <h4 className="font-semibold mb-2">Enter Details</h4>
                <p className="text-sm text-muted-foreground">Fill in the basic information about the house you want to price.</p>
              </div>
              
              <div className="p-4 border border-teal rounded-lg">
                <div className="bg-teal text-white w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">2</div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">Our algorithm analyzes the data against Massachusetts market trends.</p>
              </div>
              
              <div className="p-4 border border-teal rounded-lg">
                <div className="bg-teal text-white w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold">3</div>
                <h4 className="font-semibold mb-2">Get Estimate</h4>
                <p className="text-sm text-muted-foreground">Receive an instant price prediction with feature importance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
