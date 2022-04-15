import { PageHeader } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import SideNav from '../../partials/sideNav/SideNav'
import CreatePaymentInfo from '../../components/createPaymentInfoModal/CreatePaymentInfo'

const AddPaymentInfo = (props) => {
  const history = useHistory()

  return (
    <div>
      <SideNav />
      <div className="mt-12 sm:mt-0 ml-0 sm:ml-14 p-2">
        <PageHeader
          className="md:ml-16 mt-16"
          onBack={() => history.goBack()}
          title="Payment Information"
          subTitle="add new payment information"
        />
        <CreatePaymentInfo />
      </div>
    </div>
  )
}
const mapStateToProps = (props) => {
  return {
    user: props.authentication
  }
}

AddPaymentInfo.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.any
  }),
  iterator: PropTypes.any
}

export default connect(mapStateToProps, null)(AddPaymentInfo)
