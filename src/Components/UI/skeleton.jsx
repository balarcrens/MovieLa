const Skeleton = ({ className }) => {
    return (
        <div className={`bg-gray-700 animate-pulse rounded-md ${className}`} ></div>
    );
};

export default Skeleton;
