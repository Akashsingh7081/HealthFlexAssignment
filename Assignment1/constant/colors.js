export const colors = {
    light: {
      // Main colors
      primary: '#007AFF',
      secondary: '#5856D6',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      
      // Background colors
      background: '#F2F2F7',
      card: '#FFFFFF',
      modal: '#FFFFFF',
      
      // Text colors
      text: '#000000',
      textSecondary: '#666666',
      textTertiary: '#999999',
      textDisabled: '#C7C7CC',
      buttonText: '#FFFFFF',
      placeholder: '#C7C7CC',
      
      // Border colors
      border: '#E5E5EA',
      divider: '#C6C6C8',
      
      // Status colors
      active: '#34C759',
      inactive: '#FF3B30',
      
      // Interactive states
      pressed: '#0062CC', // Darker primary
      disabled: '#E5E5EA',
      
      // Progress bars
      progressBackground: '#E5E5EA',
      progressFill: '#007AFF',
      
      // Specific use cases
      timerRunning: '#34C759',
      timerPaused: '#FF9500',
      timerCompleted: '#5856D6',
      
      // Gradients
      gradientStart: '#007AFF',
      gradientEnd: '#5856D6',
    },
    
    dark: {
      // Main colors
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      success: '#32D74B',
      warning: '#FF9F0A',
      error: '#FF453A',
      
      // Background colors
      background: '#000000',
      card: '#1C1C1E',
      modal: '#2C2C2E',
      
      // Text colors
      text: '#FFFFFF',
      textSecondary: '#EBEBF5',
      textTertiary: '#EBEBF599',
      textDisabled: '#3A3A3C',
      buttonText: '#FFFFFF',
      placeholder: '#3A3A3C',
      
      // Border colors
      border: '#38383A',
      divider: '#38383A',
      
      // Status colors
      active: '#32D74B',
      inactive: '#FF453A',
      
      // Interactive states
      pressed: '#0062CC', // Darker primary
      disabled: '#3A3A3C',
      
      // Progress bars
      progressBackground: '#38383A',
      progressFill: '#0A84FF',
      
      // Specific use cases
      timerRunning: '#32D74B',
      timerPaused: '#FF9F0A',
      timerCompleted: '#5E5CE6',
      
      // Gradients
      gradientStart: '#0A84FF',
      gradientEnd: '#5E5CE6',
    },
    
    // Shared colors (same in both themes)
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Color opacity variants
    getWithOpacity: (color, opacity) => {
      // Convert hex to rgba
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  };