import Budget from '../containers/Budget'
import HeatMap from '../components/home/GoogleHeatMap'

//Please add your component in here, plus it's text and icon for the side navbar

export const DROPDOWN_ACTIONS = [
  {
    text: "Budget",
    component: Budget,
    icon: "shopping_cart"
  },
  {
    text: "Heat Map",
    component: HeatMap,
    icon: "add_location"
  }
  // {
  //   text: "Plan",
  //   icon: "account_balance"
  // },
  // {
  //   text: "Recommendations",
  //   icon: "lightbulb_outline"
  // },
  // {
  //   text: "Forecast",
  //   icon: "trending_up"
  // }

]