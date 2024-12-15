/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

interface BasicCalculatorProps {
  display: string;
  handleNumberClick: (num: string) => void;
  handleOperation: (op: string) => void;
}

const BasicCalculator: React.FC<BasicCalculatorProps> = ({ display, handleNumberClick, handleOperation }) => {
  return (
    <TabsContent value="basic" className="p-4 grid grid-cols-4 gap-3">
      {['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+']
        .map((btn, index) => (
          <Button 
            key={index} 
            variant="outline"
            className="w-full text-xl rounded-xl bg-white/60 hover:bg-purple-100 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
            onClick={() => 
              ['+','-','×','÷','=','%'].includes(btn) 
                ? handleOperation(btn)
                : handleNumberClick(btn)
            }
          >
            {btn}
          </Button>
        ))
      }
      {/* Memory and Utility Buttons */}
      <Button 
        variant="destructive" 
        className="col-span-1 animate-bounce"
        onClick={() => handleOperation('C')}
      >
        C
      </Button>
      <Button 
        variant="secondary"
        onClick={() => handleOperation('M+')}
      >
        M+
      </Button>
      <Button 
        variant="secondary"
        onClick={() => handleOperation('MR')}
      >
        MR
      </Button>
      <Button 
        variant="secondary"
        onClick={() => handleOperation('MC')}
      >
        MC
      </Button>
    </TabsContent>
  );
};

export default BasicCalculator;
