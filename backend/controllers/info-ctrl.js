const Info = require('../models/info-model')

isEmail = (val) => {
	return /\S+@\S+\.\S+/.test(val);
}

createInfo = (req, res) => {
	const body = req.body
	console.log(body)
	if (body.email === '' || body.name === '') {
	   return res.status(400).json({
	       success: false,
	       error: 'Please enter your name and email',
           })
	} else if (!isEmail(body.email)){
		return res.status(400).json({
			success: false,
			error: 'Your email format is incorrect',
			})
	}
	
	const info = new Info(body)
	
	if (!info) {
            return res.status(400).json({ success: false, error:err })
	}

	info
	   .save()
           .then(() => {
	       return res.status(201).json({
                   success: true,
                   message: 'Information saved!',
               })
           })
           .catch(error => {
               return res.status(400).json({
                   error,
                   message: 'Error! Info not saved!',
               })
           })
}

getInfo = async (req,res) => {
	await Info.find({}, (err, infos) => {
	    if (err) {
			return res.status(400).json({ success: false, error: err })
	    }
        if (!infos.length) {
			return res
                    .status(404)
                    .json({ success: false, error: 'Info not found' })
        }
        return res.status(200).json({ success: true, data: infos })
	}).catch(err => console.log(err))
}

module.exports = {
	createInfo,
	getInfo,
}
