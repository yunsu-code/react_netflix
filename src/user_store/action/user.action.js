import { userConstant } from '../constant';
import { userService } from '../service';
import { alertAction } from '.';
import { history } from '../helper';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    // delete: _delete
};

function login( useremail, password ) {
    return dispatch => {
        dispatch(request({ useremail }));

        userService.login( useremail, password )
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAction.error(error));
                }
            );
    };

    function request(user) { return { type: userConstant.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstant.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstant.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    console.log("sssssss")
    return { type: userConstant.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertAction.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertAction.error(error));
                }
            );
    };

    function request(user) { return { type: userConstant.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstant.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstant.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstant.GETALL_REQUEST } }
    function success(users) { return { type: userConstant.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstant.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => { 
//                     dispatch(success(id));
//                 },
//                 error => {
//                     dispatch(failure(id, error));
//                 }
//             );
//     };

//     function request(id) { return { type: userConstant.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstant.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstant.DELETE_FAILURE, id, error } }
// }