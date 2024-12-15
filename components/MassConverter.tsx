import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface MassConverterProps {
  display: string;
  setDisplay: (value: string) => void;
  massConversions: { [key: string]: number };
  fromUnit: string;
  toUnit: string;
  setFromUnit: (value: string) => void;
  setToUnit: (value: string) => void;
  convertMass: () => void;
}

const MassConverter: React.FC<MassConverterProps> = ({
  display,
  setDisplay,
  massConversions,
  fromUnit,
  toUnit,
  setFromUnit,
  setToUnit,
  convertMass,
}) => {
  return (
    <TabsContent value="mass" className="p-4 space-y-4">
      <div className="flex space-x-2">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(massConversions).map((unit) => (
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
          {Object.keys(massConversions).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="default"
        className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600"
        onClick={convertMass}
      >
        Convert
      </Button>
    </TabsContent>
  );
};

export default MassConverter;