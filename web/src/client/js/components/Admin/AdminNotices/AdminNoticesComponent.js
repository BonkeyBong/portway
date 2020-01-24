import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
  LOCKED_ACCOUNT_STATUSES,
  ORG_SUBSCRIPTION_STATUS,
  PLAN_TITLES,
  PLAN_TYPES,
  SUPPORT_EMAIL,
  TRIALING_STATUSES
} from 'Shared/constants'

import { InfoIcon } from 'Components/Icons'
import './_AdminNotices.scss'

const AdminNoticesComponent = ({ organization, subscription }) => {
  const colorDanger = getComputedStyle(document.documentElement).getPropertyValue('--color-red-dark')
  const lockedAccountStatusesMinusInactive = LOCKED_ACCOUNT_STATUSES.filter((status) => {
    return status !== ORG_SUBSCRIPTION_STATUS.INACTIVE
  })
  const trialEnds = moment.unix(subscription.trialEnd)
  const trialEndsInDays = moment(trialEnds).fromNow()

  return (
    <div className="admin-notices">
      {TRIALING_STATUSES.includes(organization.subscriptionStatus) &&
      <div className="admin-notices__notice">
        <h2 className="admin-notices__notice-title">
          <InfoIcon width="22" height="22" /> Your trial ends {trialEnds && <>{trialEndsInDays}, on {moment(trialEnds).format('MMMM Do')}</>}
        </h2>
        <p>
          During your trial, you are limited to a {PLAN_TITLES[PLAN_TYPES.SINGLE_USER]}.
        </p>
        <p>
          Add your payment information below to activate your account or to upgrade to a {PLAN_TITLES[PLAN_TYPES.MULTI_USER]}.
        </p>
      </div>
      }
      {organization.subscriptionStatus === ORG_SUBSCRIPTION_STATUS.INACTIVE &&
      <div className="admin-notices__notice admin-notices__notice--danger">
        <h2 className="admin-notices__notice-title danger"><InfoIcon width="22" height="22" fill={colorDanger} /> Inactive</h2>
        <p>We are in the process of removing your account.</p>
      </div>
      }
      {lockedAccountStatusesMinusInactive.includes(organization.subscriptionStatus) &&
      <div className="admin-notices__notice admin-notices__notice--danger">
        <h2 className="admin-notices__notice-title danger"><InfoIcon width="22" height="22" fill={colorDanger} /> Past due</h2>
        <p>We cannot successfully bill you with your current payment information.</p>
        <p>Please update your payment information below to activate your account.</p>
      </div>
      }
      {organization.subscriptionStatus === ORG_SUBSCRIPTION_STATUS.PENDING_CANCEL && subscription &&
      <div className="admin-notices__notice">
        <h2 className="admin-notices__notice-title danger"><InfoIcon width="22" height="22" fill={colorDanger} />Account canceled</h2>
        <p>
          Your current period ends <b>{moment.unix(subscription.cancelAt || subscription.currentPeriodEnd).format('MMMM Do, YYYY')}</b>.
          You have access to your projects and documents until then.
        </p>
        <p>
          If you need assistance, please email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
      }
    </div>
  )
}

AdminNoticesComponent.propTypes = {
  organization: PropTypes.object.isRequired,
  subscription: PropTypes.object,
}

AdminNoticesComponent.defaultProps = {
  subscription: {}
}

export default AdminNoticesComponent
