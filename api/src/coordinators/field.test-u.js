import fieldCoordinator from './field'
import assetCoordinator from './assets'
import BusinessField from '../businesstime/field'
import { processMarkdownWithWorker } from './markdown'
import { promisifyStreamPipe, callFuncWithArgs } from '../libs/utils'
import axios from 'axios'

jest.mock('axios')
jest.mock('../businesstime/field')
jest.mock('./assets')
jest.mock('./markdown')
jest.mock('../libs/utils')

describe('fieldCoordinator', () => {
  describe('#addFieldToDocument', () => {
    const documentId = 0
    const body = { type: 1, value: 'some-random-text', orgId: 0 }

    beforeAll(async () => {
      await fieldCoordinator.addFieldToDocument(documentId, body)
    })

    it('should call BusinessField.createForDocument with the passed in documentId and body', () => {
      expect(BusinessField.createForDocument.mock.calls.length).toBe(1)
      expect(BusinessField.createForDocument.mock.calls[0][0]).toEqual(documentId)
      expect(BusinessField.createForDocument.mock.calls[0][1]).toEqual(expect.objectContaining(body))
    })

    describe('when it is an image field', () => {
      const imageBody = { type: 4, orgId: 0 }
      const file = { buffer: new Buffer('not-a-real-buffer') }

      beforeAll(async () => {
        BusinessField.createForDocument.mockReset()
        await fieldCoordinator.addFieldToDocument(documentId, imageBody, file )
      })

      it('should call assetCoordinator.addAssetForDocument', () => {
        expect(assetCoordinator.addAssetForDocument.mock.calls.length).toBe(1)
        expect(assetCoordinator.addAssetForDocument.mock.calls[0][0]).toEqual(documentId)
      })

      it('should call BusinessField.createForDocument with the passed in documentId and body with uploaded file url added', () => {
        expect(BusinessField.createForDocument.mock.calls.length).toBe(1)
        expect(BusinessField.createForDocument.mock.calls[0][0]).toEqual(documentId)
      })
    })

    describe('when it is a text field', () => {
      describe('with an empty body', () => {
        const inputBody = {
          name: 'text-area-1',
          type: 2
        }
        beforeAll(async () => {
          processMarkdownWithWorker.mockReset()
          await fieldCoordinator.addFieldToDocument(documentId, inputBody)
        })

        it('should call processMarkdownWithWorker', () => {
          expect(processMarkdownWithWorker.mock.calls.length).toBe(1)
          expect(processMarkdownWithWorker.mock.calls[0][0]).toBe('')
        })
      })

      describe('with a body', () => {
        const inputBody = {
          name: 'text-area-1',
          type: 2,
          value: '# Markdown Header \n and pretty colors'
        }
        beforeAll(async () => {
          processMarkdownWithWorker.mockReset()
          await fieldCoordinator.addFieldToDocument(documentId, inputBody)
        })

        it('should call processMarkdownWithWorker', () => {
          expect(processMarkdownWithWorker.mock.calls.length).toBe(1)
          expect(processMarkdownWithWorker.mock.calls[0][0]).toBe(inputBody.value)
        })
      })
    })
  })

  describe('#updateDocumentField', () => {
    const fieldId = 999
    const documentId = 0
    const orgId = 111
    const body = { value: 'some-random-text', orgId: 0 }

    beforeAll(async () => {
      BusinessField.setFindByIdReturnValue({ type: 2 })
      await fieldCoordinator.updateDocumentField(fieldId, documentId, orgId, body)
    })

    it('should call BusinessField.findByIdForDocument with the passed in fieldId, documentId, orgId', () => {
      expect(BusinessField.updateByIdForDocument.mock.calls.length).toBe(1)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][0]).toEqual(fieldId)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][1]).toEqual(documentId)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][2]).toEqual(orgId)
    })

    it('should call BusinessField.updateByIdForDocument with the passed in fieldId, documentId, orgId, and body', () => {
      expect(BusinessField.updateByIdForDocument.mock.calls.length).toBe(1)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][0]).toEqual(fieldId)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][1]).toEqual(documentId)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][2]).toEqual(orgId)
      expect(BusinessField.updateByIdForDocument.mock.calls[0][3]).toEqual(
        expect.objectContaining(body)
      )
    })

    describe('when it is an image field', () => {
      const imageBody = { orgId: 0 }
      const file = { buffer: new Buffer('not-a-real-buffer') }

      beforeAll(async () => {
        BusinessField.setFindByIdReturnValue({ type: 4 })
        BusinessField.updateByIdForDocument.mockReset()
        assetCoordinator.addAssetForDocument.mockReset()
        await fieldCoordinator.updateDocumentField(fieldId, documentId, orgId, imageBody, file)
      })

      it('should call assetCoordinator addAssetForDocument', () => {
        expect(assetCoordinator.addAssetForDocument.mock.calls.length).toBe(1)
        expect(assetCoordinator.addAssetForDocument.mock.calls[0][0]).toEqual(documentId)
        expect(assetCoordinator.addAssetForDocument.mock.calls[0][1]).toEqual(orgId)
      })

      it('should call BusinessField.updateByIdForDocument with the passed in documentId and body with uploaded file url added', () => {
        expect(BusinessField.updateByIdForDocument.mock.calls.length).toBe(1)
        expect(BusinessField.updateByIdForDocument.mock.calls[0][0]).toEqual(fieldId)
        expect(BusinessField.updateByIdForDocument.mock.calls[0][1]).toEqual(documentId)
        expect(BusinessField.updateByIdForDocument.mock.calls[0][2]).toEqual(orgId)
      })
    })
  })

  describe('#addImageFieldFromUrlToDocument', () => {
    const url = 'https://bonkeybong.com/picture.jpg'
    const docId = 12
    const body = {
      name: 'field'
    }

    beforeAll(async () => {
      jest.spyOn(fieldCoordinator, 'addFieldToDocument')
      axios.mockImplementation(() => {
        return { data: null }
      })
      callFuncWithArgs.mockReturnValueOnce({ size: 143 })
      await fieldCoordinator.addImageFieldFromUrlToDocument(docId, body, url)
    })

    it('should call utils.promisifyStreamPipe', () => {
      expect(promisifyStreamPipe.mock.calls.length).toBe(1)
    })

    it('should call addFieldToDocument', () => {
      expect(fieldCoordinator.addFieldToDocument.mock.calls.length).toBe(1)
      expect(fieldCoordinator.addFieldToDocument.mock.calls[0][0]).toEqual(docId)
      expect(fieldCoordinator.addFieldToDocument.mock.calls[0][1]).toEqual(body)
    })

    afterAll(() => {
      fieldCoordinator.addFieldToDocument.mockRestore()
    })
  })
})
