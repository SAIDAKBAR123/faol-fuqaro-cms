import API, { execute } from './Api'

export default {
  annouceMainImage: data => execute(API().post('files', data)),
  updateMainImage: (id, data) => execute(API().post(`files/${id}`, data)),
  deleteMainImage: id => execute(API().delete(`files/${id}`)),
  postNewAnnounce: data => execute(API().post('announcements', data)),
  getAllAnnouncement: () => execute(API().get('announcements')),
  getSingleAnn: id => execute(API().get(`announcements/${id}`)),
  updateSingleAnn: (id, data) => execute(API().post(`announcements/${id}`, data)),
  deleteSingleAnn: id => execute(API().delete(`announcements/${id}`))
}
