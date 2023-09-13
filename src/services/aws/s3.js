import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const deletePhoto = async (photoKey) => {
  const command = new DeleteObjectCommand({
    Bucket: 'watcher-habit',
    Key: photoKey,
  });

  try {
    await client.send(command);
    console.log('사진 삭제 성공');
  } catch (err) {
    console.error('삭제 에러', err);
  }
};
