let search = new Vue({
    el: '#search',
    data: {
        searchText: ''
    },
    methods: {
        submit: function () {
            let text = this.searchText.replace(/\s+/g, '');
            if (text === '') return;
            window.open('?q=' + text);
        }
    }
})

let randomTags = new Vue({
    el: '#randomTags',
    data: {
        tags: []
    },
    methods: {
        randomColor: function () {
            let r = Math.random() * 255;
            let g = Math.random() * 255;
            let b = Math.random() * 255;
            return `rgb(${r},${g},${b})`;
        },
        randomSize: function () {
            return Math.random() * 20 + 12 + 'px';
        }
    },
    created: function () {
        axios({
            method: 'get',
            url: '/getRandomTags'
        }).then(res => {
            let data = res.data.data;
            data.forEach(item => {
                item.link = '/index.html?tag=' + item.id;
            })
            this.tags = data;
        }).catch(err => {
            console.log(err);
        })
    }
});

let recentHot = new Vue({
    el: '#recentHot',
    data: {
        hots: [
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
        ]
    },
    created: function () {
        let size = 10;
        axios({
            method: 'get',
            url: '/getHotArticle?size=' + size
        }).then(res => {
            let data = res.data.data;
            data.forEach(article => {
                article.link = '/article_detail.html?aId=' + article.id;
            });
            this.hots = data;
        }).catch(err => {
            console.log(err);
        })
    }
});

let new_comments = new Vue({
    el: '#new_comments',
    data: {
        comments: []
    },
    computed: {
        toWhere: function () {
            return function (aId) {
                switch (aId) {
                    case -2:
                        return '/about.html'
                    case -3: 
                        return '/guestbook.html'
                    default:
                        return "/article_detail.html?aId=" + aId;
                }
            }
        }
    },
    created: function () {
        let size = 6;
        axios({
            method: 'get',
            url: '/getRecentComments?size=' + size
        }).then(res => {
            let data = res.data.data;
            let result = [];
            data.forEach(item => {
                let temp = {};
                temp.title = item.user_name;
                temp.date = item.ctime;
                temp.content = item.content;
                temp.aId = item.blog_id;
                result.push(temp);
            });
            this.comments = result;
            console.log(this.comments);
        }).catch(err => {
            console.log(err);
        })
    }
})

let friend_links = new Vue({
    el: '#friend_links',
    data: {
        links: [
            { name: "Nodejs官网", url: "https://nodejs.org/en/" },
            { name: "Less", url: "http://lesscss.cn/" },
            { name: "jquery中文文档", url: "https://www.jquery123.com/" },
            { name: "bootstrap中文网", url: "http://www.bootcss.com/" },
            { name: "Vue文档", url: "https://cn.vuejs.org/v2/api/" },
            { name: "IconMoon", url: "https://icomoon.io/app/#/select" }
        ]
    }
});