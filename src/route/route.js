const express = require('express');
const route = express.Router();
const path = require('path');
const connect = require('../database/connectDB')

const view_path = path.join(__dirname, '../views');

route.get('/', (req, res) => {
    res.render(view_path, {
        page: 'dashboard'
    });
})

route.get('/signin', (req, res) => {
    res.render(path.join(view_path, 'signin'), {
        changeAccount: false 
    });
})

route.get('/signin/change-account', (req, res) => {
    res.render(path.join(view_path, 'signin'), {
        changeAccount: true 
    })
})

route.get('/search', (req, res) => {
    res.render(path.join(view_path, 'search'), {
        page: 'search'
    });
})

route.get('/quick-add-task', (req, res) => {
    res.render(path.join(view_path, 'quick-add-task'), {
        page: 'quick-add-task'
    })
})


//manages
route.get('/add-task', (req, res) => {
    res.render(path.join(view_path, 'add-task'), {
        page: 'add-task'
    })
})

route.get('/manage/brand-task-manage', (req, res) => {

    connect.query('SELECT * FROM brand', (err, rows, fields) => {
        if (err) {
            // หากมีข้อผิดพลาดในการ query ให้แสดง error
            console.error(err);
            res.status(500).send('Error fetching data');
        } else {
            // ส่งข้อมูลไปยัง template
            res.render(path.join(view_path, 'manages', 'brand-task-manage'), {
                page: 'manage',
                sub_menu: 'brand-task-manage',
                brands: rows // ส่งข้อมูล brands ที่ได้จากฐานข้อมูลไปยัง template
            });
        }
    });
})

route.get('/manage/model-task-manage', (req, res) => {
    res.render(path.join(view_path, 'manages', 'model-task-manage'), {
        page: 'manage',
        sub_menu: 'model-task-manage'
    })
})

route.get('/manage/status-task-manage', (req, res) => {
    res.render(path.join(view_path, 'manages', 'status-task-manage'), {
        page: 'manage',
        sub_menu: 'status-task-manage'
    })
})

route.get('/repair-task/all', (req, res) => {
    res.render(path.join(view_path, 'repair-task', 'all-task'), {
        page: 'repair-task',
        sub_menu: 'all-task'
    })
})

module.exports = route;
