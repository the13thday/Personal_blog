let everyDay = new Vue({
    el: '#every_day',
    data: {
        content: ''
    },
    created: function () {
        axios({
            method: 'get',
            url: '/getEveryDay',
        }).then(res => {
            this.content = res.data.content;
        }).catch(err => {
            console.log(err);
        })
    }
});

let articleList = new Vue({
    el: '#articleList',
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        articleList: [],
        pageList: []
    },
    created: function () {
        this.getArticalList();     // 此处利用了 computed 的计算机制，即getter 导致计算
    },
    methods: {
        jumpTo: function (pageItem) {
            this.page = pageItem.page;
            this.getArticalList();
        },
        gereratePageTool: function () {
            let curPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];    // 创建一个数组用于存放翻页插件中的显示内容和要跳转的页数
            let totalPage = parseInt((totalCount + pageSize - 1) / pageSize);
            result.push( {text: '<<', page: 1} );
            curPage === 1 ? result.push( {text: '<', page: 1} ) : result.push( {text: '<', page: curPage - 1} );
            if (curPage > 3) {
                result.push( {text: '...', page: curPage - 3} );
            }
            if (curPage > 2) {
                result.push( {text: curPage - 2, page: curPage - 2} )
            }
            if (curPage > 1) {
                result.push( {text: curPage - 1, page: curPage - 1} );
            }
            result.push( {text: curPage, page: curPage} );
            if (curPage + 1 <= totalPage) {
                result.push( {text: curPage + 1, page: curPage + 1} );
            }
            if (curPage + 2 <= totalPage) {
                result.push( {text: curPage + 2, page: curPage + 2} );
            }
            if (curPage + 3 <= totalPage) {
                result.push( {text: '...', page: curPage + 3} );
            }
            curPage === totalPage ? result.push( {text: '>', page: totalPage} ) : result.push( {text: '>', page: curPage + 1} );
            result.push( {text: '>>', page: totalPage} );
            this.pageList = result;
        },
        getArticalCount: function () {
            axios({
                url: '/getArticalCount',
                method: 'get'
            }).then(res => {
                this.count = res.data.data[0].count;
                this.gereratePageTool();
            }).catch(err => {
                console.log(err);
            });
        }
    },
    computed: {
        getArticalList: function () {
            return function () {
                axios({
                    url: '/getArticle?page=' + (this.page - 1) + '&pageSize=' + this.pageSize,
                    method: 'get',
                }).then(res => {
                    this.articleList = res.data.data;
                    this.getArticalCount();
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
})