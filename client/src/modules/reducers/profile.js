const { produce } = require('immer');

const USER_FORM = 'user_form';
const PROFILE_FORM = 'profile_form';
const AVATAR_FORM = 'avatar_form';
const RESET_FORM = 'reset_form';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  userDescription: '',
  url: '',
  profileImage: '',
  profileImageType: '',
  hashedEmail: '',
};

export const addUserForm = data => {
  return {
    type: USER_FORM,
    payload: data,
  };
};

export const addProfileForm = data => {
  return {
    type: PROFILE_FORM,
    payload: data,
  };
};

export const addAvatarForm = data => {
  return {
    type: AVATAR_FORM,
    payload: data,
  };
};

export const resetProfileForm = () => {
  return {
    type: RESET_FORM,
  };
};

export default function profileReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case USER_FORM:
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.password = action.payload.password;
        draft.passwordConfirm = action.payload.passwordConfirm;
        break;
      case PROFILE_FORM:
        draft.nickname = action.payload.nickname;
        draft.userDescription = action.payload.userDescription;
        draft.url = action.payload.url;
        break;
      case AVATAR_FORM:
        draft.profileImage = action.payload.profileImage;
        draft.profileImageType = action.payload.profileImageType;
        draft.hashedEmail = action.payload.hashedEmail;
        break;
      case RESET_FORM:
        return initialState;
      default:
        return prevState;
    }
  });
}
