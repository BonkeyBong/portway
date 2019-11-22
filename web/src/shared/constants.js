const FIELD_TYPES = {
  STRING: 1,
  TEXT: 2,
  NUMBER: 3,
  IMAGE: 4
}

const PLAN_TYPES = {
  MULTI_USER: 'MULTI_USER',
  SINGLE_USER: 'SINGLE_USER',
}

const PRICING = {
  [PLAN_TYPES.SINGLE_USER]: '$10/mo',
  [PLAN_TYPES.MULTI_USER]: '$50/mo',
}

// https://stripe.com/docs/billing/lifecycle#subscription-states
const SUBSCRIPTION_STATUS = {
  TRIALING: 'trialing',
  ACTIVE: 'active',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired',
  PAST_DUE: 'past_due',
  CANCELED: 'canceled',
  UNPAID: 'unpaid',
}

// We will lock out users in the UI if the subscriptionStatus is any of the following
const LOCKED_ACCOUNT_STATUSES = [
  SUBSCRIPTION_STATUS.INCOMPLETE,
  SUBSCRIPTION_STATUS.INCOMPLETE_EXPIRED,
  SUBSCRIPTION_STATUS.PAST_DUE,
  SUBSCRIPTION_STATUS.CANCELED,
  SUBSCRIPTION_STATUS.UNPAID,
]

// This should only be used by marketing side, not in the app
// as that always comes from stripe
const PLAN_PRICING = {
  [PLAN_TYPES.SINGLE_USER]: 10,
  [PLAN_TYPES.MULTI_USER]: 50,
}

const ORGANIZATION_ROLE_IDS = {
  OWNER: 1,
  ADMIN: 2,
  USER: 3
}

const ORGANIZATION_ROLE_NAMES = {
  [ORGANIZATION_ROLE_IDS.OWNER]: 'Owner',
  [ORGANIZATION_ROLE_IDS.ADMIN]: 'Admin',
  [ORGANIZATION_ROLE_IDS.USER]: 'User'
}

const PROJECT_ROLE_IDS = {
  ADMIN: 1,
  CONTRIBUTOR: 2,
  READER: 3
}

const PROJECT_ROLE_NAMES = {
  [PROJECT_ROLE_IDS.ADMIN]: 'Admin',
  [PROJECT_ROLE_IDS.CONTRIBUTOR]: 'Contributor',
  [PROJECT_ROLE_IDS.READER]: 'Reader'
}

const PROJECT_ACCESS_LEVELS = {
  READ: 'read',
  WRITE: 'write'
}

const NOTIFICATION_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
}

const NOTIFICATION_RESOURCE = {
  PROJECTS: 'PROJECTS',
  PROJECT: 'PROJECT',
  DOCUMENTS: 'DOCUMENTS',
  DOCUMENT: 'DOCUMENT',
  FIELD: 'FIELD',
  ORGANIZATION: 'ORGANIZATION',
  PROJECT_ASSIGNMENT: 'PROJECT ASSIGNMENT'
}

const ORGANIZATION_SETTINGS = {
  ALLOW_USER_PROJECT_CREATION: 'allowUserProjectCreation'
}

const QUERY_PARAMS = {
  ASCENDING: 'ASC',
  DESCENDING: 'DESC'
}

const DOCUMENT_MODE = {
  NORMAL: 'NORMAL',
  EDIT: 'EDIT',
}

// Note: This is so we can use this webpack as well, don't convert this to ES6
module.exports = {
  PRODUCT_NAME: 'Portway',
  PRODUCT_ID: 'portway',
  PRODUCT_LOGO: '/images/logo.svg',
  // Documentation
  DOCUMENTATION_URL: 'https://docs.portway.app/',
  // Fields
  FIELD_LABELS: {
    [FIELD_TYPES.STRING]: 'text-field-',
    [FIELD_TYPES.TEXT]: 'text-area-',
    [FIELD_TYPES.NUMBER]: 'number-',
    [FIELD_TYPES.IMAGE]: 'image-'
  },
  FIELD_TYPES: FIELD_TYPES,
  // Default text strings
  LABEL_NEW_DOCUMENT: 'New Document',
  MAX_COOKIE_AGE_MS: '604800000', // 7 days
  MAX_FILE_SIZE: 10000000,
  MAX_AVATAR_SIZE: 1024 * 1000,
  MIN_PASSWORD_LENGTH: 8,
  // Notifications
  NOTIFICATION_TYPES: NOTIFICATION_TYPES,
  NOTIFICATION_RESOURCE: NOTIFICATION_RESOURCE,
  // Paths
  PATH_APP: '/d',
  PATH_BILLING: '/admin/billing',
  PATH_ADMIN: '/admin',
  PATH_ORGANIZATION: '/admin/organization',
  PATH_USERS: '/admin/users',
  PATH_DOCUMENT: '/document',
  PATH_DOCUMENT_NEW: '/document/new',
  PATH_DOCUMENT_NEW_PARAM: 'new',
  PATH_LOGOUT: '/logout',
  PATH_PROJECT: '/project',
  PATH_PROJECTS: '/projects',
  PATH_PROJECT_CREATE: '/project/create',
  PATH_SETTINGS: '/settings',
  PATH_DOCUMENT_NEW: '/document/new',
  PATH_DOCUMENT_NEW_PARAM: 'new',
  // Roles
  ORGANIZATION_ROLE_IDS: ORGANIZATION_ROLE_IDS,
  ORGANIZATION_ROLE_NAMES: ORGANIZATION_ROLE_NAMES,
  ORGANIZATION_SETTINGS: ORGANIZATION_SETTINGS,
  PROJECT_ACCESS_LEVELS: PROJECT_ACCESS_LEVELS,
  PROJECT_ROLE_IDS: PROJECT_ROLE_IDS,
  PROJECT_ROLE_NAMES: PROJECT_ROLE_NAMES,
  // Plans
  LOCKED_ACCOUNT_STATUSES,
  PLAN_PRICING: PLAN_PRICING,
  PLAN_TYPES: PLAN_TYPES,
  SUBSCRIPTION_STATUS: SUBSCRIPTION_STATUS,
  PRICING: PRICING,
  // Query params
  QUERY_PARAMS: QUERY_PARAMS,
  // Support
  SUPPORT_EMAIL: 'support@portway.app',
  SUPPORT_LINK: 'https://support.portway.app/',
  // UI Related
  DOCUMENT_MODE: DOCUMENT_MODE,
}
