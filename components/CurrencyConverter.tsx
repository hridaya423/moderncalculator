/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';

interface CurrencyConverterProps {
  display: string;
  setDisplay: (value: string) => void;
  currencyRates: { [key: string]: number };
  fromCurrency: string;
  toCurrency: string;
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
  fetchCurrencyRates: () => void;
  convertCurrency: () => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  display,
  setDisplay,
  currencyRates,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  fetchCurrencyRates,
  convertCurrency,
}) => {
  return (
    <TabsContent value="currency" className="p-4 space-y-4">
      <div className="flex space-x-2">
        <select 
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(currencyRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchCurrencyRates}
          className="animate-spin-slow"
        >
          <RefreshCw />
        </Button>
        <select 
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
        >
          {Object.keys(currencyRates).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <Button 
        variant="default" 
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        onClick={convertCurrency}
      >
        Convert
      </Button>
    </TabsContent>
  );
};

export default CurrencyConverter;
