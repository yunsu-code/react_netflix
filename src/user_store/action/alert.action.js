import { alertConstant } from '../constant';

export const alertAction = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstant.SUCCESS, message };
}

function error(message) {
    return { type: alertConstant.ERROR, message };
}

function clear() {
    return { type: alertConstant.CLEAR };
}