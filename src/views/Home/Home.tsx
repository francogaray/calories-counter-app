import {StyleSheet, View, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/Header';
import {Button, Icon} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal, RootStackParamList} from '../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TodayCalories, {
  TodayCaloriesProps,
} from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const totalCaloriesPerDay = 2000;

const Home = () => {
  const {onGetFoodsToday} = useFoodStorage();
  const [foodsToday, setFoodsToday] = useState<Meal[]>([]);
  const [todayStatistics, setTodayStatitics] = useState<TodayCaloriesProps>({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });

  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const calculateTodayStatistics = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acc, curr) => acc + Number(curr.calories),
        0,
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;

      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;

      setTodayStatitics({
        consumed: caloriesConsumed,
        remaining: remainingCalories,
        percentage,
        total: totalCaloriesPerDay,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadFoodsToday = useCallback(async () => {
    try {
      const todayFoodsResponse = await onGetFoodsToday();
      setFoodsToday(todayFoodsResponse);
      calculateTodayStatistics(todayFoodsResponse);
    } catch (error) {
      setFoodsToday([]);
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFoodsToday().catch(null);
    }, [loadFoodsToday]),
  );

  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  console.log(foodsToday);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerCalories}>
        <View style={styles.leftContainer}>
          <Text style={styles.legendCalories}>Calories </Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={'#fff'} />}
            radius={'lg'}
            color={'#4ecb71'}
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={foodsToday}
        onCompleteAddRemove={() => loadFoodsToday()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  containerCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  legendCalories: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
