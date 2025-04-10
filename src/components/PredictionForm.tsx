
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { predictHousePrice } from '@/utils/prediction';

const PredictionForm = ({ onPredictionResult }: { onPredictionResult: (result: number) => void }) => {
  const [formData, setFormData] = useState({
    overallQuality: 5,
    totalSqFt: 1500,
    bedrooms: 3,
    bathrooms: 2,
    garageSize: 1,
    neighborhood: 'average',
    yearBuilt: 2000,
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prediction = predictHousePrice(formData);
    onPredictionResult(prediction);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-teal text-white rounded-t-lg">
        <CardTitle>Enter House Details</CardTitle>
        <CardDescription className="text-white text-opacity-90">
          Fill in the form below to get a price prediction
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalSqFt">Total Square Feet</Label>
              <Input
                id="totalSqFt"
                type="number"
                value={formData.totalSqFt}
                onChange={(e) => handleChange('totalSqFt', parseInt(e.target.value))}
                className="border-teal"
                min={500}
                max={10000}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => handleChange('yearBuilt', parseInt(e.target.value))}
                className="border-teal"
                min={1800}
                max={2025}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select 
                value={formData.bedrooms.toString()} 
                onValueChange={(value) => handleChange('bedrooms', parseInt(value))}
              >
                <SelectTrigger className="border-teal">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select 
                value={formData.bathrooms.toString()} 
                onValueChange={(value) => handleChange('bathrooms', parseFloat(value))}
              >
                <SelectTrigger className="border-teal">
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Overall Quality (1-10)</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">1</span>
              <Slider 
                value={[formData.overallQuality]} 
                min={1} 
                max={10} 
                step={1} 
                onValueChange={(value) => handleSliderChange('overallQuality', value)} 
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">10</span>
              <span className="ml-2 w-8 text-center">{formData.overallQuality}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="neighborhood">Neighborhood Type</Label>
            <Select 
              value={formData.neighborhood} 
              onValueChange={(value) => handleChange('neighborhood', value)}
            >
              <SelectTrigger className="border-teal">
                <SelectValue placeholder="Select neighborhood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poor">Below Average</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="good">Above Average</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="garageSize">Garage Cars</Label>
            <Select 
              value={formData.garageSize.toString()} 
              onValueChange={(value) => handleChange('garageSize', parseInt(value))}
            >
              <SelectTrigger className="border-teal">
                <SelectValue placeholder="Select garage size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No Garage</SelectItem>
                <SelectItem value="1">1 Car</SelectItem>
                <SelectItem value="2">2 Cars</SelectItem>
                <SelectItem value="3">3 Cars</SelectItem>
                <SelectItem value="4">4+ Cars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-teal hover:bg-teal-dark text-white">
            Calculate Price Prediction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
