import Budget from '../containers/Budget'
import Goals from '../containers/Goals'
import Spending from '../containers/Spending'
import HeatMap from '../containers/HeatMap'

// TODO: Update below once there is a heatmap container
// import HeatMap from '../components/dashboard/GoogleHeatMap'

//Please add your component in here, plus it's text and icon for the side navbar

export const DROPDOWN_ACTIONS = [
  {
    text: 'Budget',
    component: Budget,
    icon: 'shopping_cart'
  },
  
  {
    text: 'Goal Planning',
    component: Goals,
    icon: 'card_travel'
  },

  {
    text: 'Spending Tracker',
    component: Spending,
    icon: 'local_atm'
  },

  {
    text: 'Transaction Map',
    component: HeatMap,
    icon: 'add_location'
  }

  // {
  //   text: 'Recommendations',
  //   icon: 'lightbulb_outline'
  // },
  // {
  //   text: 'Forecast',
  //   icon: 'trending_up'
  // }

]
