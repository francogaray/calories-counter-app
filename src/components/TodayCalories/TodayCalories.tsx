import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

export type TodayCaloriesProps = {
  total: number | string;
  consumed: number | string;
  remaining: number | string;
  percentage: number;
};

const TodayCalories: FC<TodayCaloriesProps> = ({
  total,
  consumed = 0,
  remaining = 0,
  percentage = 20,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix="%" />
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.today}>Today</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Total</Text>
          <Text style={styles.rightItemValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Consumed</Text>
          <Text style={styles.rightItemValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightItemLegend}>Remaining</Text>
          <Text style={styles.rightItemValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodayCalories;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  today: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  rightItem: {flexDirection: 'row', marginBottom: 8},
  rightItemLegend: {flex: 1},
  rightItemValue: {flex: 1, textAlign: 'right'},
});
