import { useState } from 'react';
import type { IngredientItem } from '../../../../types';

const seasoningImages = [
  { id: 1, name: "盐", imageUrl: '/images/cooking/seasonings/salt.png' },
  { id: 2, name: "糖", imageUrl: '/images/cooking/seasonings/sugar.png' },
  { id: 3, name: "胡椒", imageUrl: '/images/cooking/seasonings/pepper.png' },
  { id: 4, name: "燕麦", imageUrl: '/images/cooking/seasonings/oat.png' },
  { id: 5, name: "八角", imageUrl: '/images/cooking/seasonings/star-anise.png' },
  { id: 6, name: "花椒", imageUrl: '/images/cooking/seasonings/sichuan-pepper.png' },
  { id: 7, name: "香叶", imageUrl: '/images/cooking/seasonings/bay-leaf.png' },
  { id: 8, name: "桂皮", imageUrl: '/images/cooking/seasonings/cinnamon.png' },
  { id: 9, name: "酱油", imageUrl: '/images/cooking/seasonings/soy-sauce.png' },
  { id: 10, name: "醋", imageUrl: '/images/cooking/seasonings/vinegar.png' },
  { id: 11, name: "油", imageUrl: '/images/cooking/seasonings/oil.png' },
  { id: 12, name: "香油", imageUrl: '/images/cooking/seasonings/sesame-oil.png' },
  { id: 13, name: "料酒", imageUrl: '/images/cooking/seasonings/cooking-wine.png' },
  { id: 14, name: "番茄酱", imageUrl: '/images/cooking/seasonings/ketchup.png' },
  { id: 15, name: "淀粉", imageUrl: '/images/cooking/seasonings/starch.png' },
  { id: 16, name: "辣椒粉", imageUrl: '/images/cooking/seasonings/chili-powder.png' },
];

const vegetableImages = [
  { id: 1, name: "胡萝卜", imageUrl: '/images/cooking/vegetables/carrot.png' },
  { id: 2, name: "西兰花", imageUrl: '/images/cooking/vegetables/broccoli.png' },
  { id: 3, name: "土豆", imageUrl: '/images/cooking/vegetables/potato.png' },
  { id: 4, name: "洋葱", imageUrl: '/images/cooking/vegetables/onion.png' },
  { id: 5, name: "番茄", imageUrl: '/images/cooking/vegetables/tomato.png' },
  { id: 6, name: "青椒", imageUrl: '/images/cooking/vegetables/green-pepper.png' },
  { id: 7, name: "黄瓜", imageUrl: '/images/cooking/vegetables/cucumber.png' },
  { id: 8, name: "茄子", imageUrl: '/images/cooking/vegetables/eggplant.png' },
  { id: 9, name: "白菜", imageUrl: '/images/cooking/vegetables/cabbage.png' },
  { id: 10, name: "芹菜", imageUrl: '/images/cooking/vegetables/celery.png' },
  { id: 11, name: "芦笋", imageUrl: '/images/cooking/vegetables/asparagus.png' },
  { id: 12, name: "南瓜", imageUrl: '/images/cooking/vegetables/pumpkin.png' },
  { id: 13, name: "青豆", imageUrl: '/images/cooking/vegetables/green-peas.png' },
  { id: 14, name: "玉米", imageUrl: '/images/cooking/vegetables/corn.png' },
  { id: 15, name: "蘑菇", imageUrl: '/images/cooking/vegetables/mushroom.png' },
  { id: 16, name: "大蒜", imageUrl: '/images/cooking/vegetables/garlic.png' },
];

