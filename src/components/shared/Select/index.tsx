import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/native';

import { FlattenSimpleInterpolation } from 'styled-components';

export type Item = {
  value: string;
  text: string;
};

export enum ThemeEnum {
  disabled = 'disabled',
  blank = 'blank',
  none = 'none',
  box = 'box',
  underbar = 'underbar',
}

enum CompEnum {
  rootbox = 'rootbox',
  text = 'text',
  item = 'item',
}
enum StylePropEnum {
  bc = 'backgroundColor',
  fc = 'fontColor',
  bs = 'boxShadow',
  border = 'border',
}

type ThemeStyle<K extends string, T> = {
  [P in K]: T;
};

interface ThemeType {
  theme: ThemeEnum;
}

interface BorderStyle extends ViewStyle {
  borderColor?: string;
  borderWidth?: number;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  borderLeftColor?: string;
  borderLeftWidth?: number;
  borderRightColor?: string;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderTopWidth?: number;
}

interface RootBoxTheme extends DefaultTheme {
  rootbox: {
    backgroundColor: string;
    boxShadow?: FlattenSimpleInterpolation;
    border?: BorderStyle;
  };
}

interface TextTheme extends DefaultTheme {
  text: {
    fontColor: string;
  };
}

export const TESTID = {
  ROOTSELECT: 'root-select',
  ROOTTEXT: 'root-text',
  ROOTARROW: 'root-arrow',
};

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#3a8bff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
  DARK: '#09071d',
};

const bsCss = css`
  elevation: 8;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: {
    width: 3;
    height: 3;
  }
  shadow-opacity: 0.5;
  shadow-radius: 5;
`;

export const themeStylePropCollection: ThemeStyle<
  ThemeEnum,
  RootBoxTheme | TextTheme
> = {
  disabled: {
    rootbox: {
      backgroundColor: 'transparent',
      border: {
        borderBottomColor: COLOR.LIGHTGRAY,
        borderBottomWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.LIGHTGRAY,
    },
  },
  blank: {
    rootbox: {
      backgroundColor: 'transparent',
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  none: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      boxShadow: bsCss,
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  box: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderColor: COLOR.GRAY59,
        borderWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  underbar: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderBottomColor: COLOR.GRAY59,
        borderBottomWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
};

interface ThemePropParams {
  theme: ThemeEnum;
  comp: CompEnum;
  prop: StylePropEnum;
}
const getThemeProp = ({ theme, comp, prop }: ThemePropParams): string => {
  return themeStylePropCollection[theme][comp][prop];
};

const Text = styled.Text<ThemeType>`
  font-size: 14px;
  color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;

const RootSelect = styled.View<ThemeType>`
  background-color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })}
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })}
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.border,
    })}
  width: 128px;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
`;

export interface Props {
  testID?: string;
  items: Item[];
  theme?: ThemeEnum;
  rootViewStyle?: StyleProp<ViewStyle>;
  rootTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  activeOpacity: number;
  disabled?: boolean;
  onPress?: () => void;
}
export const toggleList = ({ listOpen, setListOpen }) => (): void => {
  setListOpen(!listOpen);
};

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    rootViewStyle,
    rootTextStyle,
    placeholder,
    activeOpacity,
    disabled,
    onPress,
  } = props;

  const [listOpen, setListOpen] = useState<boolean>(false);
  const onPressFn = onPress || toggleList({ listOpen, setListOpen });

  const defaultTheme = disabled ? 'disabled' : !theme ? 'none' : theme;
  const rootViewTheme = disabled
    ? 'disabled'
    : rootViewStyle && Object.keys(rootViewStyle).length > 0
      ? 'blank'
      : defaultTheme;
  const rootTextTheme = disabled
    ? 'disabled'
    : rootTextStyle && Object.keys(rootTextStyle).length > 0
      ? 'blank'
      : defaultTheme;
  const _rootViewStyle = disabled ? null : rootViewStyle;
  const _rootTextStyle = disabled ? null : rootTextStyle;

  return (
    <>
      <TouchableOpacity
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={onPressFn}
        disabled={disabled}
      >
        <RootSelect
          theme={rootViewTheme}
          style={_rootViewStyle}
          testID={`${testID}-${TESTID.ROOTSELECT}`}
        >
          <Text
            theme={rootTextTheme}
            style={_rootTextStyle}
            testID={`${testID}-${TESTID.ROOTTEXT}`}
          >
            {placeholder}
          </Text>
          <Image
            source={!listOpen ? IC_ARR_DOWN : IC_ARR_UP}
            testID={`${testID}-${TESTID.ROOTARROW}`}
          />
        </RootSelect>
      </TouchableOpacity>
      {listOpen && <Text theme={rootTextTheme}>{'list item here!!'}</Text>}
    </>
  );
}

Select.defaultProps = {
  theme: 'none',
  placeholder: '',
  activeOpacity: 0.5,
  rootViewStyle: null,
  rootTextStyle: null,
};

export default Select;
