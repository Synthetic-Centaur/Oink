import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#BFF3FF',
    primary2Color: '#FF1970',
    primary3Color: '#BFF3FF',
    accent1Color: '#FF1970',
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.fullWhite,
    primaryTextColor: '#FF1970',
    alternateTextColor: '#4B4B4B',
    canvasColor: '#4B4B4B',
    borderColor: ColorManipulator.fade(Colors.fullWhite, 0.3),
    disabledColor: ColorManipulator.fade(Colors.fullWhite, 0.3)
  }
}

