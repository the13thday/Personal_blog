const siteMap = new Vue({
    el: '#siteMap',
    data: {
        articleList: []
    },
    created: function () {
        axios.get('/getAllArticle').then(res => {
            let data = res.data.data;
            data.forEach(item => {
                item.link = '/article_detail.html?aId=' + item.id;
            })
            this.articleList = data;
        }).catch(err => {
            console.log(err);
        })
    }
})