import React, { createContext } from 'react';

export type PaletteState = Record<string, string>;

type ColorMode = 'light' | 'dark';

export interface ThemeContextValue {
  palette: PaletteState;
  setPalette: React.Dispatch<React.SetStateAction<PaletteState>>;
  theme: unknown;
  updateTheme: (palette: PaletteState) => void;
  updateThemeFromMaster: (
    value: string,
    setPalette: React.Dispatch<React.SetStateAction<PaletteState>>
  ) => void;
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
}

const noop = () => {};

export const ThemeContext = createContext<ThemeContextValue>({
  palette: {},
  setPalette: noop as unknown as React.Dispatch<React.SetStateAction<PaletteState>>, 
  theme: {},
  updateTheme: noop as (palette: PaletteState) => void,
  updateThemeFromMaster: noop as (
    value: string,
    setPalette: React.Dispatch<React.SetStateAction<PaletteState>>
  ) => void,
  colorMode: 'light',
  setColorMode: noop as React.Dispatch<React.SetStateAction<ColorMode>>,
});

export default ThemeContext;


