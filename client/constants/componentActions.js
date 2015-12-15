import Budget from '../containers/Budget'
import Goals from '../containers/Goals'
// TODO: Update below once there is a heatmap container
// import HeatMap from '../components/dashboard/GoogleHeatMap'

//Please add your component in here, plus it's text and icon for the side navbar

export const DROPDOWN_ACTIONS = [
  {
    text: "Budget",
    component: Budget,
    icon: "shopping_cart"
  },
  {
    text: "Heat Map",
    //component: HeatMap,
    icon: "add_location"
  },
  {
    text: "Goal Planning",
    component: Goals,
    icon: "card_travel"
  },
  // {
  //   text: "Recommendations",
  //   icon: "lightbulb_outline"
  // },
  // {
  //   text: "Forecast",
  //   icon: "trending_up"
  // }

]
