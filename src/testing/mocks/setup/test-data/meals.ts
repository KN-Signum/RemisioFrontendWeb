import { MealDto } from '@/features/meals/types';
import { getStringDate } from '../common';

export const mockMeals: MealDto[] = [
  {
    id: 'meal001',
    patient_id: 'p001',
    meal_name: 'Breakfast - Oatmeal with Fruits',
    meal_date: getStringDate(5),
    image_url:
      'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=500',
    ontology: 'breakfast,oatmeal,fruits,healthy',
    meal_notes: 'Felt good after eating, no immediate symptoms.',
    created_at: getStringDate(5),
  },
  {
    id: 'meal002',
    patient_id: 'p001',
    meal_name: 'Lunch - Grilled Chicken Salad',
    meal_date: getStringDate(5),
    image_url:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500',
    ontology: 'lunch,chicken,salad,protein,vegetables',
    meal_notes: 'Experienced mild bloating 30 minutes after eating.',
    created_at: getStringDate(5),
  },
  {
    id: 'meal003',
    patient_id: 'p001',
    meal_name: 'Dinner - Salmon with Rice',
    meal_date: getStringDate(4),
    image_url:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500',
    ontology: 'dinner,salmon,rice,omega3,protein',
    meal_notes: 'Felt fine after this meal.',
    created_at: getStringDate(4),
  },
  {
    id: 'meal004',
    patient_id: 'p002',
    meal_name: 'Breakfast - Scrambled Eggs',
    meal_date: getStringDate(3),
    image_url:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500',
    ontology: 'breakfast,eggs,protein',
    meal_notes: 'No issues.',
    created_at: getStringDate(3),
  },
  {
    id: 'meal005',
    patient_id: 'p002',
    meal_name: 'Lunch - Tuna Sandwich',
    meal_date: getStringDate(3),
    image_url:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500',
    ontology: 'lunch,tuna,sandwich,bread,protein',
    meal_notes: 'Experienced some abdominal discomfort after eating bread.',
    created_at: getStringDate(3),
  },
  {
    id: 'meal006',
    patient_id: 'p003',
    meal_name: 'Breakfast - Yogurt with Granola',
    meal_date: getStringDate(2),
    image_url:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500',
    ontology: 'breakfast,yogurt,granola,probiotics',
    meal_notes: 'Felt good, probiotics seem to help.',
    created_at: getStringDate(2),
  },
  {
    id: 'meal007',
    patient_id: 'p003',
    meal_name: 'Lunch - Vegetable Soup',
    meal_date: getStringDate(2),
    image_url:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500',
    ontology: 'lunch,soup,vegetables,cooked',
    meal_notes: 'Easy to digest, no issues.',
    created_at: getStringDate(2),
  },
  {
    id: 'meal008',
    patient_id: 'p004',
    meal_name: 'Dinner - Pasta with Tomato Sauce',
    meal_date: getStringDate(1),
    image_url:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500',
    ontology: 'dinner,pasta,tomato,carbs',
    meal_notes: 'Tomato sauce caused heartburn and discomfort.',
    created_at: getStringDate(1),
  },
  {
    id: 'meal009',
    patient_id: 'p004',
    meal_name: 'Breakfast - Smoothie Bowl',
    meal_date: getStringDate(1),
    image_url:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=500',
    ontology: 'breakfast,smoothie,fruits,healthy',
    meal_notes: 'Felt energized after this.',
    created_at: getStringDate(1),
  },
  {
    id: 'meal010',
    patient_id: 'p005',
    meal_name: 'Lunch - Quinoa Bowl',
    meal_date: getStringDate(1),
    image_url:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=500',
    ontology: 'lunch,quinoa,vegetables,healthy,protein',
    meal_notes: 'Good tolerance, felt satisfied.',
    created_at: getStringDate(1),
  },
];
