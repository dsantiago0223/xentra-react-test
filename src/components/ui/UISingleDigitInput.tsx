import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Colors, Fonts } from '../../constants/Constants';

type UISingleDigitInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  length?: number;
  placeholder?: string;
  secure?: boolean;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
};

const BOX_SIZE = 70;

const UISingleDigitInput = ({
  containerStyle,
  length = 4,
  placeholder = '',
  secure = false,
  onChange,
  onComplete,
}: UISingleDigitInputProps) => {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
    setCode(cleaned);
    onChange?.(cleaned);

    if (cleaned.length === length) {
      onComplete?.(cleaned);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}
    >
      <View style={[styles.container, containerStyle]}>
        {Array.from({ length }).map((_, index) => {
          const digit = code[index] ?? '';
          const isFocused = code.length === index;

          let displayValue = '';

          if (digit) {
            displayValue = secure ? '•' : digit;
          } else if (placeholder) {
            displayValue = placeholder;
          }

          return (
            <View
              key={index}
              style={[styles.input, isFocused && styles.focused]}
            >
              <Text
                style={[
                  styles.text,
                  !digit && placeholder && styles.placeholderText,
                ]}
              >
                {displayValue}
              </Text>
            </View>
          );
        })}

        {/* Hidden real input */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden={true}
          style={styles.hiddenInput}
        />
      </View>
    </TouchableOpacity>
  );
};

export default UISingleDigitInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  input: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 12,
    backgroundColor: Colors.grayInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focused: {
    borderWidth: 1,
    borderColor: Colors.greenLight,
  },
  text: {
    fontSize: 28,
    fontFamily: Fonts.medium,
    color: Colors.grayDark,
  },
  placeholderText: {
    color: Colors.grayDark,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
});
