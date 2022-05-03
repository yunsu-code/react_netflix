import { alertConstant } from '../constant';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstant.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstant.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstant.CLEAR:
      return {};
    default:
      return state
  }
}