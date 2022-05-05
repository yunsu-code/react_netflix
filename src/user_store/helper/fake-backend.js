// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // 로그인시 아이디와 비번 일치하는지 확인 절차 (인증)
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.useremail === params.useremail && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            useremail: user.useremail,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // 둘중 하나가 틀린경우
                        reject('이메일 또는 비밀번호가 일치하지 않습니다.');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    console.log("여기여기111111")

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    console.log("여기여기222222")

                    return;
                }

                // 이미 있는 유저이름 입니다.
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.useremail === newUser.useremail; }).length;
                    if (duplicateUser) {
                        reject('"' + newUser.useremail + '" 는 이미 존재하는 아이디입니다.');
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                // if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                //     // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                //     if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                //         // find user by id in users array
                //         let urlParts = url.split('/');
                //         let id = parseInt(urlParts[urlParts.length - 1]);
                //         for (let i = 0; i < users.length; i++) {
                //             let user = users[i];
                //             if (user.id === id) {
                //                 // delete user
                //                 users.splice(i, 1);
                //                 localStorage.setItem('users', JSON.stringify(users));
                //                 break;
                //             }
                //         }

                //         // respond 200 OK
                //         resolve({ ok: true, text: () => Promise.resolve() });
                //     } else {
                //         // return 401 not authorised if token is null or invalid
                //         reject('Unauthorised');
                //     }

                //     return;
                // }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}