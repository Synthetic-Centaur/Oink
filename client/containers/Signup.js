import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Signup from '../components/signup/signup'

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
