import Box from "@mui/material/Box";

const BulletedText = ({ children, iconSize = "20px", ...props }) => {
    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="flex-start"
            justifyContent="flex-start"
            width="100%"
            mb="1rem"
            pl="1.5rem"
            sx={{
                transition: "all .5s ease-in-out",
                ":last-child": {
                    mb: "0",
                },
                "::before": {
                    content: "''",
                    display: "inline-block",
                    position: "absolute",
                    top: "0.65rem",
                    left: "0",
                    height: "0.35rem",
                    width: "0.35rem",
                    backgroundColor: "black",
                    borderRadius: "50%"
                },
                ...props.sx,
            }}
        >
            {children}
        </Box>
    )
}

export default BulletedText;