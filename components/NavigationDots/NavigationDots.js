const menuItems = ['home', 'about', 'work', 'skills', 'contact'];

const NavigationDots = ({ active }) => {
    return (
        <div className='app__navigation'>
            {
                menuItems.map((item, index) => (
                    <a key={item + index}
                        href={`#${item}`}
                        className='app__navigation-dot'
                        style={
                            active === item ?
                                { backgroundColor: "#313BAC" }
                                :
                                {}
                        }
                    />
                ))
            }
        </div>
    )
}

export default NavigationDots;
