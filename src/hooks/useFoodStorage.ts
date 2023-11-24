import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meal} from '../types';
import {isToday} from 'date-fns';
const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key';

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood != null) {
        const currentSavedFoodParsed = JSON.parse(currentSavedFood);
        currentSavedFoodParsed.push(meal);
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
      return Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };
  const handleSaveFood = async ({calories, name, serving}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        serving,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({calories, name, serving}: Meal) => {
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        serving,
        date: new Date().toISOString(),
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(
          parsedFoods.filter(
            (food: {date: string | number | Date}) =>
              food.date && isToday(new Date(food.date)),
          ),
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async (idx: number) => {
    try {
      const todayFood = await handleGetTodayFood();
      const filteredFood = todayFood?.filter(
        (item: Meal, itemIndex: number) => {
          return itemIndex !== idx;
        },
      );
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredFood),
      );
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  return {
    onSaveFood: handleSaveFood,
    onGetFood: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetFoodsToday: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

export default useFoodStorage;
