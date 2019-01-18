const commentArea = new Vue({
    el: '#commentArea',
    data: {
        commentsCount: 0,
        commentsList: []
    },
    methods: {
        reply: function (parentName) {
            document.getElementById('parent_comment_name').value = parentName;
        }
    },
    created: function () {
        let id = document.getElementById('parent_comment_id').value;
        axios.get('/getCommentCountById?id=' + id).then(res => {
            let count = res.data.data[0].count;
            if (count === 0) {
                return;
            } else {
                this.commentsCount = count;
                axios.get('/getCommentsById?id=' + id).then(res => {
                    this.commentsList = res.data.data;
                    console.log(this.commentsList);
                }).catch(err => {
                    console.log(err);
                });
            }
        })
    }
});

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
                let parentId = document.getElementById('parent_comment_id').value;
                let parentName = document.getElementById('parent_comment_name').value;
                axios({
                    method: 'get',
                    url: '/submit_comment?id=' + parentId + '&parentId=' + parentId + '&parentName=' + parentName + '&name=' + this.name + '&email=' + this.email + '&content=' + this.content
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
        }
    }
});