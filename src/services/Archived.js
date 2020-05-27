import API, { execute } from './Api'

export default {
  getAllArchives: data => execute(API().get('posts?deleted=true'))
}
