const express = require("express");
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = process.env.PORT || 3333;

const app = express()

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/auth', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(PORT, (req, res) => {
    console.log(`server started on post ${PORT}`)
})

