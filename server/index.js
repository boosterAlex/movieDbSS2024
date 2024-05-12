require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 443
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''
const BASE_URL = process.env.API_URL || ''

app.use(cors({
    origin: true
}));

app.use(async (req, res, next)=>{
    req.headers['Authorization']=`Bearer ${ACCESS_TOKEN}`
    next()
})

app.use(async (req, res)=>{
    try {
        const transformUrl = `${BASE_URL}${req.originalUrl.split('?')[0]}`
        
        const response = await axios({
            method: req.method,
            url: transformUrl,
            params: req.query,
            data: req.body,
            headers: {
                accept: req.headers.accept,
                Authorization: req.headers.Authorization
            }
        })   
        res.json(response.data)

    } catch (error) {
        console.log(error)
        res.status(error?.response?.status).json({error: error?.message})
    }
})

app.listen(PORT, ()=>{
    console.log('server started')
})