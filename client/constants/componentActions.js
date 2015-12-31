// ## CONTAINER STORE

// Imports containers
import Budget from '../containers/Budget'
import Goals from '../containers/Goals'
import Spending from '../containers/Spending'
import Map from '../containers/Map'


// Bundles an array of objects for each container with Header text, Nav-bar text and icon to be stored on State when object is selected via Nav-bar
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
    component: Map,
    icon: 'add_location'
  }
]
