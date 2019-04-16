// To make life easier, a document and its fields can be defined
// in this file and will get created during a sequelize db:seed:all
//
// This makes it easier to create seed data without having
// to manage the value tables for fields and track and define
// ids everywhere
const FIELD_TYPES = require('../config/fieldTypeValues')
const seedIds = require('../config/seedIds')
const BONKEY_PROJECT_ID = seedIds.BONKEY_PROJECT_ID
const BONKEY_ORG_ID = seedIds.BONKEY_ORG_ID

const documents = [
  {
    name: 'Contact page',
    orgId: BONKEY_ORG_ID,
    projectId: BONKEY_PROJECT_ID,
    fields: [
      {
        type: FIELD_TYPES.STRING,
        name: 'Bonkey Field Title',
        value: 'This is the title of my Bonkey Doc!'
      },
      {
        type: FIELD_TYPES.NUMBER,
        name: 'Bonkey Field Number',
        value: 15
      },
      {
        type: FIELD_TYPES.TEXT,
        name: 'Bonkey Field Text',
        value: `# Wee Bonkey\n\n
a strapping young lass with **a heart of gold**, _ah yes, wee bonkey_\n\n
Dirk is that wee [Bonkey!](https://bonkeybong.com/)`,
        structuredValue: '{ "h1": "Wee Bonkey", "p": "a strapping young lass"}'
      }
    ]
  },
  {
    name: 'Sample of a document with a very long name for testing',
    orgId: BONKEY_ORG_ID,
    projectId: BONKEY_PROJECT_ID
  },
  {
    name: '🚀 New hotness',
    orgId: BONKEY_ORG_ID,
    projectId: BONKEY_PROJECT_ID
  },
  {
    name: 'Scenic Trails Overview',
    orgId: BONKEY_ORG_ID,
    projectId: seedIds.SCENIC_PROJECT_ID
  }
]

module.exports = documents
