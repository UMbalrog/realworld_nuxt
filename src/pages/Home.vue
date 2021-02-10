<template>
  <div class="home-page">
    
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link" exact :class="{'active': tab === 'your_feed' }" :to="{
                  path:'/',
                  query:{
                    tab: 'your_feed'
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" exact :class="{'active': tab === 'global_feed' }" :to="{
                  path:'/',
                  query:{
                    tab: 'global_feed'
                  }
                }">Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link class="nav-link" exact :class="{'active': tab === 'tag_feed' }" :to="{
                  path:'/',
                  query:{
                    tab: 'tag_feed',
                    tag: tag
                  }
                }">#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="(article, k) in articles" :key="k">
            <div class="article-meta">
              <nuxt-link :to="'/Profile/'+article.author.username" >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="'/Profile/'+article.author.username" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.updatedAt | date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'active': article.favorited}" @click="addFavorite(article)" :disabled="article.favoriteDisabled">
                <i class="ion-heart"></i>{{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="'/Article/'+article.slug" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" v-for="item in totalPage" :key="item" :class="{'active': item === page}">
                <nuxt-link class="page-link " :to="{
                  path: '/',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: $route.query.tab
                  }
                }">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="(item, k) in tags" :key="k" class="tag-pill tag-default" :to="{
                path: '/',
                query: {
                  tag: item,
                  tab: 'tag_feed'
                }
              }">{{item}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import Api from '@/api/index.js';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({query, store}) {
    let page = (query.page || 1) * 1;
    let limit = 20;
    let tag = query.tag;
    const tab = query.tab || 'global_feed';
    const Articles = (store.state.user && tab === 'your_feed')
    ?  Api.feedArticles : Api.globalArticles;
    let [ ArticlesRes, tagsRes ] = await Promise.all([
      Articles({
        limit: limit,
        offset: (page-1)*limit, //需要跳过的项目数
        tag: tag,
      }),
      Api.tags()
    ]).catch( err => {
      console.log(err);
    })

    ArticlesRes.articles.forEach(article => ArticlesRes.articles.favoriteDisabled = false)
    return {
      articles: ArticlesRes.articles,
      articlesCount: ArticlesRes.articlesCount,
      limit: limit,
      page: page,
      tags: tagsRes.tags,
      tag,
      tab
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods:{
    addFavorite(article) {
      article.favoriteDisabled = true;
      if(article.favorited){
        Api.unfavorite({},{
          url:`/api/articles/${article.slug}/favorite`
        }).then(res => {
          article.favorited = false;
          article.favoritesCount += -1;
          article.favoriteDisabled = false;
        })
      }else{
        Api.favorite({},{
          url:`/api/articles/${article.slug}/favorite`
        }).then(res => {
          article.favorited = true;
          article.favoritesCount += 1;
          article.favoriteDisabled = false;
        })
      }
        
    }
  }
}
</script>

