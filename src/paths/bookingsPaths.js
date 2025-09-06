const bookingsPaths = {
    POST: {
        "/": {
            authentication: req => "jwt",
        },
    },
}

export default bookingsPaths;