import {Button} from '@components/Button';
import {MainPaddingWrapper} from '@hocs/MainPaddingWrapper';
import createStyles from '@utils/styles/createStyles';

import React from 'react';
import {Modal, Text, TouchableWithoutFeedback, View} from 'react-native';
type ModalProps = {
  isVisible: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmationText: string;
  cancelText: string;
};

export const DefaultModal = ({
  isVisible,
  text,
  onConfirm,
  onCancel,
  confirmationText,
  cancelText,
}: ModalProps) => {
  return (
    <MainPaddingWrapper>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{text}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  labelStyle={styles.labelStyle}
                  onPress={onCancel}
                  label={cancelText}
                  style={styles.button}
                  backgroundColors={{
                    active: 'transparent',
                    disabled: 'white',
                  }}
                />
                <Button
                  onPress={onConfirm}
                  label={confirmationText}
                  style={styles.button}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </MainPaddingWrapper>
  );
};

const styles = createStyles(({colors, fonts}) => ({
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.greenOtp,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.lightBlack,
    fontFamily: fonts.main,
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  labelStyle: {
    color: colors.greenOtp,
  },
}));
