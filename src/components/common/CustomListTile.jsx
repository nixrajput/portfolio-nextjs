import Column from "@/components/commons/Column";

const CustomListTile = ({ title, value, titleStyle, valueStyle, ...rest }) => {
    return (
        <Column
            sx={{
                ...rest.sx
            }}
        >
            {
                rest.children ?
                    rest.children
                    :
                    <Column>
                        <p
                            style={{
                                color: "var(--textColorLight)",
                                ...titleStyle
                            }}
                        >
                            {title}
                        </p>

                        <p
                            style={{
                                fontWeight: "500",
                                ...valueStyle
                            }}
                        >
                            {value}
                        </p>
                    </Column>
            }
        </Column>
    )
}

export default CustomListTile;