import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      primaryBg: string;
      secondaryBg: string;
      accentColor: string;
      textPrimary: string;
      textSecondary: string;
      errorColor: string;
      successColor: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      primaryBg?: string;
      secondaryBg?: string;
      accentColor?: string;
      textPrimary?: string;
      textSecondary?: string;
      errorColor?: string;
      successColor?: string;
    };
  }
}