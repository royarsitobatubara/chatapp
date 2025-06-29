export function ButtonSubmit({
    styles='',
    type='',
    handleClick=null
}){
    return (
        <button
            className={styles}
            type={type}
            onClick={handleClick}
        >
            Submit
        </button>
    );
}