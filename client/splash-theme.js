// ## Material Theme for Splash Page

import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

// Will be applied to Splash Page container and all of its children components.
export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#fff',
    primary2Color: '#999',
    primary3Color: '#999',
    accent1Color: '#000',
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: '#333',
    primaryTextColor: '#333',
    alternateTextColor: '#fff',
    canvasColor: '#E8E9EB',
    borderColor: ColorManipulator.fade('#333', 0.3),
    disabledColor: ColorManipulator.fade('#333', 0.3)
  }
}

