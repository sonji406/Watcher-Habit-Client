const ErrorMessage = ({ error }) => {
  return error && <p className='text-red-700 mt-5'>{error}</p>;
};

export default ErrorMessage;
