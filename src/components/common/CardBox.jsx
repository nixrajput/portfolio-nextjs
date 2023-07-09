import Column from '@/components/commons/Column';

const CardBox = ({ children, ...props }) => {
    return (
        <Column
            sx={{
                p: "1rem",
                backgroundColor: "var(--dialogColor)",
                boxShadow: "var(--boxShadow)",
                borderRadius: "var(--borderRadius)",
                transition: "all 0.5s ease-in-out",
                animation: "drop-in 500ms ease 200ms backwards",
                overflow: "hidden",
                ...props.sx
            }}
        >
            {children}
        </Column>
    )
}

export default CardBox;