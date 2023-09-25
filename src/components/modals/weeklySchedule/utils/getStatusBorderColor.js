const getStatusBorderColor = (status) => {
  switch (status) {
    case 'approvalSuccess':
      return 'border-green-500';
    case 'expiredFailure':
    case 'approvalFailure':
      return 'border-red-500';
    default:
      return 'border-none';
  }
};

export default getStatusBorderColor;
