import {StyleSheet, Modal, View, Text} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {Button, Icon, Input} from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

type AddFoodModalProps = {
  onClose: (shouldUpdate?: boolean) => void;
  visible: boolean;
};

const AddFoodModal: FC<AddFoodModalProps> = ({onClose, visible}) => {
  const [calories, setCalories] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [serving, setServing] = useState<string>('');
  const {onSaveFood} = useFoodStorage();

  useEffect(() => {
    setCalories('');
    setName('');
    setServing('');
  }, [visible]);

  const handleAddSubmit = async () => {
    try {
      onSaveFood({calories, name, serving});
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              style={styles.closeButton}
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={(text: string) => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Kcal</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Name</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={serving}
                onChangeText={(text: string) => setServing(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Serving</Text>
            </View>
          </View>
          <View style={styles.addBtnContainer}>
            <Button
              style={styles.addBtn}
              icon={<Icon name="add" size={28} />}
              title={'Add'}
              onPress={handleAddSubmit}
              color={'#4ecb71'}
              radius={'lg'}
              disabled={
                calories.trim() === '' ||
                serving.trim() === '' ||
                name.trim() === ''
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0 ,0, 0.5)',
  },
  content: {
    width: '75%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  closeButton: {},
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: '500',
  },
  addBtnContainer: {
    alignItems: 'flex-end',
  },
  addBtn: {},
});

export default AddFoodModal;
