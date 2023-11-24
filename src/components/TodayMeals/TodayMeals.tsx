import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Meal} from '../../types';
import MealItem from '../MealItem';

type TodayMealsProps = {
  foods: Meal[];
  onCompleteAddRemove: () => void;
};
const TodayMeals: FC<TodayMealsProps> = ({foods, onCompleteAddRemove}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals</Text>
      <ScrollView style={styles.content}>
        {foods?.map((food: Meal, idx) => (
          <MealItem
            key={`today-item-${food.name}-${idx}`}
            {...food}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={idx}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TodayMeals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginVertical: 16,
  },
});
