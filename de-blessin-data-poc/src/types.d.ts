export interface IngredientLine {
    id: string;
    rawText: string;
    uri: string;
    calories: number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    totalNutrients: TotalNutrients;
    totalDaily: TotalDaily;
    ingredients: Ingredient[];
    totalNutrientsKCal: TotalNutrientsKcal;
  }
  
  export interface TotalNutrients {
    ENERC_KCAL: Nutrient;
    FAT: Nutrient;
    FASAT: Nutrient;
    FAMS: Nutrient;
    FAPU: Nutrient;
    CHOCDF: Nutrient;
    "CHOCDF.net": Nutrient;
    FIBTG: Nutrient;
    SUGAR: Nutrient;
    "SUGAR.added": Nutrient;
    PROCNT: Nutrient;
    CHOLE: Nutrient;
    NA: Nutrient;
    CA: Nutrient;
    MG: Nutrient;
    K: Nutrient;
    FE: Nutrient;
    ZN: Nutrient;
    P: Nutrient;
    VITA_RAE: Nutrient;
    VITC: Nutrient;
    THIA: Nutrient;
    RIBF: Nutrient;
    NIA: Nutrient;
    VITB6A: Nutrient;
    FOLDFE: Nutrient;
    FOLFD: Nutrient;
    FOLAC: Nutrient;
    VITB12: Nutrient;
    VITD: Nutrient;
    TOCPHA: Nutrient;
    VITK1: Nutrient;
    WATER: Nutrient;
  }
  
  export interface TotalDaily {
    ENERC_KCAL: Nutrient;
    FAT: Nutrient;
    FASAT: Nutrient;
    CHOCDF: Nutrient;
    FIBTG: Nutrient;
    PROCNT: Nutrient;
    CHOLE: Nutrient;
    NA: Nutrient;
    CA: Nutrient;
    MG: Nutrient;
    K: Nutrient;
    FE: Nutrient;
    ZN: Nutrient;
    P: Nutrient;
    VITA_RAE: Nutrient;
    VITC: Nutrient;
    THIA: Nutrient;
    RIBF: Nutrient;
    NIA: Nutrient;
    VITB6A: Nutrient;
    FOLDFE: Nutrient;
    VITB12: Nutrient;
    VITD: Nutrient;
    TOCPHA: Nutrient;
    VITK1: Nutrient;
  }
  
  export interface Ingredient {
    text: string;
    parsed: Parsed[];
  }
  
  export interface Parsed {
    quantity: number;
    measure: string;
    foodMatch: string;
    food: string;
    foodId: string;
    weight: number;
    retainedWeight: number;
    nutrients: Nutrients;
    measureURI: string;
    status: string;
  }
  
  export interface Nutrients {
    RIBF: Nutrient;
    VITD: Nutrient;
    THIA: Nutrient;
    FAPU: Nutrient;
    NIA: Nutrient;
    ENERC_KCAL: Nutrient;
    FASAT: Nutrient;
    VITA_RAE: Nutrient;
    VITC: Nutrient;
    PROCNT: Nutrient;
    TOCPHA: Nutrient;
    CHOLE: Nutrient;
    FAMS: Nutrient;
    CHOCDF: Nutrient;
    FAT: Nutrient;
    VITB6A: Nutrient;
    VITB12: Nutrient;
    "SUGAR.added": Nutrient;
    FIBTG: Nutrient;
    WATER: Nutrient;
    K: Nutrient;
    P: Nutrient;
    NA: Nutrient;
    ZN: Nutrient;
    SUGAR: Nutrient;
    CA: Nutrient;
    MG: Nutrient;
    FE: Nutrient;
    VITK1: Nutrient;
    FOLFD: Nutrient;
    FOLAC: Nutrient;
    FOLDFE: Nutrient;
  }
  
  export interface TotalNutrientsKcal {
    ENERC_KCAL: Nutrient;
    PROCNT_KCAL: Nutrient;
    FAT_KCAL: Nutrient;
    CHOCDF_KCAL: Nutrient;
  }
  
  export interface Nutrient {
    label: string;
    quantity: number;
    unit: string;
  }
  