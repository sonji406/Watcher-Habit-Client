import { deletePhoto } from '../../services/aws/s3';

const AwsS3Test = () => {
  const handleDeletePhoto = () => {
    deletePhoto('142192643.png');
  };

  return (
    <div>
      <button onClick={handleDeletePhoto}>사진 삭제 버튼</button>
    </div>
  );
};

export default AwsS3Test;
