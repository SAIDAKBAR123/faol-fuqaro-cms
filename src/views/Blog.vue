<template>
  <div>
     <v-container>
         <v-row justify="start" align="center">
             <v-col v-for="(item, i) in analysis" :key="i" cols="3">
                 <v-card tile flat>
                    <v-row justify="start" class="mx-auto">
                        <v-col align-self="center" cols="3">
                            <v-avatar size="70" color="light-blue lighten-5">
                                 <v-icon class="#081F2E" size="40">
                                {{item.icon}}
                            </v-icon>
                            </v-avatar>
                        </v-col>
                        <v-col cols="auto" align-self="center">
                                <p class="pb-0 text--secondary">{{item.name}}</p>
                                <span class="display-1 font-weight-thin">{{item.value}}</span>
                        </v-col>
                    </v-row>
                 </v-card>
             </v-col>
         </v-row>
         <v-row>
             <v-col cols="auto">
                 <v-card color="transparent" flat tile>
                     <v-row>
                         <v-col cols="auto">
                             <v-btn rounded to="/create-post" color="primary">Create Post <v-icon right>mdi-plus</v-icon></v-btn>
                         </v-col>
                          <v-col cols="auto">
                             <v-btn rounded text color="primary" to="/create-announcement">create announcement<v-icon right>mdi-bell</v-icon></v-btn>
                         </v-col>
                     </v-row>
                 </v-card>
             </v-col>
         </v-row>
         <v-row>
             <v-col cols="12">
                 <v-card class="px-3 mb-3" flat tile>
                     <v-row justify="space-between">
                     <v-col cols="2" align-self="center">
                          <v-select
                            return-object
                            dense
                            :items="postTypesList"
                            item-value="id"
                            label="sort by"
                            outlined
                            item-text="name"
                            hide-details
                            v-model="selectedType"
                            ></v-select>
                     </v-col>
                     <v-col cols="6">
                          <v-text-field
                            color="primary"
                            v-model="search"
                            append-icon="mdi-image-search-outline"
                            label="Search"
                            class="pt-0"
                            single-line
                            hide-details
                            ></v-text-field>
                     </v-col>
                 </v-row>
                 </v-card>
                 <v-card class="py-4 px-4" tile flat>
                      <v-data-table
                        :loading="false"
                         loading-text="Loading... Please wait"
                        :headers="headers"
                        :search="search"
                        :items="desserts"
                        :items-per-page="10"
                        class="elevation-0">
                        <template v-slot:header.name="{ header }">
                         {{ header.text.toUpperCase() }}
                        </template>
                         <template v-slot:item.title_uz="{ item }">
                          <v-card tile flat color="transparent" max-width="440">
                              <p>{{ item.title_uz.length > 40 ?item.title_uz.substring(0,90)+'...' : item.title_uz }}</p>
                          </v-card>
                        </template>
                         <template v-slot:item.status="{ item }">
                          <v-chip :color="item.status ? 'light-green lighten-4' : 'deep-purple lighten-4'">{{item.status ? 'published': 'unpublished'}}</v-chip>
                        </template>
                          <template v-slot:item.date="{ item }">
                         <span>{{item.createdAt | moment('Do MMM, YYYY')}}</span>
                        </template>
                        <template v-slot:item.time="{ item }">
                         <span>{{item.createdAt | moment('h:mm:ss a')}}</span>
                        </template>
                        <template v-slot:item.action="{ item }">
                          <v-row>
                              <v-col cols="auto">
                                  <v-btn color="grey darken-3" @click="redirectRoute(item.id)" text  small fab><v-icon>mdi-fountain-pen-tip</v-icon></v-btn>
                              </v-col>
                               <v-col cols="auto">
                                  <v-btn color="grey darken-3" @click="pw(item)" text small fab><v-icon>{{ item.status ? 'mdi-eye-outline':  'mdi-eye-off-outline'}}</v-icon></v-btn>
                              </v-col>
                              <v-col cols="auto">
                                  <!-- <delete-blog-dialog :postId="item.id" /> -->
                                   <v-btn text color="grey darken-3" @click="deletePost(item.id)" small fab><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                              </v-col>
                          </v-row>
                        </template>
                    </v-data-table>
                 </v-card>
                 <delete-blog-dialog v-if="deleteSinglePost.flag" :updateTable="this.getAll"  :post="deleteSinglePost" />
             </v-col>
         </v-row>
     </v-container>
  </div>
</template>

<script>
import DeleteBlogDialog from '../components/Dialogs/DeleteBlogDialog'
import Blogs from '../services/Blogs'
import Announcement from '../services/Announcement'
import Archived from '../services/Archived'
export default {
  methods: {
    pw (item) {
      item.status = !item.status
    },
    deletePost (id) {
      this.deleteSinglePost = {
        flag: true,
        data: id
      }
    },
    getAll () {
      if (this.$store.state.selectedType.id === 1) {
        Blogs.getAllPosts().then(res => {
          this.$store.commit('setType', this.postTypesList[0])
          this.desserts = res
        }).catch(err => console.log(err))
      } else if (this.$store.state.selectedType.id === 2) {
        Announcement.getAllAnnouncement().then(res => {
          this.$store.commit('setType', this.postTypesList[1])
          this.desserts = res
        })
      } else if (this.$store.state.selectedType.id === 3) {
        Archived.getAllArchives().then(res => {
          this.$store.commit('setType', this.postTypesList[2])
          this.desserts = res
        })
      }
    },
    redirectRoute (id) {
      if (this.$store.state.selectedType.id === 1) this.$router.push('edit-post/' + id)
      if (this.$store.state.selectedType.id === 2) this.$router.push('/edit-announcement/' + id)
    }
  },
  components: {
    DeleteBlogDialog
  },
  watch: {
    selectedType (val) {
      if (val.id === 1) {
        Blogs.getAllPosts().then(res => {
          console.log(res)
          this.$store.commit('setType', val)
          this.desserts = res
        }).catch(err => console.log(err))
      }
      if (val.id === 2) {
        Announcement.getAllAnnouncement().then(res => {
          this.$store.commit('setType', val)
          this.desserts = res
        }).catch(err => {
          console.log(err)
        })
      }
      if (val.id === 3) {
        this.$store.commit('setType', val)
        Archived.getAllArchives().then(res => {
          this.desserts = res
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  data () {
    return {
      selectedType: 1,
      deleteSinglePost: {
        flag: false,
        data: ''
      },
      search: '',
      eye: 'mdi-eye-off-outline',
      analysis: [
        {
          icon: 'mdi-script-outline',
          name: 'Total News',
          value: '394'
        },
        {
          icon: 'mdi-account-supervisor',
          name: 'Total Visitors',
          value: '494'
        },
        {
          icon: 'mdi-note-text',
          name: 'Total Archives',
          value: '3'
        },
        {
          icon: 'mdi-bullhorn-outline',
          name: 'Total Announcements',
          value: '394'
        }

      ],
      postTypesList: [
        {
          name: 'News',
          id: 1
        },
        {
          name: 'Announcements',
          id: 2
        },
        {
          name: 'Archived',
          id: 3
        }

      ],
      headers: [
        { text: 'Title', value: 'title_uz' },
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'View', value: 'timesSeen' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'action' }
      ],
      desserts: []
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style>

</style>
