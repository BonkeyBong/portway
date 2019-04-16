import ono from 'ono'
import { validateBody } from '../libs/middleware/payloadValidation'
import BusinessProject from '../businesstime/project'
import crudPerms from '../libs/middleware/reqCrudPerms'
import RESOURCE_TYPES from '../constants/resourceTypes'
import { requiredFields } from './payloadSchemas/helpers'
import projectSchema from './payloadSchemas/project'

const { listPerm, readPerm, createPerm, deletePerm, updatePerm } = crudPerms(
  RESOURCE_TYPES.PROJECT,
  req => req.params.id
)

const projectsController = function(router) {
  router.post('/', validateBody(requiredFields('project', 'name')), createPerm, addProject)
  router.get('/', listPerm, getProjects)
  router.get('/:id', readPerm, getProject)
  router.put('/:id', validateBody(projectSchema), updatePerm, replaceProject)
  router.delete('/:id', deletePerm, deleteProject)
}

const getProjects = async function(req, res) {
  try {
    const projects = await BusinessProject.findAll(req.requestorInfo.orgId)
    res.json({ data: projects })
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: 'Cannot fetch projects' })
  }
}

const getProject = async function(req, res) {
  const { id } = req.params

  try {
    const project = await BusinessProject.findById(id, req.requestorInfo.orgId)
    if (!project) throw ono({ code: 404 }, `No project with id ${id}`)
    res.json({ data: project })
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: `error fetching project with id ${id}` })
  }
}

const addProject = async function(req, res) {
  const { body } = req
  body.orgId = req.requestorInfo.orgId

  try {
    const project = await BusinessProject.create(body)
    res.status(201).json({ data: project })
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: 'Cannot create project' })
  }
}

const replaceProject = async function(req, res) {
  const { id } = req.params
  const { body } = req

  body.orgId = req.requestorInfo.orgId

  try {
    const project = await BusinessProject.updateById(id, body)
    res.json({ data: project })
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: `error updating project with id ${id}` })
  }
}

const deleteProject = async function(req, res) {
  const { id } = req.params

  try {
    await BusinessProject.deleteById(id)
    res.status(204).send()
  } catch (e) {
    console.error(e.stack)
    res.status(e.code || 500).json({ error: `error deleting project with id ${id}` })
  }
}

export default projectsController
