import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.disabled;
    switch (variant) {
      case 'secondary':
        return 'transparent';
      case 'outline':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.disabled;
    switch (variant) {
      case 'outline':
        return colors.primary;
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textDisabled;
    switch (variant) {
      case 'secondary':
      case 'outline':
        return colors.primary;
      default:
        return colors.buttonText;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingVertical: 14,
          paddingHorizontal: 28,
          fontSize: 18,
        };
      default: // medium
        return {
          paddingVertical: 10,
          paddingHorizontal: 20,
          fontSize: 16,
        };
    }
  };

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      ...getSizeStyles(),
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: getSizeStyles().fontSize,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? colors.buttonText : colors.primary} 
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    minWidth: 80,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;