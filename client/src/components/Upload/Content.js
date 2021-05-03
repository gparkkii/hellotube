import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {
  FilledButton,
  FormBox,
  InputBox,
  OutlinedInput,
  OutlinedTextArea,
} from 'styles/form';
import { Backup } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { ErrorMessage, ProfileTitle, SmallMessage } from 'styles/typography';
import { PrivateOptions, CategoryOptions } from '../../library/options/upload';

const Content = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const userId = useSelector(state => state.user.profile._id);

  const [FilePath, setFilePath] = useState('');
  const [FileName, setFileName] = useState('');
  const [FileDuration, setFileDuration] = useState(0);
  const [ThumbnailPath, setThumbnailPath] = useState('');

  const onDrop = useCallback(files => {
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('video', files[0]);

    axios.post('/api/uploads/video', formData, config).then(response => {
      console.log(response.data);
      if (response.data.success) {
        setFilePath(`http://localhost:5000/${response.data.filePath}`);
        setFileName(response.data.fileName);
        const videoData = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        axios.post('api/uploads/thumbnail', videoData).then(res => {
          if (res.data.success) {
            setFileDuration(res.data.fileDuration);
            setThumbnailPath(`http://localhost:5000/${res.data.filePath}`);
          } else {
            alert('썸네일 생성에 실패했습니다.');
          }
        });
      } else {
        alert('비디오 업로드에 실패했습니다');
      }
    });
  }, []);

  const onSubmitHandler = useCallback(
    data => {
      console.log(data);
      const files = {
        writer: userId,
        title: data.videoTitle,
        description: data.videoDescription,
        privacy: data.privacy,
        category: data.category,
        filePath: FilePath,
        fileDuration: FileDuration,
        thumbnail: ThumbnailPath,
      };

      console.log(files);

      axios.post('/api/uploads/video/files', files).then(response => {
        if (response.data.success) {
          alert('업로드를 완료 했습니다.');
          history.push('/');
        } else {
          alert('비디오 업로드에 실패했습니다.');
        }
      });
    },
    [FileDuration, FilePath, ThumbnailPath, userId, history],
  );

  return (
    <>
      <ProfileTitle>동영상 업로드</ProfileTitle>
      <FormBox onSubmit={handleSubmit(onSubmitHandler)}>
        <Dropzone onDrop={onDrop} multiple={false} maxsize={1000000000}>
          {({ getRootProps, getInputProps }) => (
            <>
              <Dropbox {...getRootProps()}>
                <input {...getInputProps()} />
                <Backup style={{ fontSize: 40 }} />
                <p>Drag and drop</p>
                {ThumbnailPath && (
                  <ThumbnailBox>
                    <img src={ThumbnailPath} alt="thumbnail" />
                  </ThumbnailBox>
                )}
              </Dropbox>
              <SmallMessage>{FileName}</SmallMessage>
            </>
          )}
        </Dropzone>
        <InputBox>
          <label
            className={errors.videoTitle ? 'errorTypeLabel' : null}
            htmlFor="videoTitle"
          >
            제목
          </label>
          <OutlinedInput
            type="text"
            id="videoTitle"
            placeholder="제목을 입력해주세요"
            className={errors.videoTitle ? 'errorInput' : null}
            {...register('videoTitle', {
              required: '제목을 입력해주세요.',
            })}
          />
          {errors.videoTitle && (
            <ErrorMessage>{errors.videoTitle.message}</ErrorMessage>
          )}
        </InputBox>
        <InputBox>
          <label
            className={errors.videoDescription ? 'errorTypeLabel' : null}
            htmlFor="videoDescription"
          >
            내용
          </label>
          <OutlinedTextArea
            id="videoDescription"
            placeholder="내용을 입력해주세요"
            className={errors.videoDescription ? 'errorInput' : null}
            {...register('videoDescription', {
              required: '내용을 입력해주세요.',
            })}
          />
          {errors.videoDescription && (
            <ErrorMessage>{errors.videoDescription.message}</ErrorMessage>
          )}
        </InputBox>
        <RowBox>
          <Label>※ 옵션을 선택해주세요 : </Label>
          <Label>공개 여부</Label>
          <select {...register('privacy')} style={{ marginRight: '12px' }}>
            {PrivateOptions.map(item => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Label>카테고리</Label>
          <select {...register('category')}>
            {CategoryOptions.map(item => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </RowBox>
        <FilledButton type="ssubmit">업로드</FilledButton>
      </FormBox>
    </>
  );
};

export default withRouter(Content);

const Dropbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15em;
  border: 1px solid #f2c4c2;
  border-radius: 8px;
  margin-bottom: 12px;
  & p {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ThumbnailBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`;

const Label = styled.label`
  font-size: 12px;
  margin-top: 2px;
  margin-left: 4px;
  color: ${({ theme }) => theme.textColor};
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  & label {
    margin-right: 8px;
  }
  & select {
    padding: 10px;
    color: ${({ theme }) => theme.textColor};
    border: 1px solid #f2c4c2;
    border-radius: 6px;
    font-size: 13px;
  }
`;
