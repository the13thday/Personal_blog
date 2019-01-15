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
        },
        getTags: function () {
            this.tags = ['sddf', 'sad', 'fasdf', 'sadf', '1234', '万佛安慰', '非二','第二', 'sdf']
        }
    },
    created: function () {
        this.getTags();
    }
});

let recentHot = new Vue({
    el: '#recentHot',
    data: {
        hots: [
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'},
            { title: '给开了点儿中成药，没要。问医生是', link: 'www.baidu.com'}
        ]
    }
});

let new_comments = new Vue({
    el: '#new_comments',
    data: {
        comments: [
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'},
            {title: '我是标题', date: '我是时间', content: '我是内容我是内容我是内容'}
        ]
    }
})