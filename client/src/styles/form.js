import styled, { css } from 'styled-components';
import { media } from './media_query';

export const MarginBox = styled.div`
  margin: ${props => props.margin};
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  transition: all 0.2s;
  width: 28em;
  margin-top: 15px;
  padding: 0px 20px;
  ${media.tablet`
    width: 26em;
  `}
  ${media.mini`
    width: 24em;     
  `}
  ${media.mobile`
    width: 20em;     
  `}
`;

export const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  margin: 4px 0px;
  color: #505050;
  & label {
    font-size: 12px;
    margin-bottom: 4px;
    margin-left: 8px;
    color: ${({ theme }) => theme.textColor};
  }
  &: focus-within {
    color: #eb5650;
  }
`;

export const AbsoluteBox = styled.div`
  position: relative;
  width: 100%;
`;

export const AbsoluteButton = styled.div`
  position: absolute;
  top: 0;
  right: 4px;
  & button {
    color: #bababa;
  }
`;

export const OutlinedInput = styled.input`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0px 14px;
  background-color: transparent;
  border: 1px solid #f2c4c2;
  border-radius: 8px;
  &:hover {
    border: 1px solid #eb5650;
  }
  &:focus {
    border: 1px solid #eb5650;
    box-shadow: inset 0 0 0 1px #eb5650;
  }
`;

export const FilledInput = styled.input`
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.inputFilled};
  border: none;
  border-radius: 30px;
  margin-top: 2px;
  &:hover {
    border: 1px solid #eb5650;
  }
  &:focus {
    border: 1px solid #eb5650;
    box-shadow: inset 0 0 0 1px #eb5650;
  }
  ${props =>
    props.readOnly &&
    css`
      color: #aaa;
      background-color: ${({ theme }) => theme.contentBox};
      border: ${({ theme }) => theme.borderColor};
    `}
`;

export const UnderlinedInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0px 10px;
  font-size: 16px;
  color: #eb5650;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid #ccc;
  &:hover {
    border-bottom: 1px solid #eb5650;
  }
  &:focus {
    border-bottom: 1px solid #eb5650;
  }
`;

export const UnderlinedLabel = styled.label`
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: -4px;
`;

export const BorderButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: ${props => props.marginTop || '10px'};
  font-size: 16px;
  color: #fff;
  background-color: #eb5650;
  border-radius: 30px;
`;

export const FilledButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: ${props => props.marginTop || '10px'};
  font-size: 16px;
  color: #fff;
  background-color: #eb5650;
  border-radius: 8px;
`;

export const OutlinedButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: ${props => props.marginTop || '10px'};
  font-size: 16px;
  color: #eb5650;
  border: 1px solid #eb5650;
  border-radius: 4px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.inputFilled};
  &:hover {
    border: 1px solid #eb5650;
  }
  &:focus {
    border: 1px solid #eb5650;
    box-shadow: inset 0 0 0 1px #eb5650;
  }
  ${props =>
    props.readOnly &&
    css`
      height: 48px;
      line-height: 48px;
      padding: 0px 20px;
      border-radius: 30px;
      color: #aaa;
      background-color: ${({ theme }) => theme.contentBox};
      border: ${({ theme }) => theme.borderColor};
    `}
`;

export const OutlinedTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 16px 14px;
  border-radius: 8px;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid #f2c4c2;
  background-color: transparent;
  &:hover {
    border: 1px solid #eb5650;
  }
  &:focus {
    border: 1px solid #eb5650;
    box-shadow: inset 0 0 0 1px #eb5650;
  }
`;

export const SocialLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.3%;
  height: 48px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  color: ${props => props.color || '#757575'};
  background-color: ${props => props.backgroundColor || '#fff'};
  & :first-of-type {
    margin-right: 12px;
  }
  & :last-of-type {
    margin-left: 12px;
  }
  & img {
    width: 20px;
    height: 20px;
  }
  & span {
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    font-weight: 500;
    padding-left: 10px;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Avatar = styled.div`
  width: ${props => props.width || '148px'};
  height: ${props => props.width || '148px'};
  background-color: #eaeaea;
  border-radius: 100%;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: ${props => props.backgroundColor || 'transparent'};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const AvatarLabelBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & label:first-of-type {
    margin-right: 8px;
  }
  & label:last-of-type {
    margin-left: 8px;
  }
  & label {
    width: 33.3%;
    height: 48px;
    border: 1px solid #f2c4c2;
    border-radius: 30px;
    font-size: 15px;
    line-height: 48px;
    text-align: center;
    &: hover {
      border: 1px solid #eb5650;
    }
  }
`;

export const BlankBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  font-weight: 500;
`;

export const BlankName = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  font-size: ${props => props.fontSize || '28px'};
  color: ${props => props.color || '#212121'};
`;

export const InfoIcons = styled.span`
  padding-bottom: 4px;
  & p {
    font-weight: ${props => props.isActive && '600'};
    color: ${props => props.isActive && '#065fd4'};
  }
  & svg {
    color: ${props => props.isActive && '#065fd4'};
  }
  border-bottom: 1px solid ${props => props.isActive && '#065fd4'};
`;
