/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface TimeConverterProps {
  display: string;
  setDisplay: (value: string) => void;
  timeConversions: { [key: string]: number };
  fromUnit: string;
  toUnit: string;
  setFromUnit: (value: string) => void;
  setToUnit: (value: string) => void;
  convertTime: () => void;
}

const TimeConverter: React.FC<TimeConverterProps> = ({
  display,
  setDisplay,
  timeConversions,
  fromUnit,
  toUnit,
  setFromUnit,
  setToUnit,
  convertTime,
}) => {
  return (
    <TabsContent value="time" className="p-4 space-y-4">
      <div className="flex space-x-2">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(timeConversions).map((unit) => (
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
          {Object.keys(timeConversions).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="default"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        onClick={convertTime}
      >
        Convert
      </Button>
    </TabsContent>
  );
};

export default TimeConverter;
