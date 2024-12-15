/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Currency, 
  Weight, 
  Thermometer, 
  SquareFunction, 
  Ruler,
  RefreshCw,
  Dice3,
  Droplet,
  Gauge,
  Tv2,
  Clock
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

// Comprehensive utility functions for various calculator modes
const scientificCalculations = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  log: Math.log10,
  ln: Math.log,
  sqrt: Math.sqrt,
  pow: Math.pow,
  pi: () => Math.PI,
  e: () => Math.E,
  exp: Math.exp,
  abs: Math.abs,
  factorial: (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * scientificCalculations.factorial(n - 1);
  }
};

type ConversionState = {
  [key: string]: number;
};

type ScientificCalcFunction = (arg: number) => number;

// Define all possible modes
type CalculatorMode = 'basic' | 'scientific' | 'currency' | 'mass' | 'temperature' | 'time' | 'data';

const AdvancedCalculator: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<CalculatorMode>('basic');
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const displayRef = useRef<HTMLDivElement>(null);
  
  // Comprehensive conversion states with explicit typing
  const [currencyRates, setCurrencyRates] = useState<{[key: string]: number}>({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.35,
    AUD: 1.52
  });
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  // Enhanced conversion states with explicit typing
  const [massConversions, setMassConversions] = useState<ConversionState>({
    kg: 1,
    g: 0.001,
    lb: 0.453592,
    oz: 0.0283495,
    stone: 6.35029,
    metric_ton: 1000,
    us_ton: 907.185
  });

  const [tempConversions, setTempConversions] = useState<{[key: string]: (temp: number) => number}>({
    celsius: (c: number) => c,
    fahrenheit: (f: number) => (f - 32) * 5/9,
    kelvin: (k: number) => k - 273.15
  });

  const [dataConversions, setDataConversions] = useState<ConversionState>({
    bytes: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024
  });

  const [timeConversions, setTimeConversions] = useState<ConversionState>({
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800
  });

  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Number and decimal input
      if (/^[0-9.]$/.test(key)) {
        handleNumberClick(key);
        return;
      }

      // Arithmetic operations
      const operationMap: {[key: string]: string} = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷',
        'Enter': '=',
        'Backspace': 'C',
        'Escape': 'C'
      };

      if (operationMap[key]) {
        handleOperation(operationMap[key]);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  // Fetch real-time currency rates
  const fetchCurrencyRates = useCallback(async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setCurrencyRates(data.rates);
      toast.success('Currency rates updated');
    } catch (error) {
      toast.error('Failed to update currency rates');
    }
  }, []);

  // Effect to fetch rates on mount and every hour
  useEffect(() => {
    fetchCurrencyRates();
    const rateInterval = setInterval(fetchCurrencyRates, 3600000);
    return () => clearInterval(rateInterval);
  }, [fetchCurrencyRates]);

  // Advanced number input and operation handling
  const handleNumberClick = (num: string) => {
    setDisplay(prev => 
      prev === '0' && num !== '.' 
        ? num 
        : (prev.includes('.') && num === '.' ? prev : prev + num)
    );
  };

  const handleOperation = (op: string) => {
    try {
      switch(op) {
        case '=':
          const sanitizedExpression = display.replace(/×/g, '*').replace(/÷/g, '/');
          // Type assertion for eval (use with caution)
          setDisplay(String(eval(sanitizedExpression) as number));
          break;
        case 'C':
          setDisplay('0');
          break;
        case '+/-':
          setDisplay(String(-parseFloat(display)));
          break;
        case '%':
          setDisplay(String(parseFloat(display) / 100));
          break;
        case 'M+':
          setMemory(prev => prev + parseFloat(display));
          break;
        case 'MR':
          setDisplay(String(memory));
          break;
        case 'MC':
          setMemory(0);
          break;
      }
    } catch (error) {
      setDisplay('Error');
      toast.error('Invalid calculation');
    }
  };

  // Scientific Calculator Functions
  const handleScientificFunc = (func: keyof typeof scientificCalculations) => {
    try {
      const result = scientificCalculations[func](parseFloat(display));
      setDisplay(String(result));
    } catch (error) {
      setDisplay('Error');
      toast.error('Calculation error');
    }
  };

  // Comprehensive Conversion Functions
  const convertCurrency = () => {
    const amountInUSD = parseFloat(display) / currencyRates[fromCurrency];
    const convertedAmount = amountInUSD * currencyRates[toCurrency];
    setDisplay(convertedAmount.toFixed(4));
    toast.success(`Converted from ${fromCurrency} to ${toCurrency}`);
  };

  const convertMass = () => {
    const amountInKg = parseFloat(display) * massConversions[fromUnit];
    const convertedAmount = amountInKg / massConversions[toUnit];
    setDisplay(convertedAmount.toFixed(4));
    toast.success(`Converted from ${fromUnit} to ${toUnit}`);
  };

  const convertTemperature = () => {
    const amountInCelsius = tempConversions[fromUnit](parseFloat(display));
    const convertedAmount = 
      toUnit === 'celsius' 
        ? amountInCelsius 
        : toUnit === 'fahrenheit'
          ? (amountInCelsius * 9/5) + 32
          : amountInCelsius + 273.15;
    setDisplay(convertedAmount.toFixed(2));
    toast.success(`Converted from ${fromUnit} to ${toUnit}`);
  };

  const convertData = () => {
    const amountInBytes = parseFloat(display) * dataConversions[fromUnit];
    const convertedAmount = amountInBytes / dataConversions[toUnit];
    setDisplay(convertedAmount.toFixed(2));
    toast.success(`Converted from ${fromUnit} to ${toUnit}`);
  };

  const convertTime = () => {
    const amountInSeconds = parseFloat(display) * timeConversions[fromUnit];
    const convertedAmount = amountInSeconds / timeConversions[toUnit];
    setDisplay(convertedAmount.toFixed(2));
    toast.success(`Converted from ${fromUnit} to ${toUnit}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Toaster richColors />
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-md overflow-hidden border-4 border-white/50 transform transition-all hover:scale-105">
        {/* Animated Mode Selector */}
        <Tabs 
          defaultValue="basic" 
          onValueChange={(mode) => setCurrentMode(mode as typeof currentMode)}
          className="w-full"
        >
<TabsList className="grid grid-cols-7 w-full gap-1 bg-gray-100/50 backdrop-blur-sm p-1">
    {[
      { value: 'basic', icon: Calculator, label: 'Basic' },
      { value: 'scientific', icon: SquareFunction, label: 'Scientific' },
      { value: 'currency', icon: Currency, label: 'Currency' },
      { value: 'mass', icon: Weight, label: 'Mass' },
      { value: 'temperature', icon: Thermometer, label: 'Temp' },
      { value: 'data', icon: Tv2, label: 'Data' },
      { value: 'time', icon: Clock, label: 'Time' }
    ].map(({value, icon: Icon, label}) => (
      <TabsTrigger 
        key={value} 
        value={value} 
        className="flex flex-col items-center justify-center space-y-1 p-1 
              transition-all hover:bg-purple-100 rounded-lg 
              data-[state=active]:bg-purple-200 
              data-[state=active]:shadow-inner"
      >
        <Icon className="w-2 h-2" />
        <span className="text-xs">{label}</span>
      </TabsTrigger>
    ))}
</TabsList>

          {/* Glowing Display with Ref */}
          <div 
            ref={displayRef}
            className="p-4 bg-gradient-to-r from-indigo-200 to-purple-200 text-right text-4xl font-bold text-gray-800 tracking-wider 
              border-b-4 border-white/30 shadow-inner
              animate-pulse-slow"
          >
            {display}
          </div>

          {/* Basic Calculator with Enhanced Layout */}
          <TabsContent value="basic" className="p-4 grid grid-cols-4 gap-3">
            {['7','8','9','÷','4','5','6','×','1','2','3','-','0','.','=','+']
              .map((btn, index) => (
                <Button 
                  key={index} 
                  variant="outline"
                  className="w-full text-xl rounded-xl 
                    bg-white/60 hover:bg-purple-100 
                    transition-all transform hover:scale-105 
                    shadow-md hover:shadow-xl"
                  onClick={() => 
                    ['+','-','×','÷','=','%'].includes(btn) 
                      ? handleOperation(btn.replace('×','*').replace('÷','/'))
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

          {/* Scientific Calculator with Expanded Functions */}
          <TabsContent value="scientific" className="p-4 grid grid-cols-4 gap-3">
            {Object.keys(scientificCalculations)
              .map((func) => (
                <Button 
                  key={func}
                  variant="outline"
                  className="hover:bg-purple-100 transition-all transform hover:scale-105"
                  onClick={() => handleScientificFunc(func as keyof typeof scientificCalculations)}
                >
                  {func}
                </Button>
              ))
            }
          </TabsContent>

          {/* Currency Converter with Live Rates */}
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

        {/* (Previous code remains the same) */}

          {/* Mass Converter with Advanced Units */}
          <TabsContent value="mass" className="p-4 space-y-4">
            <div className="flex space-x-2">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(massConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(massConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
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

          {/* Temperature Converter */}
          <TabsContent value="temperature" className="p-4 space-y-4">
            <div className="flex space-x-2">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(tempConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(tempConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
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

          <TabsContent value="data" className="p-4 space-y-4">
            <div className="flex space-x-2">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(dataConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(dataConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
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

          {/* Time Converter */}
          <TabsContent value="time" className="p-4 space-y-4">
            <div className="flex space-x-2">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(timeConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2 border rounded bg-white/50 hover:bg-purple-50"
              >
                {Object.keys(timeConversions).map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedCalculator;
