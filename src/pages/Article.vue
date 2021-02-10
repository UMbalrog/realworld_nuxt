<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <ArticleMeta :article="article"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"> </div>
      </div>

      <hr />

      <div class="article-actions">
         <ArticleMeta :article="article"/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComments :article="article"/>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Api from '@/api/index.js';
import MarkdownIt from 'markdown-it';
import ArticleMeta from '@/components/Article/article_meta';
import ArticleComments from '@/components/Article/article_comments';

export default {
  name:'Article',
  async asyncData({params}){
    const data = await Api.getArticles({},{
      url:`/api/articles/${params.slug}`
    });
    let md = new MarkdownIt();
    data.article.body = md.render(data.article.body);
    // console.log(data);
    return {
      article: data.article
    }
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  methods:{

  }
}
</script>

