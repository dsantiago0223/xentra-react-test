import { Platform } from 'react-native';
import { Colors } from '../constants';

export const buildQueryString = (params: Record<string, any>) => {
  if (!params) return '';

  const build = (obj: Record<string, any>, prefix = ''): string[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (Array.isArray(value)) {
        return value.map(
          v => `${encodeURIComponent(fullKey)}[]=${encodeURIComponent(v)}`,
        );
      }

      if (value !== null && typeof value === 'object') {
        return build(value, fullKey);
      }

      if (value === null || value === undefined) return [];

      return [`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`];
    });
  };

  const query = build(params).join('&');
  return query ? `?${query}` : '';
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const shadow = (elevation = 4, color = Colors.grayMedium) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.15,
      shadowRadius: elevation,
    };
  }

  return {
    elevation,
  };
};
