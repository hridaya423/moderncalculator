/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface ScientificCalculatorProps {
  handleScientificFunc: (func: string) => void;
}

const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ handleScientificFunc }) => {
  const functions = [
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'log', 'ln', 'sqrt', 'pow', 'pi', 'e', 'exp', 'abs', 'factorial'
  ];

  return (
    <TabsContent value="scientific" className="p-4 grid grid-cols-4 gap-3">
      {functions.map((func) => (
        <Button 
          key={func}
          variant="outline"
          className="hover:bg-purple-100 transition-all transform hover:scale-105"
          onClick={() => handleScientificFunc(func)}
        >
          {func}
        </Button>
      ))}
    </TabsContent>
  );
};

export default ScientificCalculator;
