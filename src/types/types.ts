import type { Dispatch, JSX, KeyboardEvent, SetStateAction } from "react";

export type ColorList = string[];

export type SupportedLanguage =
  | "en"
  | "ru"
  | "ar"
  | "fr"
  | "de"
  | "ro"
  | "es"
  | "pl"
  | "pt"
  | "zh"
  | "ja"
  | "ko";
export type SupportedFormat = "rgb" | "hex" | "hwb" | "hsl";

export type LanguagePack = ColorNames & ColorPickerLabels;
export type Accessor<T> = () => T;
export type Setter<T> = Dispatch<SetStateAction<T>>;

export interface ColorPickerLabels {
  pickerLabel: string;
  appearanceLabel: string;
  valueLabel: string;
  toggleLabel: string;
  placeholder: string;
  presetsLabel: string;
  defaultsLabel: string;
  formatLabel: string;
  alphaLabel: string;
  hexLabel: string;
  hueLabel: string;
  whitenessLabel: string;
  blacknessLabel: string;
  saturationLabel: string;
  lightnessLabel: string;
  redLabel: string;
  greenLabel: string;
  blueLabel: string;
  [key: string]: string;
}

export interface ColorNames {
  white: string;
  black: string;
  grey: string;
  red: string;
  orange: string;
  brown: string;
  gold: string;
  olive: string;
  yellow: string;
  lime: string;
  green: string;
  teal: string;
  cyan: string;
  blue: string;
  violet: string;
  magenta: string;
  pink: string;
}

/**
 * Coming from ColorPicker.ColorPalete
 * @example {hue: 0, hueSteps: 12, lightSteps: 10, saturation: 85}
 */
export type ColorPresets = {
  hue: number;
  hueSteps: number;
  lightSteps: number;
  saturation?: number;
};

export type ColorKeywords = (string | Record<string, string>)[];

export type ColorPickerProps = {
  id?: string;
  value?: string;
  theme?: "light" | "dark";
  lang?: SupportedLanguage;
  format?: SupportedFormat;
  className?: string;
  placeholder?: string;
  onChange?: (color: string) => void;
  colorPresets?: ColorPresets;
  colorKeywords?: ColorKeywords;
  locale?: LanguagePack;
};

export type ControlProps = {
  stringValue: string;
};

export type PickerProps = {
  className: string;
};

export type PresetsProps = {
  className: string;
  colorPresets: ColorPresets;
  children?: JSX.Element;
  keyHandler: (e: KeyboardEvent<HTMLElement>) => void;
};

export type KeyProps = {
  colorKeywords: ColorKeywords;
  keyHandler: (e: KeyboardEvent<HTMLElement>) => void;
};

export type MenuProps = {
  className: string;
  colorPresets?: ColorPresets;
  colorKeywords?: ColorKeywords;
  children?: JSX.Element;
  toggleMenu: () => void;
  pickerShown: boolean;
  menuShown: boolean;
};
