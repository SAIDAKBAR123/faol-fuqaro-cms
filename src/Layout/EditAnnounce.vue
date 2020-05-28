<template>
  <div>
     <v-container>
         <v-row justify="space-between">
             <v-col cols="12">
                 <v-card flat tile>
                       <p class="nunito fs_28 pa-3">E'lonni tahrirlash</p>
                     <v-row justify="space-between">
                         <v-col cols="auto">
                         </v-col>
                         <v-col cols="auto" class="mx-2">
                             <v-row justify="center" class="py-0">
                                    <v-col class="py-0" cols="auto"><v-btn large outlined color="grey" to="/blog" class="">Bekor qilish</v-btn></v-col>
                                    <v-col class="py-0" cols="auto"><v-btn large color="success" class="" @click="publish">Saqlash <v-icon right>mdi-menu-down-outline</v-icon></v-btn></v-col>
                             </v-row>
                         </v-col>
                     </v-row>
                 </v-card>
             </v-col>
         </v-row>
         <v-row>
             <v-col  cols="9">
                <v-tabs>
                  <v-tab>Uz</v-tab>
                  <v-tab>Ru</v-tab>
                  <v-tab>Eng</v-tab>
                  <v-tab-item v-for="(item, i) in contents" :key="i">
                      <v-card tile flat>
                          <v-row justify="start">
                              <v-col class="mx-2">
                                    <v-text-field
                                    class=""
                                      label="Sarlavha"
                                      outlined
                                      dense
                                      v-model="item.title"
                                      ></v-text-field>
                              </v-col>
                          </v-row>
                          <v-row>
                              <v-col class="mx-2">
                                    <quill-editor
                                      ref="myQuillEditor"
                                      v-model="item.content"
                                      :options="editorOption"
                                      @blur="onEditorBlur($event)"
                                      @focus="onEditorFocus($event)"
                                      @ready="onEditorReady($event)"
                                      />
                              </v-col>
                          </v-row>
                      </v-card>
                  </v-tab-item>
                </v-tabs>
             </v-col>
             <v-col cols="3">
                 <v-card tile flat class="pa-3">
                      <v-row justify="center" align="center">
                    <v-col cols="py-0">
                        <span class="py-0">E'lon uchun rasm</span>
                    </v-col>
                    <v-col class="py-0" cols="12" align-self="center">
                        <v-card tile flat>
                              <!-- <v-file-input dense class="py-3 px-1" v-model="api" outlined accept="image/*" label="Upload image"></v-file-input> -->
                        </v-card>
                    </v-col>
                    <v-col cols="12" v-if="!mainImage.url.length >0">
                      <input v-show="false" type="file" id="file" ref="fileInput"  v-on:change="handleFileUpload"/>
                         <div @click="onPickFile" class="input_img_layout flex flex-center justify-center">
                             <v-row justify="center">
                                 <v-col cols="auto">
                                     <v-icon color="grey lighten-4" size="80">mdi-cloud-upload-outline</v-icon>

                                 </v-col>
                                 <v-col cols="12">
                                    <p class="text-center text--secondary">Rasmingizni Drag & Drop yordamida yuklang</p>
                                 </v-col>
                             </v-row>
                         </div>
                    </v-col>
                    <v-col cols="12" v-else>
                        <v-img :src="mainImage.url">
                          <div class="hover__img" >
                              <v-row justify="end">
                                  <v-col cols="auto" class="py-0" @click="removeImage(mainImage.id)">
                                     <v-icon color="white" size="30" dark>mdi-close-circle</v-icon>
                                  </v-col>
                              </v-row>
                          </div>
                        </v-img>
                    </v-col>
                </v-row>
                <v-row class="mt-2" justify="center" align="center">
                    <v-col cols="12" class="py-0">
                        <span>Sana</span>
                        <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    label="Amal qilish sanasini tanlang"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker :min="present" v-model="date" @input="menu = false"></v-date-picker>
                            </v-menu>
                    </v-col>
                     </v-row>
                     <v-row>
                         <v-col class="py-0">
                             <v-card tile flat>
                                 <v-list>
                                     <v-divider></v-divider>
                                     <v-list-item>
                                         <span class="flex justify-space-between">Qoralama sifatida saqlang: </span><v-switch v-model="saveStatus"></v-switch>
                                     </v-list-item>
                                 </v-list>
                             </v-card>
                         </v-col>
                     </v-row>
                 </v-card>
                 </v-col>
              </v-row>
     </v-container>
  </div>
</template>

<script>
import Announcement from '../services/Announcement'
export default {
  props: ['id'],
  data () {
    return {
      menu: '',
      present: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      contents: [
        {
          title: '',
          content: ''
        },
        {
          title: '',
          content: ''
        },
        {
          title: '',
          content: ''
        }
      ],
      saveStatus: false,
      categoryList: [],
      attrs: { id: 'sadsa' },
      title: '',
      mainImage: {
        url: '',
        id: ''
      },
      imageFile: new FormData(),
      api: '',
      selected: [],
      editorOption: {
        // Some Quill options...
      }
    }
  },
  watch: {

  },
  computed: {
    // isPublishAllowed () {
    //   return this.title && this.mainImage.url && this.content && this.selectedCategory.length > 0
    // },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    removeImage (id) {
      this.mainImage.url = ''
      this.imageFile = new FormData()
    },
    saveAsDraft () {
    },
    publish () {
      const formData = {
        title_uz: this.contents[0].title,
        title_ru: this.contents[1].title,
        title_en: this.contents[2].title,
        body_uz: this.contents[0].content,
        body_ru: this.contents[1].content,
        body_en: this.contents[2].content,
        status: this.saveStatus ? 0 : 1,
        mainImageId: this.mainImage.id,
        expiryDate: new Date(this.date).getTime()
      }
      Announcement.updateSingleAnn(this.id, formData).then(res => {
        this.$notify({
          group: 'foo',
          title: 'Announcement has posted successfully',
          type: 'success'
        })
        this.$router.push('/blog')
      }).catch(err => console.log(err))
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    handleFileUpload (event) {
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('please, input correct image file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
      })
      fileReader.readAsDataURL(files[0])
      this.imageFile.append('file', files[0])

      Announcement.updateMainImage(this.id, this.imageFile).then(res => {
        this.mainImage = res
      }).catch(err => console.log(err))
    },
    getAll () {
      Announcement.getSingleAnn(this.id).then(res => {
        console.log(res)
        this.contents[0].title = res.title_uz
        this.contents[0].content = res.body_uz
        this.contents[1].title = res.title_ru
        this.contents[1].content = res.body_ru
        this.contents[2].title = res.title_en
        this.contents[2].content = res.body_en
        this.saveStatus = res.status ? 0 : 1
        this.mainImage.url = res.mainImage.mainImageUrl
        this.mainImage.id = res.mainImageId
        this.mainImageId = res.mainImageId
        this.date = new Date(res.expiryDate).toISOString().substr(0, 10)
        console.log(this.date)
      }).catch(err => {
        console.log(err)
      })
    },
    onEditorBlur (quill) {
      // console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      // console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      // console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  created () {
    this.getAll()
  }

}
</script>

<style scoped>
.input_img_layout{
  border-style: dashed;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border: 2px dashed rgba(95, 95, 95, 0.288);
  padding: 10px;
  width: 100%;
  height: 10rem;
}
.hover__img{
  transition: all 0.7s ease;
  padding: 2px;
  height: 100%;
  cursor: pointer;

}
.hover__img:hover{
  background:rgba(31, 31, 31, 0.788);
  height: 100%;

}
</style>
