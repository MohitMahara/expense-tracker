export const handleError = (err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const errorMsg = err.message || "Internal Server Error";
    return res.status(statusCode).send({
        status_code : statusCode,
        success : false, 
        message : errorMsg,
    })
};