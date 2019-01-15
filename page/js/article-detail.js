const articleDetail = new Vue({
    el: '#articleArea',
    data: {
        article: [],
        pathname: location.pathname
    },
    created: function () {
        let qArr = location.search.includes('?') ? location.search.slice(1).split('&') : location.search.split('&');
        let query = {};
        qArr.forEach(item => {
            let temp = item.split('=');
            query[temp[0].trim()] = temp[1].trim();
        });
        if (query.aId) {
            axios({
                method: 'get',
                url: '/getArticleById/?id=' + query.aId
            }).then(res => {
                let data = res.data.data;
                if (data && data.length > 0) {
                    this.article = data[0];
                } else {
                    alert('没有更多的文章了');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
})

const sendComment = new Vue({
    el: '#sendComment',
    data: {
        name: '',
        email: '',
        content: '',
        validate: '',
        captchaCode: '',
        svgCaptcha: ''
    },
    created: function () {
        this.getCaptchaCode();
    },
    methods: {
        clearInput: function () {
            this.name = '';
            this.email = '';
            this.content = '';
            this.validate = '';
        },
        getCaptchaCode: function () {
            axios.get('/getCaptcha').then(res => {
                this.svgCaptcha = res.data.data.data;
                this.captchaCode = res.data.data.text;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    computed: {
        submitComment: function () {
            return () => {
                if (this.validate !== this.captchaCode) {
                    alert('验证码错误');
                    return;
                }
                if (!this.content) {
                    alert('品论内容不能为空');
                    return;
                }
                if (!this.name) {
                    this.name = "匿名..."
                }
                axios({
                    method: 'get',
                    url: '/submit_comment?id=' + this.id + '&name=' + this.name + '&email=' + this.email + '&content=' + this.content
                }).then(res => {
                    if (res && res.data.status === 'success') {
                        alert(res.data.msg);
                        this.clearInput();
                    } else {
                        alert('评论失败');
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        id () {
            let qArr = location.search.includes('?') ? location.search.slice(1).split('&') : location.search.split('&');
            let query = {};
            qArr.forEach(item => {
                let temp = item.split('=');
                query[temp[0].trim()] = temp[1].trim();
            });
            return query.aId;
        }
    }
})