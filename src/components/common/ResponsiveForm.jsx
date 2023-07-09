import Box from "@mui/material/Box";

const ResponsiveForm = ({ children, ...props }) => {

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            maxWidth={{
                xs: "100%",
                sm: "640px",
            }}
            bgcolor={{
                xs: 'transparent',
                sm: "var(--whiteColor)",
            }}
            padding={{
                xs: '1rem 0',
                sm: '1.5rem',
                md: '2rem',
                lg: "2rem",
                xl: "2rem",
            }}
            overflow="hidden"
            transition="all 0.3s ease"
            borderRadius="var(--borderRadius)"
            boxShadow={{
                xs: "none",
                sm: "var(--boxShadow)"
            }}
            m="0 auto"
            sx={{
                transition: 'all .5s ease',
                ...props.sx
            }}
        >
            <form {...props}
                style={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                {children}
            </form>
        </Box>
    )
}

export default ResponsiveForm;