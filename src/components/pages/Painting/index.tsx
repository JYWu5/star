import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '@components/ui/PageContainer';
import { BackButton } from '@components/ui/BackButton';
import { usePainting } from './hooks/usePainting';


const Painting = () => {
  const navigate = useNavigate();
  const {
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
    
    handleHexChange,
    handleColorPickerSelect,
  } = usePainting();

  return (
    <PageContainer 
      backgroundColor="#f0f9ff"
      className="flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <BackButton onClick={() => navigate('/forest-scene')} className="bg-white/80 text-gray-800 hover:bg-white" />

      <div className="w-full max-w-7xl h-[90vh] flex gap-6">
        {/* 左侧颜料盒 */}
        <motion.div
          className="flex flex-col gap-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-40"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* 颜料盒 */}
          <div className="w-full bg-white rounded-xl p-3 shadow-md border-4 border-amber-800/30">
            <h3 className="text-gray-800 font-medium mb-2 text-center text-sm">颜料盒</h3>
            <div className="grid grid-cols-2 gap-1">
              {paletteColors.map((color) => (
                <motion.div
                  key={color.id}
                  className={`w-full aspect-square rounded-md cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    selectedPaletteColor === color.color ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color.color }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePaletteColorSelect(color.color)}
                >
                  {selectedPaletteColor === color.color && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center text-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <i className="fa-solid fa-check text-xl"></i>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 色板 */}
          <div className="w-full bg-white rounded-xl p-3 shadow-md">
            <h3 className="text-gray-800 font-medium mb-2 text-center text-sm">色板</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-8 gap-[2px]">
                {colorShades.map((shade, index) => (
                  <motion.div
                    key={index}
                    className={`w-full aspect-square rounded-md cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      selectedColor === shade ? 'ring-2 ring-black ring-offset-1 scale-110' : 'opacity-90'
                    }`}
                    style={{ backgroundColor: shade }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleColorSelect(shade)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {selectedColor === shade && (
                      <motion.div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                        <i className="fa-solid fa-check"></i>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* 渐变取色器 */}
              <motion.div
                className="w-full aspect-square rounded-md relative overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,1)), 
                              linear-gradient(to right, hsl(${currentHue}, 100%, 50%), hsl(${currentHue}, 0%, 50%))`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleColorPickerSelect}
              >
                <motion.div
                  className="absolute w-6 h-6 rounded-full border-2 border-white"
                  style={{ 
                    left: `${colorPickerPosition.x}%`, 
                    top: `${colorPickerPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 10px rgba(255,255,255,0.8)', '0 0 0px rgba(255,255,255,0)']
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>
              
              {/* 色谱条 */}
              <div className="relative h-4 rounded-md overflow-hidden">
                <div className="w-full h-full" style={{
                  background: 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)'
                }}></div>
                <motion.div
                  className="absolute w-3 h-6 -mt-1 bg-white border-2 border-gray-400 rounded-full top-0"
                  style={{ left: `${currentHue / 360 * 100}%`, transform: 'translateX(-50%)' }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </div>
              
              {/* HEX输入 */}
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: selectedColor }} />
                <input
                  type="text"
                  value={hexColor}
                  onChange={(e) => handleHexChange(e.target.value)}
                  maxLength={6}
                  className="w-[60px] px-1 py-1 border border-gray-300 rounded text-xs text-center"
                  placeholder="HEX"
                />
                <div className="text-xs text-gray-500">HEX</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 画布 */}
        <motion.div
          className="flex-grow flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative w-full h-full bg-gray-100 rounded-lg shadow-inner overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full bg-white cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl font-medium pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              开始你的创作吧...
            </motion.div>
          </div>
        </motion.div>
        
        {/* 右侧工具 */}
        <motion.div
          className="flex flex-col items-center gap-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-44"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* 大小和透明度 */}
                    <div className="w-full bg-white rounded-lg p-2 shadow-md">
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-700">大小</label>
                <span className="text-xs text-gray-500">{brushSize}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-700">透明度</label>
                <span className="text-xs text-gray-500">{opacity}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
            
          {/* 工具选择 */}
          <div className="w-full">
            <div className="flex flex-col gap-2">
              {tools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-3 rounded-lg flex items-center justify-start cursor-pointer transition-all duration-300 bg-white shadow-md ${
                    selectedTool === tool.id ? 'border-2 border-amber-500 shadow-lg' : ''
                  }`}
                >
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="w-14 h-14 object-contain mr-3"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/50x50/FFD700/ffffff?text=${tool.name}`;
                    }}
                  />
                  <span className="text-sm text-gray-700">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
         
          {/* 清除按钮 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCanvas}
            className="w-full px-3 py-1.5 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 mt-auto text-sm"
          >
            <i className="fa-solid fa-trash-can mr-1"></i> 清除画布
          </motion.button>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Painting;