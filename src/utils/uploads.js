const aws = require("aws-sdk")

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadImage = async (path, buffer, mimetype) => {
    try {
        const image = await s3.upload({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimetype
        }).promise()

        return {
            path: image.Key,
            url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${image.Key}`
        }
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

module.exports = {
    uploadImage
}