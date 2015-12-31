// # Table of Contents


// # Front-End

  // ### CLIENT-SIDE SETUP
      // * [index.js](./client!index.js.html) - (React/Redux Application entry point)
      // * [configureStore.js](./client!store!configureStore.js.html) - (Configuration for redux store)
      // * [chart-theme.js](./client!chart-theme.js.html) - (General theme for High Charts styling)
      // * [material-theme.js](./client!material-theme.js.html) - (Material-UI styles theme)
      // * [splash-theme.js](./client!splash-theme.js.html) - (Styling and themes for splash page)


  // ### ACTIONS
  // * [actions.js](./client!actions!actions.js.html) -  (Actions for sending component data to store)
  // * [apiActions.js](./client!actions!api!apiActions.js.html) - (Actions for server-side user data)
  // * [authActions.js](./client!actions!api!authActions.js.html) - (Actions for server authentication data)

  // ### COMPONENTS
    // #### Budget Component
        // * [BarChart.js](./client!components!dashboard!budget!BarChart.js.html) - (Transaction data vs budget data)
        // * [barChartConfig.js](./client!components!dashboard!budget!config!barChartConfig.js.html) - (High-Charts configuration)
        // * [BudgetCategories.js](./client!components!dashboard!budget!BudgetCategories.js.html) - (Menu for submitting new budgets)
        // * [BudgetList.js](./client!components!dashboard!budget!BudgetList.js.html) -  (List for displaying current budgets)
        // * [OptionsBar.js](./client!components!dashboard!budget!OptionsBar.js.html) - (Budget options)
        // * [PieChart.js](./client!components!dashboard!budget!PieChart.js.html) - (Pie chart for displaying budgets)
        // * [chartConfig.js](./client!components!dashboard!budget!config!chartConfig.js.html) - (High-Charts configuration)
        // * [UpdateField.js](./client!components!dashboard!budget!UpdateField.js.html) - (Submission field for budgets)
        // * [WelcomeMessage.js](./client!components!dashboard!budget!WelcomeMessage.js.html) - (Budget Welcome message)
    // ***
    // #### Goal Component
        // * [GoalAdd.js](./client!components!dashboard!goals!GoalAdd.js.html) - (Submission form for new goal)
        // * [GoalUpdate.js](./client!components!dashboard!goals!GoalUpdate.js.html) - (Submission form for updating goal)
        // * [GoalConfigurer.js](./client!components!dashboard!goals!GoalConfigurer.js.html) - (Goal configuration)
        // * [GoalChart.js](./client!components!dashboard!goals!GoalChart.js.html) - (Chart of current goals)
        // * [chartConfig.js](./client!components!dashboard!goals!config!chartConfig.js.html) - (High-Charts configuration)
        // * [GoalList.js](./client!components!dashboard!goals!GoalList.js.html) - (List of Current goals)
        // * [MessageCenter.js](./client!components!dashboard!goals!MessageCenter.js.html) - (Default goal message)
    // ***
    // #### Map Component
        // * [TransactionMap.js](./client!components!dashboard!heatmap!TransactionMap.js.html) - (Heat map for user data)
    // ***
    // #### Phone Verification
        // * [PhoneVerifyModal.js](./client!components!dashboard!phoneVerify!PhoneVerifyModal.js.html) - (Pop-up for validating phone number)
        // * [PhoneVerifyIcon.js](./client!components!dashboard!phoneVerify!PhoneVerifyIcon.js.html) - (Phone validation pop-up icon)
    // ***
    // #### Settings
        // * [SettingsModal.js](./client!components!dashboard!settings!SettingsModal.js.html) - (Settings Pop-up)
        // * [AccountSettingsField.js](./client!components!dashboard!settings!AccountSettingsField.js.html) - (General account settings)
        // * [CommunicationSettingsField.js](./client!components!dashboard!settings!CommunicationSettingsField.js.html) - (Email and phone settings)
        // * [SecuritySettingsField.js](./client!components!dashboard!settings!SecuritySettingsField.js.html) - (Security settings)
    // ***
    // #### Side Navigation 
        // * [SideNav.js](./client!components!dashboard!sidenav!SideNav.js.html) - (Feature navigation)
    // ***
    // #### Spending
        // * [SpendingChart.js](./client!components!dashboard!spending!SpendingChart.js.html) - (Transaction chart)
        // * [DateTransactions.js](./client!components!dashboard!spending!DateTransactions.js.html) - (Transaction list for selected date)
        // * [InfoModule.js](./client!components!dashboard!spending!InfoModule.js.html) - (Spending component information)
        // * [chartConfig.js](./client!components!dashboard!spending!config!chartConfig.js.html) - (High-Charts configuration)
    // ***
    // #### Acount modal
        // * [AccountModal.js](./client!components!splash!account-modal!AccountModal.js.html)
        // * [LoginField.js](./client!components!splash!account-modal!LoginField.js.html) - (Login modal)
        // * [SignupField.js](./client!components!splash!account-modal!SignupField.js.html) - (Signup Modal)
        // * [PlaidButton.js](./client!components!splash!account-modal!PlaidButton.js.html) - (Plaid modal)
    // ***
    // #### Splash
        // * [SplashNavBar.js](./client!components!splash!navbar!SplashNavBar.js.html) - (Splash page navigation)
        // * [ProfileCard.js](./client!components!splash!ProfileCard.js.html)
    // ***
    // #### Component Setup
        // * [Options.js](./client!components!dashboard!Options.js.html) - (Settings and logout)
        // * [componentActions.js](./client!constants!componentActions.js.html) - (Component object for nav-bar)
        // * [LoadingIndicator.js](./client!components!dashboard!LoadingIndicator.js.html) - (Load bar setup)

  // ### CONTAINERS
  // #### (Containers for passing data and actions into components)
      // * [Budget.js](./client!containers!Budget.js.html)
      // * [ComponentPlayground.js](./client!containers!ComponentPlayground.js.html)
      // * [Dashboard.js](./client!containers!Dashboard.js.html)
      // * [Goals.js](./client!containers!Goals.js.html)
      // * [Map.js](./client!containers!Map.js.html)
      // * [Spending.js](./client!containers!Spending.js.html)
      // * [Splash.js](./client!containers!Splash.js.html)

  // ### REDUCERS
  // #### (Reducers for changing data on state)
    // * [index.js](./client!reducers!index.js.html)
    // * [reducers.js](./client!reducers!reducers.js.html)

