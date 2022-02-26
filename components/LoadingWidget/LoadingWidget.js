
const LoadingWidget = ({
    fullScreen,
    size,
    thickness
}) => {

    const fullScreenStyle = {
        width: "100vw",
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "var(--whiteColor)",
        display: "grid",
        placeItems: "center",
        position: "absolute",
        zIndex: "999",
        top: 80,
        bottom: 0
    }

    const defaultStyle = {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        borderRadius: "50%",
        margin: "auto"
    }

    return (
        <div className='loading'
            style={
                fullScreen ? fullScreenStyle : defaultStyle
            }>

            <div className='loading-spinner'
                style={{
                    width: size ? size : "2.5rem",
                    height: size ? size : "2.5rem",
                    border: thickness ? `${thickness}px solid rgba(10, 10, 10, 0.3)` : "2px solid rgba(10, 10, 10, 0.3)",
                    borderRadius: "50%"
                }}
            />

            <div className='loading-spinner-2'
                style={{
                    width: 8,
                    height: size ? size : "2.5rem",
                    borderTop: "4px solid #313bac",
                }}
            />


        </div>
    )
}

export default LoadingWidget;
