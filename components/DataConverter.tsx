import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface DataConverterProps {
  display: string;
  setDisplay: (value: string) => void;
  dataConversions: { [key: string]: number };
  fromUnit: string;
  toUnit: string;
  setFromUnit: (value: string) => void;
  setToUnit: (value: string) => void;
  convertData: () => void;
}

const DataConverter: React.FC<DataConverterProps> = ({
  display,
  setDisplay,
  dataConversions,
  fromUnit,
  toUnit,
  setFromUnit,
  setToUnit,
  convertData,
}) => {
  return (
    <TabsContent value="data" className="p-4 space-y-4">
      <div className="flex space-x-2">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(dataConversions).map((unit) => (
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
          {Object.keys(dataConversions).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="default"
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        onClick={convertData}
      >
        Convert
      </Button>
    </TabsContent>
  );
};

export default DataConverter;