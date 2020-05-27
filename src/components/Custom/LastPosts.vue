<template>
  <div>
    <v-row>
        <v-col cols="12" class="px-0 py-0">
            <p class="nunito fs_28">Quick Overview</p>
        </v-col>
    </v-row>
    <v-row justify="start" align="start">
         <v-col cols="6">
             <v-card flat class="pa-4">
                <v-simple-table>
                    <template v-slot:default>
                    <thead class="header_design">
                        <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Author</th>
                        <th class="text-left">Date Added</th>
                        <th class="text-left">View</th>
                        <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody v-if="quickPosts">
                        <tr v-for="(item,i) in quickPosts" :key="i">
                        <td class="nunito-default">{{ item.title_uz.length > 40 ?item.title_uz.substring(0,40)+'...' : item.title_uz}}</td>
                        <td>{{ item.author }}</td>
                        <td>{{ item.createdAt }}</td>
                        <td>{{ item.timesSeen}}</td>
                        <td><v-btn outlined :to="`/edit-post/${item.id}`" small color="primary">edit</v-btn></td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
             </v-card>
         </v-col>
         <v-col cols="6">
             <v-card flat>
                 <v-card-title>Monthly visitors</v-card-title>
                  <v-sparkline
                    :value="value"
                    :labels="labels"
                    auto-draw-easing='ease'
                    color="#68A3E7"
                    height="100"
                    padding="24"
                    radius="3"
                    line-width="3"
                    stroke-linecap=""
                    auto-draw
                    smooth
                    >
                    <template v-slot:label="item">
                    {{ item.value }}
                    </template>
                  </v-sparkline>
             </v-card>
         </v-col>
    </v-row>
  </div>
</template>

<script>
import Blogs from '../../services/Blogs'
export default {
  data () {
    return {
      labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      value: [34, 23, 555, 21, 78, 43, 23, 234, 231, 655, 32, 12],
      quickPosts: []
    }
  },
  methods: {
    getAll () {
      Blogs.getAllPosts().then(res => {
        this.quickPosts = res
        console.log(res)
      })
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style>
.header_design {
    color: red;
    background-color: #F8F8F8;
}
</style>
