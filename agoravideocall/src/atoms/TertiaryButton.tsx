import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ThemeConfig from '../theme';
import hexadecimalTransparency from '../utils/hexadecimalTransparency';
import {isWebInternal, isMobileUA} from '../utils/common';
import {IconsInterface} from './CustomIcon';
import ImageIcon from './ImageIcon';

interface ButtonProps extends TouchableOpacityProps {
  setRef?: (ref: any) => void;
  text?: string;
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: keyof IconsInterface;
  iconSize?: number;
  iconColor?: string;
}

const TertiaryButton = (props: ButtonProps) => {
  const {
    text,
    iconName,
    iconSize = 26,
    iconColor = $config.PRIMARY_ACTION_TEXT_COLOR,
    disabled = false,
    ...rest
  } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PlatformWrapper setIsHovered={setIsHovered}>
      <TouchableOpacity
        disabled={disabled}
        ref={ref => props?.setRef && props.setRef(ref)}
        style={[
          styles.container,
          isHovered && !disabled
            ? {
                backgroundColor:
                  $config.CARD_LAYER_5_COLOR + hexadecimalTransparency['15%'],
              }
            : {},
          props?.containerStyle,
          disabled ? styles.disabledContainer : {},
        ]}
        {...rest}>
        <View style={styles.flexRow}>
          {iconName && (
            <View style={{marginRight: 8}}>
              <ImageIcon
                iconSize={iconSize}
                iconType="plain"
                name={iconName}
                tintColor={disabled ? $config.SEMANTIC_NEUTRAL : iconColor}
              />
            </View>
          )}
          <Text
            style={[
              styles.text,
              props?.textStyle,
              disabled ? styles.disabledText : {},
            ]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </PlatformWrapper>
  );
};
const PlatformWrapper = ({children, setIsHovered}) => {
  return isWebInternal() && !isMobileUA() ? (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}>
      {children}
    </div>
  ) : (
    children
  );
};
export default TertiaryButton;

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: $config.SECONDARY_ACTION_COLOR,
    borderRadius: ThemeConfig.BorderRadius.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: $config.SECONDARY_ACTION_COLOR,
    fontFamily: ThemeConfig.FontFamily.sansPro,
    fontSize: ThemeConfig.FontSize.small,
    fontWeight: '600',
  },
  disabledContainer: {
    borderColor: $config.SEMANTIC_NEUTRAL,
    cursor: 'default',
  },
  disabledText: {
    color: $config.SEMANTIC_NEUTRAL,
  },
});
