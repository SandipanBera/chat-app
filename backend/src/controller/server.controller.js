const serverCheck = (req,res) => {
    return res.status(200).send('Server is healthy!')
    }
export {serverCheck}; 