import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/login/login'
import axios from 'axios'

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)
