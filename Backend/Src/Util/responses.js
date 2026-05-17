export const successResponse = (res, message, data = {}) => {
    res.status(200).json({
        success: true,
        message,
        data
    })

}

export const errorResponse = (res, message, data = {}) => {
    res.status(404).json({
        success: false,
        message,
        data
    })


}