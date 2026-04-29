import { useRef, useState, useEffect } from 'react';
import type { ToolType } from '../../../../types';
import { generateShades, hexToHsv, hsvToHex } from '@utils/colorUtils';

const tools = [
  { id: 'brush1' as ToolType, imageUrl: '/images/painting/brush1.png', name: '水彩笔', lineWidth: 15, lineCap: 'round' as CanvasLineCap },
  { id: 'brush2' as ToolType, imageUrl: '/images/painting/brush2.png', name: '油画笔', lineWidth: 25, lineCap: 'round' as CanvasLineCap },
  { id: 'brush3' as ToolType, imageUrl: '/images/painting/brush3.png', name: '钢笔', lineWidth: 5, lineCap: 'round' as CanvasLineCap },
  { id: 'brush4' as ToolType, imageUrl: '/images/painting/brush4.png', name: '蜡笔', lineWidth: 20, lineCap: 'square' as CanvasLineCap },
  { id: 'eraser' as ToolType, imageUrl: '/images/painting/eraser.png', name: '橡皮', lineWidth: 30, lineCap: 'round' as CanvasLineCap },
];

const paletteColors = [
  { id: 'color1', color: '#FF0080', name: '玫红色' },
  { id: 'color2', color: '#FF2A00', name: '红色' },
  { id: 'color3', color: '#8C00FF', name: '紫色' },
  { id: 'color4', color: '#FF7F00', name: '橙色' },
  { id: 'color5', color: '#0080FF', name: '蓝色' },
  { id: 'color6', color: '#FFDD00', name: '黄色' },
  { id: 'color7', color: '#00B000', name: '绿色' },
  { id: 'color8', color: '#00FF80', name: '浅绿色' },
];

export const usePainting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#436C88');
  const [brushSize, setBrushSize] = useState(50);
  const [opacity, setOpacity] = useState(100);
  const [selectedTool, setSelectedTool] = useState<ToolType>('brush1');
  const [colorShades, setColorShades] = useState<string[]>([]);
  const [hexColor, setHexColor] = useState('436C88');
  const [selectedPaletteColor, setSelectedPaletteColor] = useState<string | null>(null);
  const [currentHue, setCurrentHue] = useState(200);
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSize;
      context.globalAlpha = opacity / 100;
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = context;
    }
    
    setColorShades(generateShades(selectedColor));
    const hsv = hexToHsv(selectedColor);
    setCurrentHue(hsv.h);
    setColorPickerPosition({ x: hsv.s * 100, y: (1 - hsv.v) * 100 });
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      const tool = tools.find(t => t.id === selectedTool);
      if (tool) {
        contextRef.current.strokeStyle = selectedTool === 'eraser' ? 'white' : selectedColor;
        contextRef.current.lineWidth = tool.lineWidth * (brushSize / 100);
        contextRef.current.lineCap = tool.lineCap;
        contextRef.current.globalAlpha = selectedTool === 'eraser' ? 1 : opacity / 100;
      }
    }
  }, [selectedColor, opacity, brushSize, selectedTool]);

  useEffect(() => {
    setHexColor(selectedColor.substring(1));
  }, [selectedColor]);

  useEffect(() => {
    if (selectedPaletteColor) {
      setColorShades(generateShades(selectedPaletteColor));
      const hsv = hexToHsv(selectedPaletteColor);
      setCurrentHue(hsv.h);
      setColorPickerPosition({ x: hsv.s * 100, y: (1 - hsv.v) * 100 });
    }
  }, [selectedPaletteColor]);

  useEffect(() => {
    const baseColor = hsvToHex(currentHue, 1, 1);
    setColorShades(generateShades(baseColor));
  }, [currentHue]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    const hsv = hexToHsv(color);
    setCurrentHue(hsv.h);
    setColorPickerPosition({ x: hsv.s * 100, y: (1 - hsv.v) * 100 });
  };

  const handlePaletteColorSelect = (color: string) => {
    setSelectedPaletteColor(color);
    setSelectedColor(color);
  };

  const handleSpectrumSelect = (hue: number) => {
    setCurrentHue(hue);
    const newColor = hsvToHex(hue, 1, 1);
    setSelectedColor(newColor);
    setHexColor(newColor.substring(1));
  };

  const handleHexChange = (value: string) => {
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      setHexColor(value);
      if (value.length === 6) {
        const newColor = `#${value}`;
        setSelectedColor(newColor);
        const hsv = hexToHsv(newColor);
        setCurrentHue(hsv.h);
        setColorPickerPosition({ x: hsv.s * 100, y: (1 - hsv.v) * 100 });
      }
    }
  };

  const handleColorPickerSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    setColorPickerPosition({ x: xPercent, y: yPercent });
    
    const saturation = xPercent / 100;
    const value = 1 - (yPercent / 100);
    
    const newColor = hsvToHex(currentHue, saturation, value);
    setSelectedColor(newColor);
    setHexColor(newColor.substring(1));
  };

  return {
    canvasRef,
    tools,
    paletteColors,
    selectedColor,
    brushSize,
    setBrushSize,
    opacity,
    setOpacity,
    selectedTool,
    setSelectedTool,
    colorShades,
    hexColor,
    selectedPaletteColor,
    currentHue,
    colorPickerPosition,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    handleColorSelect,
    handlePaletteColorSelect,
    handleSpectrumSelect,
    handleHexChange,
    handleColorPickerSelect,
  };
};