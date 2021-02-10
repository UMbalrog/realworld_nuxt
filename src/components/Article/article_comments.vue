<template>
  <div>

    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea v-model="commsg" class="form-control" placeholder="Write a comment..." rows="3" required></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" >
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="(item, k) in commentlist" :key="k">
      <div class="card-block">
        <p class="card-text">{{item.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="'/Profile/'+item.author.username" class="comment-author">
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="'/Profile/'+item.author.username" class="comment-author">{{ item.author.username }}</nuxt-link>
        <span class="date-posted">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
    
  </div>
</template>
<script>
import Api from '@/api/index.js';
import { mapState } from 'vuex';

export default {
  name:'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return{
      commentlist:[],
      commsg:''
    }
  },
  created(){
    this.getcomment();
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    getcomment() {
      Api.getComments({},{
        url: `/api/articles/${this.article.slug}/comments`
      }).then(res => {
        // console.log(res);
        this.commentlist = res.comments;
      })
    },
    onSubmit(){
      Api.addComments({
        "comment": {
          "body": this.commsg
        }
      },{
        url: `/api/articles/${this.article.slug}/comments`
      }).then(res => {
        // console.log(res);
        this.commentlist = res.comments;
        this.commsg = '';
        this.getcomment();
      })
    }
  }
}
</script>

