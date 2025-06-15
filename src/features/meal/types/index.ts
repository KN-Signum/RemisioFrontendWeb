export interface MealDto {
  id?: string;
  patient_id: string;
  meal_name: string;
  meal_date: string; // timestamp
  image_url?: string;
  ontology?: string;
  meal_notes?: string;
  created_at?: string; // timestamp
}
