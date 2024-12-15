import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface TemperatureConverterProps {
  display: string;
  setDisplay: (value: string) => void;
  tempConversions: { [key: string]: (value: number) => number };
  fromUnit: string;
  toUnit: string;
  setFromUnit: (value: string) => void;
  setToUnit: (value: string) => void;
  convertTemperature: () => void;
}

const TemperatureConverter: React.FC<TemperatureConverterProps> = ({
  display,
  setDisplay,
  tempConversions,
  fromUnit,
  toUnit,
  setFromUnit,
  setToUnit,
  convertTemperature,
}) => {
  return (
    <TabsContent value="temperature" className="p-4 space-y-4">
      <div className="flex space-x-2">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(tempConversions).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(tempConversions).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="default"
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        onClick={convertTemperature}
      >
        Convert
      </Button>
    </TabsContent>
  );
};

export default TemperatureConverter;