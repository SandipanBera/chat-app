const asyncHandler = (func) => {
  return function (req, res, next) {
    Promise.resolve(func(req, res, next)).catch((error) => {
      next(error);
      return res.status(500).json({error:"Internal Server Error"});
    });
  };
};
export { asyncHandler };
