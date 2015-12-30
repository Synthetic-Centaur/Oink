import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#B4CCB9',
    primary2Color: '#B4CCB9',
    primary3Color: '#B4CCB9',
    accent1Color: '#FF8A80',
    accent2Color: '#FF8A80',
    accent3Color: '#FF8A80',
    textColor: '#ccc',
    primaryTextColor: '#FF8A80',
    secondaryTextColor: '#B4CCB9',
    alternateTextColor: '#4B4B4B',
    canvasColor: '#4B4B4B',
    borderColor: ColorManipulator.fade('#ccc', 0.3),
    disabledColor: ColorManipulator.fade('#ccc', 0.3)
  }
}

