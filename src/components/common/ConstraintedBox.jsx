import PropTypes from 'prop-types';

const ConstraintedBox = ({ children, classNames }) => {
    return (
        <div
            className={`relative flex flex-col justify-start items-start w-full constrained-width p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out drop_in ${classNames}`}
        >
            {children}
        </div>
    )
}

ConstraintedBox.propTypes = {
    children: PropTypes.node,
    classNames: PropTypes.string,
}

export default ConstraintedBox;