import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal} from '../../types';
import MealItem from '../../components/MealItem';

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {onGetFood} = useFoodStorage();
  const [allFood, setAllFood] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setAllFood(foodsResponse);
    } catch (error) {
      console.error(error);
      setAllFood([]);
    }
  };

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (!shouldUpdate) {
      Alert.alert('Meal saved succes!');
      loadFoods();
    }

    setIsVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFood();
      setAllFood(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.legendAddFood}>AddFood</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={'#fff'} />}
            color="#4ecb71"
            radius={'lg'}
            onPress={() => {
              setIsVisible(true);
            }}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples, pie, soda..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title={'Search'}
          color={'#ade8af'}
          titleStyle={styles.searchBtnTitle}
          radius={'lg'}
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {allFood?.map((food, idx) => (
          <MealItem
            key={`My-meal-item-#${food.name}-${idx}`}
            name={food.name}
            calories={food.calories}
            serving={food.serving}
            isAbleToAdd={true}
            onCompleteAddRemove={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
  },
  legendAddFood: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {},
});

export default AddFood;
