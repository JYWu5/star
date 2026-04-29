// 游戏全局状态类型
export interface TestResult {
  '休憩安稳度': number;
  '食欲满足度': number;
  '情感陪伴度': number;
  '现实掌控感': number;
  summary: string;
}

export interface GameState {
  userBirthday: string | null;
  selectedGender: 'male' | 'female' | null;
  selectedCharacter: string | null;
  testResult: TestResult | null;
  dreamProgress: Record<string, boolean>;
  fairyProgress: Record<string, boolean>;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, number[]>;
}

// 生日选择
export interface BirthdayData {
  year: number;
  month: number;
  day: number;
}

// 食材类型
export interface IngredientItem {
  id: number;
  name: string;
  imageUrl: string;
  category: 'fruit' | 'vegetable' | 'meat' | 'seasoning';
}

// 画笔工具
export type ToolType = 'brush1' | 'brush2' | 'brush3' | 'brush4' | 'eraser';

export interface Tool {
  id: ToolType;
  imageUrl: string;
  name: string;
  lineWidth: number;
  lineCap: CanvasLineCap;
}

// 颜色选项
export interface ColorOption {
  id: string;
  color: string;
  name: string;
}

// 问题选项
export interface QuestionOption {
  id: number;
  text: string;
  imageUrl: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

// 角色位置
export interface CharacterPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isMoving: boolean;
  direction: 'left' | 'right';
}

// 地图标记点
export interface MapMarker {
  id: string;
  x: string;
  y: string;
  label: string;
  imageUrl: string;
  size: string;
  onClick?: () => void;
}