const fruitImages = [
  { id: 1, name: "苹果", imageUrl: '/images/cooking/fruits/apple.png' },
  { id: 2, name: "香蕉", imageUrl: '/images/cooking/fruits/banana.png' },
  { id: 3, name: "葡萄", imageUrl: '/images/cooking/fruits/grape.png' },
  { id: 4, name: "草莓", imageUrl: '/images/cooking/fruits/strawberry.png' },
  { id: 5, name: "桃子", imageUrl: '/images/cooking/fruits/peach.png' },
  { id: 6, name: "梨", imageUrl: '/images/cooking/fruits/pear.png' },
  { id: 7, name: "橙子", imageUrl: '/images/cooking/fruits/orange.png' },
  { id: 8, name: "芒果", imageUrl: '/images/cooking/fruits/mango.png' },
  { id: 9, name: "菠萝", imageUrl: '/images/cooking/fruits/pineapple.png' },
  { id: 10, name: "橘子", imageUrl: '/images/cooking/fruits/tangerine.png' },
  { id: 11, name: "猕猴桃", imageUrl: '/images/cooking/fruits/kiwi.png' },
  { id: 12, name: "西瓜", imageUrl: '/images/cooking/fruits/watermelon.png' },
  { id: 13, name: "樱桃", imageUrl: '/images/cooking/fruits/cherry.png' },
  { id: 14, name: "蓝莓", imageUrl: '/images/cooking/fruits/blueberry.png' },
  { id: 15, name: "火龙果", imageUrl: '/images/cooking/fruits/dragon-fruit.png' },
  { id: 16, name: "哈密瓜", imageUrl: '/images/cooking/fruits/hami-melon.png' },
];

const meatImages = [
  { id: 1, name: "牛排", imageUrl: '/images/cooking/meats/beef-steak.png' },
  { id: 2, name: "香肠", imageUrl: '/images/cooking/meats/sausage.png' },
  { id: 3, name: "鸡腿", imageUrl: '/images/cooking/meats/chicken-leg.png' },
  { id: 4, name: "虾", imageUrl: '/images/cooking/meats/shrimp.png' },
  { id: 5, name: "五花肉", imageUrl: '/images/cooking/meats/pork-belly.png' },
  { id: 6, name: "培根", imageUrl: '/images/cooking/meats/bacon.png' },
  { id: 7, name: "肉块", imageUrl: '/images/cooking/meats/meat-chunk.png' },
  { id: 8, name: "肉排", imageUrl: '/images/cooking/meats/meat-steak.png' },
  { id: 9, name: "鸡蛋", imageUrl: '/images/cooking/meats/egg.png' },
  { id: 10, name: "猪排", imageUrl: '/images/cooking/meats/pork-chop.png' },
  { id: 11, name: "鸡翅根", imageUrl: '/images/cooking/meats/chicken-wing.png' },
  { id: 12, name: "牛肉", imageUrl: '/images/cooking/meats/beef.png' },
  { id: 13, name: "牛腱子", imageUrl: '/images/cooking/meats/beef-shank.png' },
  { id: 14, name: "鸭脖", imageUrl: '/images/cooking/meats/duck-neck.png' },
  { id: 15, name: "鸡胸肉", imageUrl: '/images/cooking/meats/chicken-breast.png' },
  { id: 16, name: "猪蹄", imageUrl: '/images/cooking/meats/pork-hoof.png' },
];

const categories = [
  { id: 'fruit', name: '水果类', imageUrl: '/images/cooking/fruits/apple.png' },
  { id: 'vegetable', name: '蔬菜类', imageUrl: '/images/cooking/vegetables/carrot.png' },
  { id: 'meat', name: '肉类', imageUrl: '/images/cooking/meats/chicken-leg.png' },
  { id: 'seasoning', name: '调料类', imageUrl: '/images/cooking/seasonings/salt.png' },
];

export const useCookingGame = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategoryIngredients = (category: string): IngredientItem[] => {
    switch(category) {
      case 'seasoning': return seasoningImages.map(i => ({ ...i, category: 'seasoning' as const }));
      case 'vegetable': return vegetableImages.map(i => ({ ...i, category: 'vegetable' as const }));
      case 'fruit': return fruitImages.map(i => ({ ...i, category: 'fruit' as const }));
      case 'meat': return meatImages.map(i => ({ ...i, category: 'meat' as const }));
      default: return [];
    }
  };

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    getCategoryIngredients,
  };
};