// @todo move this to /Shared/constants? web and API should use the same ones
export const FIELD_TYPES = {
  STRING: 1,
  TEXT: 2,
  NUMBER: 3,
  IMAGE: 4
}

export const FIELD_TYPE_MODELS = {
  [FIELD_TYPES.STRING]: 'FieldTypeStringValue',
  [FIELD_TYPES.TEXT]: 'FieldTypeTextValue',
  [FIELD_TYPES.NUMBER]: 'FieldTypeNumberValue',
  [FIELD_TYPES.IMAGE]: 'FieldTypeImageValue'
}

export const MAX_NUMBER_PRECISION = 15
// 100 Megabytes
export const MAX_FILE_SIZE_BYTES = 10e7

export default { FIELD_TYPES, FIELD_TYPE_MODELS }
