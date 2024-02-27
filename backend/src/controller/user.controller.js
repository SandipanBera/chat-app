const serverCheck = (req,res) => {
    return res.status(200).json( {name: "sandipan",
    surname:"bera"})
}
export {serverCheck}; 