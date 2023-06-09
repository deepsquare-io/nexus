import classnames from 'classnames';
import Link from 'next/link';
import { BsCheckLg } from 'react-icons/bs';
import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
// import type { TailwindValuesColor } from 'tailwindcss/tailwind-config';
import '@mui/lab/themeAugmentation';
import type { StepIconProps } from '@mui/material/StepIcon';
import type { PaletteColorOptions, SimplePaletteColorOptions, ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import tailwind from '@styles/tailwind';

type TailwindValuesColor = {
  primary: string;
  secondary: string;
  neutral: string;
  background: string;
};

declare module '@mui/material/styles' {
  export interface Palette {
    neutral: SimplePaletteColorOptions;
    highlight: SimplePaletteColorOptions;
    contrast: SimplePaletteColorOptions;
  }

  // allow configuration using `createTheme`
  export interface PaletteOptions {
    neutral?: PaletteColorOptions;
    highlight?: PaletteColorOptions;
    contrast?: PaletteColorOptions;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    highlight: true;
    contrast: true;
  }
}

const colors = tailwind?.theme?.colors as TailwindValuesColor;

const LinkBehaviour = forwardRef<
  HTMLAnchorElement,
  Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'component'> & {
    href: string;
  }
>(function LinkBehaviour(props, ref) {
  return <Link ref={ref} {...props} />;
});

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '2.5rem',
      margin: '16px 0 16px 0',
    },
    h2: {
      fontSize: '1.8rem',
      margin: '12px 0 12px 0',
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        severity: 'error',
        variant: 'filled',
        style: {
          marginBottom: '1rem',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
        classes: {
          root: 'rounded-lg',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
    MuiCardContent: {
      defaultProps: {
        classes: {
          root: 'pt-0',
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
        classes: {
          root: 'rounded-lg',
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        classes: {
          root: 'rounded-lg border-[#e6e5ed] border-x-2 border-y-2',
          notchedOutline: 'rounded-lg border-[#e6e5ed] border-x-2 border-y-2',
          input: 'text-[#5D5B70]',
        },
      },
    },
    MuiStepLabel: {
      defaultProps: {
        classes: {
          label: 'font-black text-lg',
        },
        StepIconComponent: (props: StepIconProps) => {
          return (
            <div
              className={classnames(
                'flex justify-center items-center h-min w-6 h-6 font-black',
                props.completed || props.active ? 'bg-primary' : 'bg-dark',
                {
                  'opacity-60 cursor-pointer hover:opacity-100': props.completed,
                },
              )}
            >
              {props.completed ? <BsCheckLg style={{ verticalAlign: 'middle' }} /> : props.icon}
            </div>
          );
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          borderBlock: 'solid',
          borderBlockColor: '#e6e5ed',
          borderBlockWidth: '2px',
        },
        root: {
          borderBlock: 'solid',
          borderBlockColor: '#e6e5ed',
          borderBlockWidth: '2px',
        },
        footer: {
          borderTop: 'solid',
          borderTopColor: '#e6e5ed',
          borderTopWidth: '2px',
          borderBottom: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        // SelectProps: { native: true },
      },
      styleOverrides: {
        // @ts-expect-error Force position to be relative
        root: {
          position: 'relative !important',
          marginTop: 2.5,
          marginBottom: 5,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    neutral: { main: colors.neutral },
    highlight: { main: '#5EEAD4' }, // Cyan
    contrast: { main: '#000000', contrastText: '#090E19' },
    background: {
      default: colors.background, // Background dark blue
      paper: colors.background, // Background dark blue
    },
    text: { primary: '#000000', disabled: '#9CA3AF' }, // White
  },
  shape: {
    borderRadius: 0,
  },
};

const theme = createTheme(themeOptions);

export default theme;
