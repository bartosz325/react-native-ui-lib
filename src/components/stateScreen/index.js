import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {Typography, Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../../components/view';
import Image from '../../components/image';
import Button from '../../components/button';
import Text from '../../components/text';


/**
 * @description: Component that shows a full screen for a certain state, like an empty state
 * @image: https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.js
 */
export default class StateScreen extends BaseComponent {
  static displayName = 'StateScreen';
  static propTypes = {
    /**
     * The image source that's showing at the top. use an image that was required locally
     */
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * To to show as the title
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to to show as the subtitle
     */
    subtitle: PropTypes.any,
    /**
     * Text to to show in the "call to action" button
     */
    ctaLabel: PropTypes.string,
    /**
     * Action handler for "call to action" button
     */
    onCtaPress: PropTypes.func
  };

  generateStyles() {
    const {source} = this.props;
    const isRemoteImage = _.isObject(source) && Boolean(source.uri);
    this.styles = createStyles(isRemoteImage);
  }

  render() {
    const {title, subtitle, source, ctaLabel, onCtaPress, testID} = this.props;

    return (
      <View style={this.styles.container} testID={testID}>
        <Image style={this.styles.image} resizeMode={'contain'} source={source}/>
        <Text style={[this.styles.title]}>{title}</Text>
        <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        <Button
          link
          marginT-30
          onPress={onCtaPress}
          labelStyle={this.styles.ctaLabel}
          label={Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
        />
      </View>
    );
  }
}

function createStyles(isRemoteImage) {
  const imageStyle = _.merge({height: 200}, isRemoteImage && {width: Constants.screenWidth * 0.9});

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    image: imageStyle,
    title: {
      textAlign: 'center',
      ...Typography.text50,
      color: Colors.grey10,
      fontWeight: '300'
    },
    subtitle: {
      textAlign: 'center',
      ...Typography.text70,
      color: Colors.grey40,
      fontWeight: '300',
      marginTop: 12
    },
    ctaLabel: {
      color: Colors.primary,
      ...Typography.text70
    }
  });
}
