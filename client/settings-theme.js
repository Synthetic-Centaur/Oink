// ## Material Theme for Settings Modal

import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

// Will be applied to Settings component and all of its children components.
export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#B4CCB9',
    primary2Color: '#4B4B4B',
    primary3Color: '#4B4B4B',
    accent1Color: '#FF8A80',
    accent2Color: '#4B4B4B',
    accent3Color: '#4B4B4B',
    textColor: '#4B4B4B',
    primaryTextColor: '#FF8A80',
    secondaryTextColor: '#B4CCB9',
    alternateTextColor: '#4B4B4B',
    canvasColor: '#ccc',
    borderColor: ColorManipulator.fade('#ccc', 0.3),
    disabledColor: ColorManipulator.fade('#ccc', 0.3)
  }
}
