declare module 'react-burger-menu' {
  import { ComponentType } from 'react';
  export interface State {
    isOpen: boolean;
  }
  export const slide: ComponentType<{
    isOpen?: boolean;
    onStateChange?: (state: State) => void;
    right?: boolean;
    width?: string | number;
    children?: React.ReactNode;
    [key: string]: unknown;
  }>;
  export const stack: ComponentType<Record<string, unknown>>;
  export const elastic: ComponentType<Record<string, unknown>>;
  export const bubble: ComponentType<Record<string, unknown>>;
  export const push: ComponentType<Record<string, unknown>>;
  export const pushRotate: ComponentType<Record<string, unknown>>;
  export const scaleDown: ComponentType<Record<string, unknown>>;
  export const scaleRotate: ComponentType<Record<string, unknown>>;
  export const fallDown: ComponentType<Record<string, unknown>>;
  export const reveal: ComponentType<Record<string, unknown>>;
}
