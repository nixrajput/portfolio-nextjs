import Box from "@mui/material/Box";

const InputBox = ({ children, ...rest }) => {

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            p="0"
            m="0 auto"
            sx={{
                transition: 'all 0.3s ease-in-out',
                animation: "drop-in 500ms ease 300ms backwards",
                "& input,select,textarea,label": {
                    backgroundColor: "transparent",
                    width: "100%",
                    minWidth: "100%",
                    minHeight: "3.5rem",
                    maxHeight: "4rem",
                    border: `1px solid var(--borderColor)`,
                    borderRadius: "var(--borderRadius)",
                    fontFamily: "inherit",
                    fontSize: "1rem",
                    fontWeight: "500",
                    padding: "0.5rem",
                    outline: "none",
                    color: 'var(--textColor)'
                },
                "& textarea": {
                    maxHeight: "5rem"
                },
                "& input::placeholder": {
                    color: "var(--darkGrayColor)",
                    fontWeight: "400",
                },
                "& input:focus": {
                    border: `1px solid var(--primaryColor)`,
                },
                "& select::placeholder": {
                    color: "var(--darkGrayColor)",
                    fontWeight: "400",
                },
                "& select:focus": {
                    border: `1px solid var(--primaryColor)`,
                },
                '& .password_toggle_btn': {
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: "var(--primaryColor40)",
                    cursor: 'pointer',
                    '&:hover': {
                        color: "var(--primaryColor)"
                    }
                },
                ...rest.sx,
            }}
        >
            {children}
        </Box>
    )
}

export default InputBox;