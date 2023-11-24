import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Meal} from '../../types';
import {Button, Icon} from '@rneui/base';
import useFoodStorage from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove: () => void;
  itemPosition?: number;
};

const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  serving,
  isAbleToAdd,
  onCompleteAddRemove,
  itemPosition,
}) => {
  const {onSaveTodayFood, onDeleteTodayFood} = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({calories, name, serving});
        Alert.alert('Food Added successfully');
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert('Food Deleted successfully');
      }
      onCompleteAddRemove?.();
    } catch (error) {
      console.error(error);
      Alert.alert('Can not save food');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.serving}>{serving}</Text>
      </View>
      <View style={styles.rightcontainer}>
        <Button
          type="clear"
          icon={<Icon name={isAbleToAdd ? 'add-circle-outline' : 'close'} />}
          style={styles.iconBtn}
          onPress={handleIconPress}
        />
        <Text style={styles.calories}>{calories} Kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ade8af',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  serving: {
    fontSize: 13,
    color: '#808080',
    fontWeight: '500',
  },
  rightcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 18,
  },
  iconBtn: {
    marginBottom: -8,
  },
});

export default MealItem;