// # Back-End


  // ### SERVER-SIDE SETUP
      // * [server.js](./server!server.js.html)
      // * [envConfig-temp.js](./server!env!envConfig-temp.js.html)
      // * [middleware.js](./server!middleware.js.html)
      // * [routes.js](./server!routes!routes.js.html)
      // * [schedule.js](./server!schedule.js.html)

  // ### CONTROLLERS
  // * [apiController.js](./server!controllers!apiController.js.html)
  // * [authController.js](./server!controllers!authController.js.html)
  // * [budgetController.js](./server!controllers!budgetController.js.html)
  // * [cronController.js](./server!controllers!cronController.js.html)
  // * [goalController.js](./server!controllers!goalController.js.html)
  // * [transactionController.js](./server!controllers!transactionController.js.html)

  // ### DATABASE
  // * [budgets.js](./server!db!collections!budgets.js.html)
  // * [categories.js](./server!db!collections!categories.js.html)
  // * [transactions.js](./server!db!collections!transactions.js.html)
  // * [users.js](./server!db!collections!users.js.html)
  // * [dbConfig.js](./server!db!dbConfig.js.html)
  // * [budget.js](./server!db!models!budget.js.html)
  // * [category.js](./server!db!models!category.js.html)
  // * [transaction.js](./server!db!models!transaction.js.html)
  // * [user.js](./server!db!models!user.js.html)


  // ### HANDLERS
  // * [apiHandler.js](./server!handlers!apiHandler.js.html)
  // * [authHandler.js](./server!handlers!authHandler.js.html)
  // * [cronHandler.js](./server!handlers!cronHandler.js.html)



