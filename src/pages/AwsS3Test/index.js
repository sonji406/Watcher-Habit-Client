import { deletePhoto } from '../../services/aws/s3';

const AwsS3Test = () => {
  const handleDeletePhoto = () => {
    deletePhoto('142192643.png');
  };

  return (
    <section>
      <button onClick={handleDeletePhoto}>사진 삭제 버튼</button>
    </section>
  );
};

export default AwsS3Test;
