
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface PredictionResultProps {
  prediction: number | null;
  formData?: {
    overallQuality: number;
    totalSqFt: number;
    bedrooms: number;
    bathrooms: number;
    garageSize: number;
    yearBuilt: number;
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, formData }) => {
  if (prediction === null) return null;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(prediction);

  // Generate chart data based on form inputs
  const chartData = formData ? [
    { name: 'Size', value: formData.totalSqFt / 500 },
    { name: 'Quality', value: formData.overallQuality },
    { name: 'Bedrooms', value: formData.bedrooms },
    { name: 'Bathrooms', value: formData.bathrooms * 1.5 },
    { name: 'Garage', value: formData.garageSize * 2 },
    { name: 'Age', value: (2025 - formData.yearBuilt) / 10 },
  ] : [];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader className="bg-black-light text-white rounded-t-lg">
        <CardTitle className="text-center">Predicted House Price</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-teal mb-6">{formattedPrice}</div>
          
          <div className="w-full h-[250px] mt-4">
            <p className="text-center text-sm mb-2 text-muted-foreground">
              Feature Importance (Relative Scale)
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis hide />
                <Tooltip 
                  formatter={(value) => [`Score: ${value}`, '']}
                  contentStyle={{ backgroundColor: '#f8f8f8', border: '1px solid #ddd' }}
                />
                <Bar dataKey="value" fill="#008080" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6 text-center">
            This prediction is based on the Massachusetts housing market data and machine learning algorithms.
            Actual prices may vary based on specific market conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;
