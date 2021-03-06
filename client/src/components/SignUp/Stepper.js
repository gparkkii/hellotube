import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from 'modules/reducers/user';
import { resetProfileForm } from 'modules/reducers/profile';
import { ColumnBox, BorderButton, FormBox } from 'styles/form';
import { media } from 'styles/media_query';
import styled from 'styled-components';
import UserForm from './Steps/UserForm';
import ProfileForm from './Steps/ProfileForm';
import AvatarForm from './Steps/AvatarForm';
import CompleteForm from './Steps/CompleteForm';

function Stepper({ history }) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.user);
  const profileData = useSelector(state => state.profile);

  const [currentStep, setCurrentStep] = useState(0);

  const handleReset = () => {
    setCurrentStep(0);
  };
  const goForward = () => {
    setCurrentStep(currentStep + 1);
  };

  const getSteps = () => {
    return ['기본 정보', '프로필 정보', '내 아바타', '시작하기'];
  };
  const getStepContent = step => {
    switch (step) {
      case 0:
        return <UserForm next={goForward} />;
      case 1:
        return <ProfileForm next={goForward} />;
      case 2:
        return <AvatarForm next={goForward} />;
      case 3:
        return <CompleteForm reset={handleReset} />;
      default:
        return '404 Unknown Error';
    }
  };

  const steps = getSteps();
  const isLast = currentStep === steps.length - 1;

  useEffect(() => {
    if (status.signupDone) {
      dispatch(resetProfileForm());
      history.push('/login');
    } else if (status.signupError) {
      alert(status.data.message);
    }
  }, [status]);

  const onSubmit = () => {
    dispatch(signupUser(profileData));
  };

  return (
    <Container>
      <StepViewer>
        Step {currentStep + 1} of {steps.length}
      </StepViewer>
      <ColumnBox>{getStepContent(currentStep)}</ColumnBox>
      {isLast && (
        <FormBox>
          <BorderButton
            onClick={e => {
              e.preventDefault();
              onSubmit();
            }}
            type="button"
          >
            가입하기
          </BorderButton>
          <ResetButton
            type="button"
            onClick={e => {
              e.preventDefault();
              handleReset();
            }}
          >
            처음으로
          </ResetButton>
        </FormBox>
      )}
    </Container>
  );
}

export default withRouter(Stepper);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 32em;
  max-height: 48em;
  height: 100%;
  border-radius: 30px;
  padding: 40px;
  background-color: ${({ theme }) => theme.contentBox};
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.2s ease;
  ${media.mini`
    width: 26em;
  `}
  ${media.mobile`
    width: 20em;        
  `}
  & div:nth-child(1) {
    flex-grow: 0;
  }
  & div:nth-child(2) {
    flex-grow: 1;
  }
  & div:nth-child(3) {
    flex-grow: 0;
  }
`;

const StepViewer = styled.div`
  font-size: 14px;
`;

const ResetButton = styled.button`
  width: 100%;
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  text-decoration: underline;
  color: #c1c8f0;
`;
